import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Calculator, FileText, TrendingDown,
  AlertCircle, CheckCircle, Info
} from 'lucide-react';

export const TaxCalculator: React.FC = () => {
  const [formData, setFormData] = useState({
    annualIncome: '',
    regime: 'old',
    section80C: '',
    section80D: '',
    homeLoanInterest: '',
    otherDeductions: ''
  });

  const [results, setResults] = useState<any>(null);

  const calculateTax = () => {
    const income = parseFloat(formData.annualIncome) || 0;
    const section80C = Math.min(parseFloat(formData.section80C) || 0, 150000);
    const section80D = Math.min(parseFloat(formData.section80D) || 0, 25000);
    const homeLoan = Math.min(parseFloat(formData.homeLoanInterest) || 0, 200000);
    const otherDed = parseFloat(formData.otherDeductions) || 0;

    let taxableIncome = income;
    let totalDeductions = 0;

    if (formData.regime === 'old') {
      totalDeductions = section80C + section80D + homeLoan + otherDed;
      taxableIncome = Math.max(income - totalDeductions, 0);
    }

    // Tax calculation based on regime
    let tax = 0;
    if (formData.regime === 'new') {
      // New regime slabs (simplified)
      if (taxableIncome > 300000) tax += Math.min(taxableIncome - 300000, 300000) * 0.05;
      if (taxableIncome > 600000) tax += Math.min(taxableIncome - 600000, 300000) * 0.10;
      if (taxableIncome > 900000) tax += Math.min(taxableIncome - 900000, 300000) * 0.15;
      if (taxableIncome > 1200000) tax += Math.min(taxableIncome - 1200000, 300000) * 0.20;
      if (taxableIncome > 1500000) tax += (taxableIncome - 1500000) * 0.30;
    } else {
      // Old regime slabs
      if (taxableIncome > 250000) tax += Math.min(taxableIncome - 250000, 250000) * 0.05;
      if (taxableIncome > 500000) tax += Math.min(taxableIncome - 500000, 500000) * 0.20;
      if (taxableIncome > 1000000) tax += (taxableIncome - 1000000) * 0.30;
    }

    // Add cess (4% of tax)
    const cess = tax * 0.04;
    const totalTax = tax + cess;

    setResults({
      grossIncome: income,
      totalDeductions,
      taxableIncome,
      incomeTax: tax,
      cess,
      totalTax,
      netIncome: income - totalTax,
      effectiveRate: income > 0 ? (totalTax / income) * 100 : 0,
      regime: formData.regime
    });
  };

  const taxSavingTips = [
    {
      title: "Section 80C",
      limit: "₹1.5 Lakh",
      options: "ELSS, PPF, NSC, Life Insurance",
      icon: "💰"
    },
    {
      title: "Section 80D",
      limit: "₹25,000",
      options: "Health Insurance Premiums",
      icon: "🏥"
    },
    {
      title: "Home Loan Interest",
      limit: "₹2 Lakh",
      options: "Interest on home loan",
      icon: "🏠"
    },
    {
      title: "NPS (80CCD(1B))",
      limit: "₹50,000",
      options: "Additional NPS investment",
      icon: "🎯"
    }
  ];

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
              <h1 className="text-2xl font-bold text-gray-900">Tax Calculator</h1>
              <p className="text-sm text-gray-500">Calculate your income tax and find savings</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tax Calculator Form */}
          <motion.div
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center mb-6">
              <Calculator className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Income Tax Calculator</h2>
            </div>

            <div className="space-y-6">
              {/* Income */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Annual Income (₹)
                </label>
                <input
                  type="number"
                  value={formData.annualIncome}
                  onChange={(e) => setFormData({...formData, annualIncome: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your annual income"
                />
              </div>

              {/* Tax Regime */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tax Regime
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="old"
                      checked={formData.regime === 'old'}
                      onChange={(e) => setFormData({...formData, regime: e.target.value})}
                      className="mr-2"
                    />
                    Old Regime
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="new"
                      checked={formData.regime === 'new'}
                      onChange={(e) => setFormData({...formData, regime: e.target.value})}
                      className="mr-2"
                    />
                    New Regime
                  </label>
                </div>
              </div>

              {/* Deductions (Old Regime Only) */}
              {formData.regime === 'old' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Section 80C Deductions (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.section80C}
                      onChange={(e) => setFormData({...formData, section80C: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Max ₹1,50,000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Section 80D (Health Insurance) (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.section80D}
                      onChange={(e) => setFormData({...formData, section80D: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Max ₹25,000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Home Loan Interest (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.homeLoanInterest}
                      onChange={(e) => setFormData({...formData, homeLoanInterest: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Max ₹2,00,000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Other Deductions (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.otherDeductions}
                      onChange={(e) => setFormData({...formData, otherDeductions: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="80G, 80TTA, etc."
                    />
                  </div>
                </>
              )}

              <button
                onClick={calculateTax}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                Calculate Tax
              </button>
            </div>
          </motion.div>

          {/* Results */}
          <div className="space-y-6">
            {results && (
              <motion.div
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center mb-6">
                  <FileText className="h-6 w-6 text-green-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">Tax Calculation Results</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium text-blue-800">Gross Annual Income</span>
                    <span className="font-semibold text-blue-900">₹{results.grossIncome.toLocaleString()}</span>
                  </div>

                  {results.regime === 'old' && (
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium text-green-800">Total Deductions</span>
                      <span className="font-semibold text-green-900">₹{results.totalDeductions.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <span className="text-sm font-medium text-yellow-800">Taxable Income</span>
                    <span className="font-semibold text-yellow-900">₹{results.taxableIncome.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span className="text-sm font-medium text-red-800">Income Tax</span>
                    <span className="font-semibold text-red-900">₹{results.incomeTax.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span className="text-sm font-medium text-red-800">Health & Education Cess (4%)</span>
                    <span className="font-semibold text-red-900">₹{results.cess.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-gray-900 text-white rounded-lg">
                    <span className="text-sm font-medium">Total Tax Payable</span>
                    <span className="font-bold text-lg">₹{results.totalTax.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="text-sm font-medium text-purple-800">Net Take-Home</span>
                    <span className="font-semibold text-purple-900">₹{results.netIncome.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
                    <span className="text-sm font-medium text-indigo-800">Effective Tax Rate</span>
                    <span className="font-semibold text-indigo-900">{results.effectiveRate.toFixed(2)}%</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tax Saving Tips */}
            <motion.div
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center mb-6">
                <TrendingDown className="h-6 w-6 text-orange-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">Tax Saving Options</h3>
              </div>

              <div className="space-y-4">
                {taxSavingTips.map((tip, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-blue-200 transition-colors duration-200">
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">{tip.icon}</span>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="font-medium text-gray-900">{tip.title}</h4>
                          <span className="text-sm font-semibold text-blue-600">{tip.limit}</span>
                        </div>
                        <p className="text-sm text-gray-600">{tip.options}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-800 mb-1">💡 Pro Tip</p>
                    <p className="text-sm text-blue-700">
                      Consider combining ELSS investments with NPS to maximize tax savings while building wealth for the future.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};