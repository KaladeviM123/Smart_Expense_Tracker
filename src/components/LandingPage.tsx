import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  MessageCircle, TrendingUp, Calculator, Target, 
  Shield, FileText, Brain, Smartphone, 
  Globe, Mic, Bell, DollarSign 
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const LandingPage: React.FC = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: MessageCircle,
      title: "AI Chat Assistant",
      description: "Ask anything about your finances in natural language",
      color: "text-blue-600"
    },
    {
      icon: TrendingUp,
      title: "Smart Expense Tracking",
      description: "Automatic categorization and spending insights",
      color: "text-green-600"
    },
    {
      icon: Target,
      title: "Budget Planning",
      description: "Set goals and track progress with visual meters",
      color: "text-purple-600"
    },
    {
      icon: Calculator,
      title: "Tax Calculator",
      description: "Accurate tax estimates and saving suggestions",
      color: "text-orange-600"
    },
    {
      icon: DollarSign,
      title: "Investment Assistant",
      description: "Personalized investment recommendations",
      color: "text-indigo-600"
    },
    {
      icon: FileText,
      title: "Document Parser",
      description: "Upload and analyze financial documents",
      color: "text-teal-600"
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Never miss important financial deadlines",
      color: "text-red-600"
    },
    {
      icon: Brain,
      title: "Finance Education",
      description: "Learn complex topics explained simply",
      color: "text-pink-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                FinBuddy
              </span>
            </div>
            <Link
              to="/dashboard"
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              {user ? 'Go to Dashboard' : 'Get Started'}
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Your AI-Powered
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Finance Assistant
              </span>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Take control of your finances with intelligent expense tracking, personalized investment advice, 
              and conversational AI that understands your financial goals.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link
                to="/dashboard"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                {user ? 'Go to Dashboard' : 'Start Managing Finances'}
              </Link>
              <Link
                to="/chat"
                className="px-8 py-4 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold text-lg hover:border-blue-300 hover:text-blue-600 transition-all duration-200"
              >
                Try AI Assistant
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Financial Success
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From basic expense tracking to advanced investment planning, FinBuddy has all the tools you need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="p-6 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className={`inline-flex p-3 rounded-xl bg-gray-50 ${feature.color} mb-4`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Advanced & Unique Features
            </h2>
            <p className="text-xl text-gray-600">
              Cutting-edge technology meets personal finance
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="p-8 bg-white rounded-2xl shadow-lg">
              <Globe className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Multilingual Support</h3>
              <p className="text-gray-600">
                Chat in Hindi, Tamil, and other regional languages. Breaking language barriers in financial planning.
              </p>
            </div>

            <div className="p-8 bg-white rounded-2xl shadow-lg">
              <Mic className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Voice Assistant</h3>
              <p className="text-gray-600">
                Ask questions using voice commands. Perfect for hands-free financial management on mobile.
              </p>
            </div>

            <div className="p-8 bg-white rounded-2xl shadow-lg">
              <Shield className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Privacy First</h3>
              <p className="text-gray-600">
                End-to-end encryption and offline mode available. Your financial data stays completely private.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Financial Life?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users who are already managing their finances smarter with FinBuddy.
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg hover:bg-gray-50 transform hover:scale-105 transition-all duration-200"
          >
            {user ? 'Go to Dashboard' : 'Get Started for Free'}
            <TrendingUp className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">FinBuddy</span>
            </div>
            <p className="text-gray-400">
              © 2024 FinBuddy. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};