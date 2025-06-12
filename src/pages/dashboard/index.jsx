import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { FiTrendingUp, FiTrendingDown, FiDollarSign, FiPieChart, FiBarChart2, FiCalendar } from 'react-icons/fi'

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10
    }
  }
}

const cardHover = {
  scale: 1.02,
  transition: { type: 'spring', stiffness: 400, damping: 10 }
}

const buttonHover = {
  scale: 1.05,
  backgroundColor: 'rgba(99, 102, 241, 0.9)'
}

const buttonTap = {
  scale: 0.98
}

const TrackonomyDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [isLoading, setIsLoading] = useState(true)
  
  // Mock data - in a real app this would come from API
  const [financialData, setFinancialData] = useState({
    balance: 5450,
    monthlyIncome: 3850,
    monthlyExpenses: 2543,
    savingsRate: 3.5,
    budgetStatus: 72,
    recentTransactions: [
      { id: 1, category: 'Food', description: 'Restaurant', amount: -22.50, date: '2024-02-22' },
      { id: 2, category: 'Transport', description: 'Parking', amount: -75.45, date: '2024-02-22' },
      { id: 3, category: 'Food', description: 'Groceries', amount: -85.50, date: '2024-02-21' },
      { id: 4, category: 'Transport', description: 'Ride Share', amount: -14.50, date: '2024-02-21' }
    ],
    spendingByCategory: [
      { category: 'Housing', amount: 1200, percentage: 35 },
      { category: 'Food', amount: 650, percentage: 19 },
      { category: 'Transport', amount: 320, percentage: 9 },
      { category: 'Entertainment', amount: 180, percentage: 5 },
      { category: 'Other', amount: 193, percentage: 6 }
    ]
  })

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8"
    >
      {/* Header */}
      <motion.header variants={itemVariants} className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Trackonomy Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-300">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
                <FiDollarSign className="text-indigo-600 dark:text-indigo-300 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Available Balance</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  ${financialData.balance.toLocaleString()}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.header>

      {/* Navigation Tabs */}
      <motion.nav variants={itemVariants} className="mb-8">
        <div className="flex space-x-1 p-1 bg-white dark:bg-gray-800 rounded-xl shadow-inner border border-gray-100 dark:border-gray-700">
          {['overview', 'analytics', 'budgets', 'goals'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                activeTab === tab
                  ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </motion.nav>

      {/* Main Dashboard Content */}
      <motion.div variants={containerVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Financial Overview */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
          {/* Income/Expense Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div 
              whileHover={cardHover}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Monthly Income</h3>
                <FiTrendingUp className="text-green-500 text-xl" />
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                ${financialData.monthlyIncome.toLocaleString()}
              </p>
              <p className="text-sm text-green-600 dark:text-green-400 flex items-center">
                <span>+2.5% from last month</span>
              </p>
            </motion.div>

            <motion.div 
              whileHover={cardHover}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Monthly Expenses</h3>
                <FiTrendingDown className="text-red-500 text-xl" />
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                ${financialData.monthlyExpenses.toLocaleString()}
              </p>
              <p className="text-sm text-red-600 dark:text-red-400 flex items-center">
                <span>-1.2% from last month</span>
              </p>
            </motion.div>
          </div>

          {/* Budget Progress */}
          <motion.div 
            whileHover={cardHover}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Budget Status</h3>
              <FiPieChart className="text-indigo-500 text-xl" />
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                <span>Monthly Budget</span>
                <span>{financialData.budgetStatus}% used</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${financialData.budgetStatus}%` }}
                  transition={{ duration: 1, type: 'spring' }}
                  className="bg-indigo-600 h-2.5 rounded-full"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {financialData.spendingByCategory.map((category) => (
                <div key={category.category} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">{category.category}</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      ${category.amount} ({category.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${category.percentage}%` }}
                      transition={{ duration: 1, type: 'spring' }}
                      className={`h-1.5 rounded-full ${
                        category.category === 'Housing' ? 'bg-blue-500' :
                        category.category === 'Food' ? 'bg-green-500' :
                        category.category === 'Transport' ? 'bg-yellow-500' :
                        category.category === 'Entertainment' ? 'bg-purple-500' : 'bg-pink-500'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Transactions */}
          <motion.div 
            whileHover={cardHover}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Transactions</h3>
              <FiBarChart2 className="text-indigo-500 text-xl" />
            </div>
            
            <div className="space-y-4">
              {financialData.recentTransactions.map((transaction) => (
                <motion.div 
                  key={transaction.id}
                  whileHover={{ x: 5 }}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      transaction.category === 'Food' ? 'bg-green-100 dark:bg-green-900' :
                      transaction.category === 'Transport' ? 'bg-blue-100 dark:bg-blue-900' :
                      'bg-gray-100 dark:bg-gray-700'
                    }`}>
                      {transaction.category === 'Food' ? (
                        <FiDollarSign className="text-green-600 dark:text-green-300" />
                      ) : (
                        <FiDollarSign className="text-blue-600 dark:text-blue-300" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{transaction.description}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {transaction.category} • {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <p className={`font-medium ${
                    transaction.amount < 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'
                  }`}>
                    {transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}
                  </p>
                </motion.div>
              ))}
            </div>
            
            <motion.button
              whileHover={buttonHover}
              whileTap={buttonTap}
              className="mt-4 w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
            >
              View All Transactions
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right Column - Predictive Insights */}
        <motion.div variants={itemVariants} className="space-y-6">
          {/* Savings Rate */}
          <motion.div 
            whileHover={cardHover}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Savings Rate</h3>
              <FiTrendingUp className="text-green-500 text-xl" />
            </div>
            
            <div className="flex items-end gap-2 mb-4">
              <p className="text-4xl font-bold text-gray-900 dark:text-white">
                {financialData.savingsRate}%
              </p>
              <p className="text-sm text-green-600 dark:text-green-400 mb-1">+0.8% from last month</p>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Your savings rate is better than 65% of users in your age group.
            </p>
            
            <div className="h-32 w-full bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <FiBarChart2 className="text-gray-400 text-4xl" />
            </div>
          </motion.div>

          {/* Predictive Analysis */}
          <motion.div 
            whileHover={cardHover}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Predictive Insights</h3>
              <FiCalendar className="text-indigo-500 text-xl" />
            </div>
            
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-100 dark:border-blue-800">
                <p className="font-medium text-blue-800 dark:text-blue-200">Upcoming Expense</p>
                <p className="text-sm text-blue-600 dark:text-blue-300">
                  Netflix subscription ($14.99) due in 3 days
                </p>
              </div>
              
              <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg border border-green-100 dark:border-green-800">
                <p className="font-medium text-green-800 dark:text-green-200">Savings Opportunity</p>
                <p className="text-sm text-green-600 dark:text-green-300">
                  You could save $120/month by reducing dining out
                </p>
              </div>
              
              <div className="p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg border border-purple-100 dark:border-purple-800">
                <p className="font-medium text-purple-800 dark:text-purple-200">Financial Forecast</p>
                <p className="text-sm text-purple-600 dark:text-purple-300">
                  At this rate, you'll save $6,540 by year end
                </p>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div 
            whileHover={cardHover}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
            
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                whileHover={buttonHover}
                whileTap={buttonTap}
                className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg border border-indigo-100 dark:border-indigo-800 flex flex-col items-center justify-center"
              >
                <FiDollarSign className="text-indigo-600 dark:text-indigo-300 text-xl mb-1" />
                <span className="text-sm font-medium text-indigo-700 dark:text-indigo-200">Add Income</span>
              </motion.button>
              
              <motion.button
                whileHover={buttonHover}
                whileTap={buttonTap}
                className="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg border border-green-100 dark:border-green-800 flex flex-col items-center justify-center"
              >
                <FiTrendingUp className="text-green-600 dark:text-green-300 text-xl mb-1" />
                <span className="text-sm font-medium text-green-700 dark:text-green-200">Set Goal</span>
              </motion.button>
              
              <motion.button
                whileHover={buttonHover}
                whileTap={buttonTap}
                className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-100 dark:border-blue-800 flex flex-col items-center justify-center"
              >
                <FiPieChart className="text-blue-600 dark:text-blue-300 text-xl mb-1" />
                <span className="text-sm font-medium text-blue-700 dark:text-blue-200">Budget</span>
              </motion.button>
              
              <motion.button
                whileHover={buttonHover}
                whileTap={buttonTap}
                className="p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg border border-purple-100 dark:border-purple-800 flex flex-col items-center justify-center"
              >
                <FiBarChart2 className="text-purple-600 dark:text-purple-300 text-xl mb-1" />
                <span className="text-sm font-medium text-purple-700 dark:text-purple-200">Reports</span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default TrackonomyDashboard