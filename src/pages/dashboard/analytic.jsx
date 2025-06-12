import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { 
  FiTrendingUp, 
  FiTrendingDown, 
  FiPieChart, 
  FiBarChart2, 
  FiCalendar,
  FiDollarSign,
  FiCreditCard,
  FiPocket,
  FiFilter
} from 'react-icons/fi'
import { Line, Bar, Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

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

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('3m')
  const [activeTab, setActiveTab] = useState('spending')
  const [isLoading, setIsLoading] = useState(true)
  const [filterOpen, setFilterOpen] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState([])

  // Mock data - in a real app this would come from API
  const [analyticsData, setAnalyticsData] = useState({
    spendingTrend: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      data: [1850, 2100, 1950, 2300, 2200, 2543]
    },
    incomeTrend: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      data: [3500, 3700, 3600, 3800, 3750, 3850]
    },
    categoryBreakdown: {
      labels: ['Housing', 'Food', 'Transport', 'Entertainment', 'Utilities', 'Other'],
      data: [1200, 650, 320, 180, 210, 193],
      colors: [
        'rgba(59, 130, 246, 0.7)',
        'rgba(16, 185, 129, 0.7)',
        'rgba(245, 158, 11, 0.7)',
        'rgba(139, 92, 246, 0.7)',
        'rgba(20, 184, 166, 0.7)',
        'rgba(244, 114, 182, 0.7)'
      ]
    },
    savingsRate: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      data: [2.8, 3.1, 2.9, 3.3, 3.2, 3.5]
    },
    predictions: [
      {
        id: 1,
        type: 'expense',
        title: 'Upcoming Subscription',
        description: 'Netflix subscription ($14.99) due in 3 days',
        date: '2024-07-15',
        amount: 14.99,
        category: 'Entertainment'
      },
      {
        id: 2,
        type: 'opportunity',
        title: 'Savings Opportunity',
        description: 'You could save $120/month by reducing dining out',
        impact: 120,
        category: 'Food'
      },
      {
        id: 3,
        type: 'forecast',
        title: 'Year-End Forecast',
        description: 'At current rate, you\'ll save $6,540 by year end',
        amount: 6540,
        confidence: 0.85
      },
      {
        id: 4,
        type: 'alert',
        title: 'Budget Alert',
        description: 'Entertainment budget will be exceeded by $45 this month',
        amount: 45,
        category: 'Entertainment'
      }
    ],
    allCategories: ['Housing', 'Food', 'Transport', 'Entertainment', 'Utilities', 'Health', 'Education', 'Other']
  })

  useEffect(() => {
    // Simulate data loading based on time range
    const timer = setTimeout(() => {
      setIsLoading(false)
      
      // In a real app, we would fetch data based on timeRange
      if (timeRange === '1m') {
        // Update data for 1 month view
        setAnalyticsData(prev => ({
          ...prev,
          spendingTrend: {
            ...prev.spendingTrend,
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            data: [600, 550, 700, 693]
          }
        }))
      } else if (timeRange === '3m') {
        // Default 3 month view
        setAnalyticsData(prev => ({
          ...prev,
          spendingTrend: {
            ...prev.spendingTrend,
            labels: ['Apr', 'May', 'Jun'],
            data: [2300, 2200, 2543]
          }
        }))
      } else if (timeRange === '1y') {
        // Yearly view
        setAnalyticsData(prev => ({
          ...prev,
          spendingTrend: {
            ...prev.spendingTrend,
            labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            data: [2000, 1900, 2100, 1950, 1800, 2200, 1850, 2100, 1950, 2300, 2200, 2543]
          }
        }))
      }
    }, 800)
    
    return () => clearTimeout(timer)
  }, [timeRange])

  // Chart configurations
  const spendingTrendOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `$${context.raw.toLocaleString()}`
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `$${value}`
        }
      }
    }
  }

  const spendingTrendData = {
    labels: analyticsData.spendingTrend.labels,
    datasets: [
      {
        label: 'Spending',
        data: analyticsData.spendingTrend.data,
        borderColor: 'rgba(239, 68, 68, 0.8)',
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: 'rgba(239, 68, 68, 1)',
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  }

  const incomeVsSpendingData = {
    labels: analyticsData.spendingTrend.labels,
    datasets: [
      {
        label: 'Income',
        data: analyticsData.incomeTrend.data,
        backgroundColor: 'rgba(16, 185, 129, 0.7)',
      },
      {
        label: 'Spending',
        data: analyticsData.spendingTrend.data,
        backgroundColor: 'rgba(239, 68, 68, 0.7)',
      }
    ]
  }

  const categoryBreakdownData = {
    labels: analyticsData.categoryBreakdown.labels,
    datasets: [
      {
        data: analyticsData.categoryBreakdown.data,
        backgroundColor: analyticsData.categoryBreakdown.colors,
        borderWidth: 1
      }
    ]
  }

  const savingsRateData = {
    labels: analyticsData.savingsRate.labels,
    datasets: [
      {
        label: 'Savings Rate %',
        data: analyticsData.savingsRate.data,
        borderColor: 'rgba(59, 130, 246, 0.8)',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.4,
        fill: true
      }
    ]
  }

  const toggleCategory = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8"
    >
      {/* Header and Time Range Selector */}
      <motion.header variants={itemVariants} className="mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Financial Analytics</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Detailed insights and predictive analysis of your finances
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={buttonHover}
              whileTap={buttonTap}
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
            >
              <FiFilter />
              <span>Filters</span>
            </motion.button>
            
            <div className="flex bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              {['1m', '3m', '1y'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1 text-sm ${
                    timeRange === range
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {range === '1m' ? '1 Month' : range === '3m' ? '3 Months' : '1 Year'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.header>

      {/* Filter Panel */}
      <AnimatePresence>
        {filterOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mb-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <div className="p-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-3">Filter by Category</h3>
              <div className="flex flex-wrap gap-2">
                {analyticsData.allCategories.map((category) => (
                  <motion.button
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleCategory(category)}
                    className={`px-3 py-1 text-sm rounded-full border ${
                      selectedCategories.includes(category)
                        ? 'bg-indigo-100 dark:bg-indigo-900 border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-200'
                        : 'bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Tabs */}
      <motion.nav variants={itemVariants} className="mb-6">
        <div className="flex space-x-1 p-1 bg-white dark:bg-gray-800 rounded-xl shadow-inner border border-gray-200 dark:border-gray-700">
          {['spending', 'income', 'savings', 'predictions'].map((tab) => (
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

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Charts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Spending Trend Chart */}
          {(activeTab === 'spending' || activeTab === 'income') && (
            <motion.div 
              variants={itemVariants}
              whileHover={cardHover}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {activeTab === 'spending' ? 'Spending Trend' : 'Income Trend'}
                </h3>
                {activeTab === 'spending' ? (
                  <FiTrendingDown className="text-red-500 text-xl" />
                ) : (
                  <FiTrendingUp className="text-green-500 text-xl" />
                )}
              </div>
              
              <div className="h-80">
                <Line 
                  data={activeTab === 'spending' ? spendingTrendData : {
                    ...spendingTrendData,
                    datasets: [{
                      ...spendingTrendData.datasets[0],
                      label: 'Income',
                      borderColor: 'rgba(16, 185, 129, 0.8)',
                      backgroundColor: 'rgba(16, 185, 129, 0.2)',
                      pointBackgroundColor: 'rgba(16, 185, 129, 1)'
                    }]
                  }} 
                  options={spendingTrendOptions} 
                />
              </div>
            </motion.div>
          )}

          {/* Income vs Spending Comparison */}
          {activeTab === 'spending' && (
            <motion.div 
              variants={itemVariants}
              whileHover={cardHover}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Income vs Spending</h3>
                <FiBarChart2 className="text-indigo-500 text-xl" />
              </div>
              
              <div className="h-80">
                <Bar 
                  data={incomeVsSpendingData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                      tooltip: {
                        callbacks: {
                          label: (context) => {
                            return `${context.dataset.label}: $${context.raw.toLocaleString()}`
                          }
                        }
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          callback: (value) => `$${value}`
                        }
                      }
                    }
                  }}
                />
              </div>
            </motion.div>
          )}

          {/* Category Breakdown */}
          {activeTab === 'spending' && (
            <motion.div 
              variants={itemVariants}
              whileHover={cardHover}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Spending by Category</h3>
                <FiPieChart className="text-indigo-500 text-xl" />
              </div>
              
              <div className="h-80 flex items-center justify-center">
                <div className="w-full max-w-md">
                  <Pie 
                    data={categoryBreakdownData}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: 'right',
                        },
                        tooltip: {
                          callbacks: {
                            label: (context) => {
                              const label = context.label || ''
                              const value = context.raw || 0
                              const total = context.dataset.data.reduce((a, b) => a + b, 0)
                              const percentage = Math.round((value / total) * 100)
                              return `${label}: $${value} (${percentage}%)`
                            }
                          }
                        }
                      }
                    }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Savings Rate */}
          {activeTab === 'savings' && (
            <motion.div 
              variants={itemVariants}
              whileHover={cardHover}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Savings Rate Trend</h3>
                <FiTrendingUp className="text-blue-500 text-xl" />
              </div>
              
              <div className="h-80">
                <Line 
                  data={savingsRateData}
                  options={{
                    ...spendingTrendOptions,
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          callback: (value) => `${value}%`
                        }
                      }
                    }
                  }} 
                />
              </div>
            </motion.div>
          )}

          {/* Predictions */}
          {activeTab === 'predictions' && (
            <motion.div 
              variants={itemVariants}
              whileHover={cardHover}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI-Powered Predictions</h3>
                <FiCalendar className="text-indigo-500 text-xl" />
              </div>
              
              <div className="space-y-4">
                {analyticsData.predictions.map((prediction) => (
                  <motion.div
                    key={prediction.id}
                    whileHover={{ x: 5 }}
                    className={`p-4 rounded-lg border ${
                      prediction.type === 'expense'
                        ? 'bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-800/50'
                        : prediction.type === 'opportunity'
                        ? 'bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800/50'
                        : prediction.type === 'forecast'
                        ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800/50'
                        : 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-100 dark:border-yellow-800/50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${
                        prediction.type === 'expense'
                          ? 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300'
                          : prediction.type === 'opportunity'
                          ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300'
                          : prediction.type === 'forecast'
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                          : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300'
                      }`}>
                        {prediction.type === 'expense' ? (
                          <FiCreditCard />
                        ) : prediction.type === 'opportunity' ? (
                          <FiTrendingUp />
                        ) : prediction.type === 'forecast' ? (
                          <FiPocket />
                        ) : (
                          <FiDollarSign />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white">{prediction.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{prediction.description}</p>
                        {prediction.date && (
                          <p className="text-xs mt-1 text-gray-500 dark:text-gray-500">
                            Due: {new Date(prediction.date).toLocaleDateString()}
                          </p>
                        )}
                        {prediction.confidence && (
                          <div className="mt-2">
                            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                              <span>Confidence</span>
                              <span>{Math.round(prediction.confidence * 100)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                              <div 
                                className="bg-indigo-600 h-1.5 rounded-full" 
                                style={{ width: `${prediction.confidence * 100}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      {prediction.amount && (
                        <p className={`font-medium ${
                          prediction.type === 'expense' || prediction.type === 'alert'
                            ? 'text-red-600 dark:text-red-400'
                            : 'text-green-600 dark:text-green-400'
                        }`}>
                          {prediction.type === 'expense' || prediction.type === 'alert' ? '-' : '+'}${prediction.amount.toFixed(2)}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Column - Summary and Key Metrics */}
        <div className="space-y-6">
          {/* Key Metrics */}
          <motion.div 
            variants={itemVariants}
            whileHover={cardHover}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Key Metrics</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Income</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    ${analyticsData.incomeTrend.data.slice(-1)[0].toLocaleString()}
                  </p>
                </div>
                <FiTrendingUp className="text-green-500 text-xl" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Expenses</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    ${analyticsData.spendingTrend.data.slice(-1)[0].toLocaleString()}
                  </p>
                </div>
                <FiTrendingDown className="text-red-500 text-xl" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Savings Rate</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {analyticsData.savingsRate.data.slice(-1)[0]}%
                  </p>
                </div>
                <FiTrendingUp className="text-blue-500 text-xl" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Net Savings</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    ${(analyticsData.incomeTrend.data.slice(-1)[0] - analyticsData.spendingTrend.data.slice(-1)[0]).toLocaleString()}
                  </p>
                </div>
                <FiDollarSign className="text-indigo-500 text-xl" />
              </div>
            </div>
          </motion.div>

          {/* Top Spending Categories */}
          {(activeTab === 'spending' || activeTab === 'predictions') && (
            <motion.div 
              variants={itemVariants}
              whileHover={cardHover}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Spending Categories</h3>
              
              <div className="space-y-3">
                {analyticsData.categoryBreakdown.labels.map((label, index) => (
                  <div key={label} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">{label}</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        ${analyticsData.categoryBreakdown.data[index]} ({Math.round((analyticsData.categoryBreakdown.data[index] / 
                          analyticsData.categoryBreakdown.data.reduce((a, b) => a + b, 0)) * 100)}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                      <div 
                        className="h-1.5 rounded-full" 
                        style={{
                          width: `${(analyticsData.categoryBreakdown.data[index] / 
                            analyticsData.categoryBreakdown.data.reduce((a, b) => a + b, 0)) * 100}%`,
                          backgroundColor: analyticsData.categoryBreakdown.colors[index]
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Quick Insights */}
          <motion.div 
            variants={itemVariants}
            whileHover={cardHover}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Insights</h3>
            
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/50">
                <p className="font-medium text-blue-800 dark:text-blue-200">Spending Trend</p>
                <p className="text-sm text-blue-600 dark:text-blue-300">
                  Your spending increased by {((
                    (analyticsData.spendingTrend.data.slice(-1)[0] - 
                    analyticsData.spendingTrend.data.slice(-2)[0]) / 
                    analyticsData.spendingTrend.data.slice(-2)[0] * 100)).toFixed(1)}% this month
                </p>
              </div>
              
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800/50">
                <p className="font-medium text-green-800 dark:text-green-200">Savings Potential</p>
                <p className="text-sm text-green-600 dark:text-green-300">
                  You could save ${Math.round(analyticsData.spendingTrend.data.slice(-1)[0] * 0.15)}/month by optimizing top 2 categories
                </p>
              </div>
              
              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-800/50">
                <p className="font-medium text-purple-800 dark:text-purple-200">Financial Health</p>
                <p className="text-sm text-purple-600 dark:text-purple-300">
                  Your savings rate is better than {Math.round(65 + Math.random() * 10)}% of similar users
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default AnalyticsDashboard