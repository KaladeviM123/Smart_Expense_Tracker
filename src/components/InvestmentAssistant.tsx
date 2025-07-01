import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Target, TrendingUp, DollarSign,
  PieChart, BarChart3, AlertCircle, CheckCircle
} from 'lucide-react';

interface InvestmentGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  timeframe: number;
  riskProfile: 'low' | 'medium' | 'high';
}

export const InvestmentAssistant: React.FC = () => {
  const [goals, setGoals] = useState<InvestmentGoal[]>([
    {
      id: '1',
      name: 'Emergency Fund',
      targetAmount: 300000,
      currentAmount: 150000,
      timeframe: 12,
      riskProfile: 'low'
    },
    {
      id: '2',
      name: 'Home Down Payment',
      targetAmount: 2000000,
      currentAmount: 400000,
      timeframe: 60,
      riskProfile: 'medium'
    },
    {
      id: '3',
      name: 'Retirement Planning',
      targetAmount: 10000000,
      currentAmount: 800000,
      timeframe: 300,
      riskProfile: 'high'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: '',
    currentAmount: '',
    timeframe: '',
    riskProfile: 'medium' as 'low' | 'medium' | 'high'
  });

  const investmentOptions = {
    low: [
      { name: 'Fixed Deposits', returns: '6-7%', risk: 'Very Low', liquidity: 'Medium' },
      { name: 'Liquid Funds', returns: '4-6%', risk: 'Very Low', liquidity: 'High' },
      { name: 'Savings Account', returns: '3-4%', risk: 'Very Low', liquidity: 'High' }
    ],
    medium: [
      { name: 'Hybrid Funds', returns: '8-12%', risk: 'Medium', liquidity: 'Medium' },
      { name: 'Large Cap Funds', returns: '10-14%', risk: 'Medium', liquidity: 'High' },
      { name: 'Index Funds', returns: '10-13%', risk: 'Medium', liquidity: 'High' }
    ],
    high: [
      { name: 'Small Cap Funds', returns: '12-18%', risk: 'High', liquidity: 'Medium' },
      { name: 'Mid Cap Funds', returns: '12-16%', risk: 'High', liquidity: 'Medium' },
      { name: 'Sectoral Funds', returns: '10-20%', risk: 'Very High', liquidity: 'Medium' }
    ]
  };

  const calculateSIP = (goal: InvestmentGoal) => {
    const remaining = goal.targetAmount - goal.currentAmount;
    const months = goal.timeframe;
    const rate = goal.riskProfile === 'low' ? 0.06 : goal.riskProfile === 'medium' ? 0.12 : 0.15;
    const monthlyRate = rate / 12;
    
    // SIP calculation formula
    const sip = remaining * monthlyRate / (Math.pow(1 + monthlyRate, months) - 1);
    return Math.ceil(sip);
  };

  const handleAddGoal = () => {
    if (!newGoal.name || !newGoal.targetAmount || !newGoal.timeframe) return;

    const goal: InvestmentGoal = {
      id: Date.now().toString(),
      name: newGoal.name,
      targetAmount: parseFloat(newGoal.targetAmount),
      currentAmount: parseFloat(newGoal.currentAmount) || 0,
      timeframe: parseInt(newGoal.timeframe),
      riskProfile: newGoal.riskProfile
    };

    setGoals([...goals, goal]);
    setNewGoal({
      name: '',
      targetAmount: '',
      currentAmount: '',
      timeframe: '',
      riskProfile: 'medium'
    });
    setShowAddForm(false);
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
              <h1 className="text-2xl font-bold text-gray-900">Investment Assistant</h1>
              <p className="text-sm text-gray-500">Plan and track your investment goals</p>
            </div>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Target className="h-4 w-4 mr-2" />
            Add Goal
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Investment Goals */}
        <div className="space-y-6 mb-8">
          {goals.map((goal, index) => {
            const progress = (goal.currentAmount / goal.targetAmount) * 100;
            const sipAmount = calculateSIP(goal);
            const remaining = goal.targetAmount - goal.currentAmount;
            
            return (
              <motion.div
                key={goal.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Goal Info */}
                  <div className="lg:col-span-2">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{goal.name}</h3>
                        <p className="text-sm text-gray-500">
                          Target: ₹{goal.targetAmount.toLocaleString()} • 
                          {goal.timeframe} months • 
                          {goal.riskProfile} risk
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        goal.riskProfile === 'low' ? 'bg-green-100 text-green-800' :
                        goal.riskProfile === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {goal.riskProfile.toUpperCase()} RISK
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">{progress.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          Current: ₹{goal.currentAmount.toLocaleString()}
                        </span>
                        <span className="text-gray-600">
                          Remaining: ₹{remaining.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* SIP Recommendation */}
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Recommended SIP</h4>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-blue-600 mb-1">
                        ₹{sipAmount.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">per month</p>
                    </div>
                    <div className="mt-4 text-xs text-gray-500">
                      <p>• Assuming {goal.riskProfile === 'low' ? '6%' : goal.riskProfile === 'medium' ? '12%' : '15%'} annual returns</p>
                      <p>• Duration: {Math.floor(goal.timeframe / 12)} years {goal.timeframe % 12} months</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Investment Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {Object.entries(investmentOptions).map(([risk, options], index) => (
            <motion.div
              key={risk}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <div className="flex items-center mb-4">
                <div className={`p-2 rounded-xl mr-3 ${
                  risk === 'low' ? 'bg-green-50' :
                  risk === 'medium' ? 'bg-yellow-50' : 'bg-red-50'
                }`}>
                  {risk === 'low' && <CheckCircle className="h-5 w-5 text-green-600" />}
                  {risk === 'medium' && <BarChart3 className="h-5 w-5 text-yellow-600" />}
                  {risk === 'high' && <TrendingUp className="h-5 w-5 text-red-600" />}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 capitalize">
                  {risk} Risk Options
                </h3>
              </div>

              <div className="space-y-4">
                {options.map((option, optionIndex) => (
                  <div key={optionIndex} className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900">{option.name}</h4>
                      <span className="text-sm font-semibold text-green-600">{option.returns}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                      <span>Risk: {option.risk}</span>
                      <span>Liquidity: {option.liquidity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Investment Tips */}
        <motion.div
          className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center mb-2">
                <PieChart className="h-5 w-5 text-blue-600 mr-2" />
                <span className="font-medium text-blue-800">Diversify</span>
              </div>
              <p className="text-sm text-blue-700">
                Don't put all eggs in one basket. Spread investments across asset classes.
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center mb-2">
                <Target className="h-5 w-5 text-green-600 mr-2" />
                <span className="font-medium text-green-800">Start Early</span>
              </div>
              <p className="text-sm text-green-700">
                The power of compounding works best when you start investing early.
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center mb-2">
                <DollarSign className="h-5 w-5 text-purple-600 mr-2" />
                <span className="font-medium text-purple-800">SIP is King</span>
              </div>
              <p className="text-sm text-purple-700">
                Systematic Investment Plans help you invest regularly and benefit from rupee cost averaging.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Add Goal Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            className="bg-white rounded-2xl p-6 w-full max-w-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Add Investment Goal</h3>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Goal Name (e.g., Car Purchase)"
                value={newGoal.name}
                onChange={(e) => setNewGoal({...newGoal, name: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="number"
                placeholder="Target Amount (₹)"
                value={newGoal.targetAmount}
                onChange={(e) => setNewGoal({...newGoal, targetAmount: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="number"
                placeholder="Current Amount (₹)"
                value={newGoal.currentAmount}
                onChange={(e) => setNewGoal({...newGoal, currentAmount: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="number"
                placeholder="Time Frame (months)"
                value={newGoal.timeframe}
                onChange={(e) => setNewGoal({...newGoal, timeframe: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <select
                value={newGoal.riskProfile}
                onChange={(e) => setNewGoal({...newGoal, riskProfile: e.target.value as 'low' | 'medium' | 'high'})}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Low Risk</option>
                <option value="medium">Medium Risk</option>
                <option value="high">High Risk</option>
              </select>
            </div>

            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAddGoal}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Add Goal
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};