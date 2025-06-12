import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiX, FiEdit2, FiTrash2, FiDollarSign, FiPieChart, FiTrendingUp } from 'react-icons/fi';

const BudgetTracker = () => {
  // Sample initial categories
  const [categories, setCategories] = useState([
    { id: 1, name: 'Groceries', budget: 500, spent: 125, color: 'bg-emerald-500' },
    { id: 2, name: 'Entertainment', budget: 200, spent: 75, color: 'bg-indigo-500' },
    { id: 3, name: 'Transport', budget: 150, spent: 150, color: 'bg-amber-500' },
    { id: 4, name: 'Dining', budget: 300, spent: 225, color: 'bg-rose-500' },
  ]);
  
  const [newCategory, setNewCategory] = useState({
    name: '',
    budget: '',
    color: 'bg-slate-500'
  });
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);

  // Calculate totals
  useEffect(() => {
    const budgetTotal = categories.reduce((sum, cat) => sum + cat.budget, 0);
    const spentTotal = categories.reduce((sum, cat) => sum + cat.spent, 0);
    setTotalBudget(budgetTotal);
    setTotalSpent(spentTotal);
  }, [categories]);

  // Color options for category selection
  const colorOptions = [
    'bg-emerald-500', 'bg-indigo-500', 'bg-amber-500', 'bg-rose-500',
    'bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-cyan-500'
  ];

  const handleAddExpense = (id, amount) => {
    if (!amount || isNaN(amount)) return;
    
    setCategories(categories.map(cat => 
      cat.id === id ? { ...cat, spent: cat.spent + parseFloat(amount) } : cat
    ));
  };

  const addCategory = () => {
    if (!newCategory.name || !newCategory.budget) return;
    
    const category = {
      id: Date.now(),
      name: newCategory.name.trim(),
      budget: parseFloat(newCategory.budget),
      spent: 0,
      color: newCategory.color
    };
    
    setCategories([...categories, category]);
    setNewCategory({ name: '', budget: '', color: 'bg-slate-500' });
    setShowAddForm(false);
  };

  const deleteCategory = (id) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  const startEditing = (id) => {
    setEditingId(id);
  };

  const saveEdit = (id, updatedFields) => {
    setCategories(categories.map(cat => 
      cat.id === id ? { ...cat, ...updatedFields } : cat
    ));
    setEditingId(null);
  };

  const getRemainingPercentage = (category) => {
    return Math.min(100, (category.spent / category.budget) * 100);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-slate-800">Budget Tracker</h1>
        <p className="text-slate-500">Manage your expenses with ease</p>
      </motion.div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500"
        >
          <div className="flex items-center mb-2">
            <FiDollarSign className="text-blue-500 mr-2" />
            <h3 className="text-slate-500 font-medium">Total Budget</h3>
          </div>
          <p className="text-2xl font-bold text-slate-800">${totalBudget.toFixed(2)}</p>
        </motion.div>
        
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl shadow-md p-6 border-l-4 border-rose-500"
        >
          <div className="flex items-center mb-2">
            <FiTrendingUp className="text-rose-500 mr-2" />
            <h3 className="text-slate-500 font-medium">Total Spent</h3>
          </div>
          <p className="text-2xl font-bold text-slate-800">${totalSpent.toFixed(2)}</p>
        </motion.div>
        
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl shadow-md p-6 border-l-4 border-emerald-500"
        >
          <div className="flex items-center mb-2">
            <FiPieChart className="text-emerald-500 mr-2" />
            <h3 className="text-slate-500 font-medium">Remaining</h3>
          </div>
          <p className="text-2xl font-bold text-slate-800">${(totalBudget - totalSpent).toFixed(2)}</p>
        </motion.div>
      </div>
      
      {/* Add Category Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setShowAddForm(!showAddForm)}
        className="flex items-center justify-center w-full mb-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all"
      >
        <FiPlus className="mr-2" />
        {showAddForm ? 'Cancel' : 'Add New Category'}
      </motion.button>
      
      {/* Add Category Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-md p-6 mb-6 overflow-hidden"
          >
            <h3 className="text-lg font-semibold text-slate-800 mb-4">New Category</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Category Name</label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g. Groceries"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Budget Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">$</span>
                  <input
                    type="number"
                    value={newCategory.budget}
                    onChange={(e) => setNewCategory({...newCategory, budget: e.target.value})}
                    className="w-full pl-8 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="0.00"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Color</label>
                <div className="flex flex-wrap gap-2">
                  {colorOptions.map(color => (
                    <button
                      key={color}
                      onClick={() => setNewCategory({...newCategory, color})}
                      className={`w-8 h-8 rounded-full ${color} ${newCategory.color === color ? 'ring-2 ring-offset-2 ring-indigo-500' : ''}`}
                    />
                  ))}
                </div>
              </div>
              
              <button
                onClick={addCategory}
                className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all mt-4"
              >
                Create Category
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Categories List */}
      <div className="space-y-4">
        <AnimatePresence>
          {categories.map((category) => (
            <motion.div
              key={category.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              {editingId === category.id ? (
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Edit Category</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-1">Category Name</label>
                      <input
                        type="text"
                        defaultValue={category.name}
                        onChange={(e) => category.name = e.target.value}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-1">Budget Amount</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">$</span>
                        <input
                          type="number"
                          defaultValue={category.budget}
                          onChange={(e) => category.budget = parseFloat(e.target.value)}
                          className="w-full pl-8 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-2">Color</label>
                      <div className="flex flex-wrap gap-2">
                        {colorOptions.map(color => (
                          <button
                            key={color}
                            onClick={() => category.color = color}
                            className={`w-8 h-8 rounded-full ${color} ${category.color === color ? 'ring-2 ring-offset-2 ring-indigo-500' : ''}`}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={() => saveEdit(category.id, category)}
                        className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="flex-1 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-800">{category.name}</h3>
                        <div className="flex items-center mt-1">
                          <span className={`w-3 h-3 rounded-full ${category.color} mr-2`}></span>
                          <span className="text-sm text-slate-500">
                            ${category.spent.toFixed(2)} of ${category.budget.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEditing(category.id)}
                          className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-all"
                          aria-label="Edit category"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          onClick={() => deleteCategory(category.id)}
                          className="p-2 text-slate-500 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition-all"
                          aria-label="Delete category"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full ${category.color}`}
                          initial={{ width: 0 }}
                          animate={{ 
                            width: `${getRemainingPercentage(category)}%`,
                          }}
                          transition={{ duration: 1, type: 'spring' }}
                        />
                      </div>
                      <div className="text-right mt-1">
                        <span className="text-xs font-medium text-slate-500">
                          {Math.round(getRemainingPercentage(category))}% spent
                        </span>
                      </div>
                    </div>
                    
                    {/* Add Expense Form */}
                    <div className="flex gap-3">
                      <div className="relative flex-1">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">$</span>
                        <input
                          type="number"
                          placeholder="Add expense"
                          id={`expense-${category.id}`}
                          className="w-full pl-8 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          const input = document.getElementById(`expense-${category.id}`);
                          const amount = parseFloat(input.value);
                          if (amount) {
                            handleAddExpense(category.id, amount);
                            input.value = '';
                          }
                        }}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-all"
                      >
                        Add
                      </motion.button>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BudgetTracker;