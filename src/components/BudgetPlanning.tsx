import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Plus, Target, AlertTriangle, CheckCircle,
  Coffee, Car, ShoppingCart, Home, Gamepad2, DollarSign
} from 'lucide-react';

interface Budget {
  id: string;
  category: string;
  budgeted: number;
  spent: number;
  color: string;
}

export const BudgetPlanning: React.FC = () => {
  const [budgets, setBudgets] = useState<Budget[]>([
    { id: '1', category: 'Food', budgeted: 10000, spent: 8500, color: 'orange' },
    { id: '2', category: 'Transport', budgeted: 5000, spent: 4200, color: 'blue' },
    { id: '3', category: 'Entertainment', budgeted: 4000, spent: 3100, color: 'purple' },
    { id: '4', category: 'Bills', budgeted: 15000, spent: 12000, color: 'green' },
    { id: '5', category: 'Shopping', budgeted: 6000, spent: 5600, color: 'pink' },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newBudget, setNewBudget] = useState({
    category: '',
    budgeted: ''
  });

  const categories = [
    { name: 'Food', icon: Coffee, color: 'orange' },
    { name: 'Transport', icon: Car, color: 'blue' },
    { name: 'Shopping', icon: ShoppingCart, color: 'purple' },
    { name: 'Bills', icon: Home, color: 'green' },
    { name: 'Entertainment', icon: Gamepad2, color: 'pink' },
    { name: 'Salary', icon: DollarSign, color: 'indigo' }
  ];

  const handleAddBudget = () => {
    if (!newBudget.category || !newBudget.budgeted) return;

    const category = categories.find(cat => cat.name === newBudget.category);
    const budget: Budget = {
      id: Date.now().toString(),
      category: newBudget.category,
      budgeted: parseFloat(newBudget.budgeted),
      spent: 0,
      color: category?.color || 'gray'
    };

    setBudgets([...budgets, budget]);
    setNewBudget({ category: '', budgeted: '' });
    setShowAddForm(false);
  };

  const totalBudgeted = budgets.reduce((sum, budget) => sum + budget.budgeted, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
  const remainingBudget = totalBudgeted - totalSpent;

  const getProgressColor = (spent: number, budgeted: number) => {
    const percentage = (spent / budgeted) * 100;
    if (percentage >= 90) return 'red';
    if (percentage >= 70) return 'yellow';
    return 'green';
  };

  const getProgressWidth = (spent: number, budgeted: number) => {
    return Math.min((spent / budgeted) * 100, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center space-x-4">
            <Link
              to="/dashboard"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Budget Planning</h1>
              <p className="text-sm text-gray-500">Set and track your spending limits</p>
            </div>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Budget
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Budget</p>
                <p className="text-2xl font-bold text-blue-600">₹{totalBudgeted.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-red-600">₹{totalSpent.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-red-50 rounded-xl">
                <DollarSign className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Remaining</p>
                <p className={`text-2xl font-bold ${remainingBudget >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ₹{Math.abs(remainingBudget).toLocaleString()}
                </p>
              </div>
              <div className={`p-3 rounded-xl ${remainingBudget >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                {remainingBudget >= 0 ? (
                  <CheckCircle className="h-6 w-6 text-green-600" />
                ) : (
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Budget Progress */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Budget Progress</h2>
          <div className="space-y-6">
            {budgets.map((budget, index) => {
              const category = categories.find(cat => cat.name === budget.category);
              const IconComponent = category?.icon || Coffee;
              const progressColor = getProgressColor(budget.spent, budget.budgeted);
              const progressWidth = getProgressWidth(budget.spent, budget.budgeted);
              const percentage = (budget.spent / budget.budgeted) * 100;
              
              return (
                <motion.div
                  key={budget.id}
                  className="space-y-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-xl bg-${budget.color}-50 text-${budget.color}-600`}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{budget.category}</p>
                        <p className="text-sm text-gray-500">
                          ₹{budget.spent.toLocaleString()} of ₹{budget.budgeted.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${progressColor === 'red' ? 'text-red-600' : progressColor === 'yellow' ? 'text-yellow-600' : 'text-green-600'}`}>
                        {percentage.toFixed(1)}%
                      </p>
                      <p className="text-sm text-gray-500">
                        ₹{(budget.budgeted - budget.spent).toLocaleString()} left
                      </p>
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-500 ${
                        progressColor === 'red' ? 'bg-red-500' : 
                        progressColor === 'yellow' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${progressWidth}%` }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Budget Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget Alerts</h3>
            <div className="space-y-4">
              {budgets
                .filter(budget => (budget.spent / budget.budgeted) >= 0.8)
                .map(budget => (
                  <div key={budget.id} className="flex items-center p-3 bg-red-50 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-red-600 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-red-800">
                        {budget.category} budget almost exceeded
                      </p>
                      <p className="text-xs text-red-600">
                        {((budget.spent / budget.budgeted) * 100).toFixed(1)}% used
                      </p>
                    </div>
                  </div>
                ))}
              {budgets.filter(budget => (budget.spent / budget.budgeted) >= 0.8).length === 0 && (
                <div className="flex items-center p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <p className="text-sm text-green-800">All budgets are on track!</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget Tips</h3>
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-800 mb-1">💡 Smart Spending</p>
                <p className="text-xs text-blue-600">
                  Try the 50/30/20 rule: 50% needs, 30% wants, 20% savings
                </p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="text-sm font-medium text-purple-800 mb-1">📱 Track Daily</p>
                <p className="text-xs text-purple-600">
                  Review your spending daily to stay within budget limits
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm font-medium text-green-800 mb-1">🎯 Set Realistic Goals</p>
                <p className="text-xs text-green-600">
                  Start with achievable budgets and adjust as you learn your patterns
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Budget Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            className="bg-white rounded-2xl p-6 w-full max-w-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Add Budget</h3>
            
            <div className="space-y-4">
              <select
                value={newBudget.category}
                onChange={(e) => setNewBudget({...newBudget, category: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat.name} value={cat.name}>{cat.name}</option>
                ))}
              </select>

              <input
                type="number"
                placeholder="Budget Amount"
                value={newBudget.budgeted}
                onChange={(e) => setNewBudget({...newBudget, budgeted: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAddBudget}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Add Budget
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};