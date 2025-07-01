import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Brain, Search, BookOpen, 
  TrendingUp, DollarSign, Shield, Calculator,
  ChevronRight, Star, Clock, Users
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  rating: number;
  students: number;
  topics: string[];
  icon: any;
  color: string;
}

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

export const FinanceEducation: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const courses: Course[] = [
    {
      id: '1',
      title: 'Personal Finance Basics',
      description: 'Learn the fundamentals of managing your money, budgeting, and building wealth.',
      difficulty: 'Beginner',
      duration: '2 hours',
      rating: 4.8,
      students: 1250,
      topics: ['Budgeting', 'Saving', 'Emergency Fund', 'Goal Setting'],
      icon: DollarSign,
      color: 'blue'
    },
    {
      id: '2',
      title: 'Investment Fundamentals',
      description: 'Understand different investment options, risk management, and portfolio building.',
      difficulty: 'Intermediate',
      duration: '3 hours',
      rating: 4.7,
      students: 980,
      topics: ['Stocks', 'Mutual Funds', 'SIP', 'Risk Assessment'],
      icon: TrendingUp,
      color: 'green'
    },
    {
      id: '3',
      title: 'Tax Planning Strategies',
      description: 'Master tax-saving techniques and optimize your tax liability legally.',
      difficulty: 'Intermediate',
      duration: '2.5 hours',
      rating: 4.6,
      students: 750,
      topics: ['80C Deductions', 'Tax Regimes', 'ELSS', 'Tax Planning'],
      icon: Calculator,
      color: 'orange'
    },
    {
      id: '4',
      title: 'Insurance & Protection',
      description: 'Learn about different insurance types and how to protect your financial future.',
      difficulty: 'Beginner',
      duration: '1.5 hours',
      rating: 4.5,
      students: 650,
      topics: ['Life Insurance', 'Health Insurance', 'Term Plans', 'Claims'],
      icon: Shield,
      color: 'purple'
    }
  ];

  const faqs: FAQ[] = [
    {
      question: "What is SIP and how does it work?",
      answer: "SIP (Systematic Investment Plan) is a method of investing in mutual funds where you invest a fixed amount regularly. It helps in rupee cost averaging and building wealth over time through the power of compounding.",
      category: "Investment"
    },
    {
      question: "How much should I save for an emergency fund?",
      answer: "Ideally, you should save 6-12 months of your monthly expenses as an emergency fund. This money should be easily accessible and kept in liquid investments like savings accounts or liquid funds.",
      category: "Saving"
    },
    {
      question: "What is the difference between old and new tax regime?",
      answer: "The old tax regime allows various deductions under sections like 80C, 80D, etc., but has higher tax rates. The new regime has lower tax rates but fewer deduction options. Choose based on your deductions and income level.",
      category: "Tax"
    },
    {
      question: "When should I start investing?",
      answer: "The best time to start investing is as early as possible. Even small amounts invested early can grow significantly due to compounding. Start with SIPs in diversified mutual funds if you're a beginner.",
      category: "Investment"
    },
    {
      question: "What is ELSS and how does it help in tax saving?",
      answer: "ELSS (Equity Linked Savings Scheme) are mutual funds that invest primarily in equity. Investments up to ₹1.5 lakh qualify for tax deduction under Section 80C, with a 3-year lock-in period.",
      category: "Tax"
    }
  ];

  const categories = ['all', 'Investment', 'Saving', 'Tax', 'Insurance'];

  const filteredFAQs = faqs.filter(faq => 
    (selectedCategory === 'all' || faq.category === selectedCategory) &&
    (faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
     faq.answer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
              <h1 className="text-2xl font-bold text-gray-900">Finance Education</h1>
              <p className="text-sm text-gray-500">Learn finance concepts explained simply</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center mb-4">
            <Brain className="h-8 w-8 mr-3" />
            <h2 className="text-3xl font-bold">Explain Like I'm 5 (ELI5)</h2>
          </div>
          <p className="text-xl text-blue-100 mb-6">
            Complex financial concepts made simple and easy to understand
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">50+</div>
              <div className="text-blue-200">Topics Covered</div>
            </div>
            <div>
              <div className="text-2xl font-bold">10K+</div>
              <div className="text-blue-200">Students Helped</div>
            </div>
            <div>
              <div className="text-2xl font-bold">4.8★</div>
              <div className="text-blue-200">Average Rating</div>
            </div>
          </div>
        </motion.div>

        {/* Learning Courses */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Featured Courses</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedCourse(course)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-${course.color}-50`}>
                    <course.icon className={`h-6 w-6 text-${course.color}-600`} />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    course.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                    course.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {course.difficulty}
                  </span>
                </div>

                <h4 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h4>
                <p className="text-gray-600 mb-4">{course.description}</p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {course.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {course.students.toLocaleString()}
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-yellow-500" />
                    {course.rating}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {course.topics.slice(0, 3).map((topic, topicIndex) => (
                    <span key={topicIndex} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs">
                      {topic}
                    </span>
                  ))}
                  {course.topics.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs">
                      +{course.topics.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-green-600">Free</span>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
          
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex space-x-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {category === 'all' ? 'All' : category}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h4>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    faq.category === 'Investment' ? 'bg-green-100 text-green-800' :
                    faq.category === 'Saving' ? 'bg-blue-100 text-blue-800' :
                    faq.category === 'Tax' ? 'bg-orange-100 text-orange-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {faq.category}
                  </span>
                </div>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>

          {filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No questions found matching your search.</p>
            </div>
          )}
        </div>
      </div>

      {/* Course Detail Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">{selectedCourse.title}</h3>
              <button
                onClick={() => setSelectedCourse(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-xl bg-${selectedCourse.color}-50`}>
                  <selectedCourse.icon className={`h-8 w-8 text-${selectedCourse.color}-600`} />
                </div>
                <div>
                  <div className="flex items-center space-x-4 mb-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedCourse.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                      selectedCourse.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {selectedCourse.difficulty}
                    </span>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      {selectedCourse.duration}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-500" />
                      {selectedCourse.rating} rating
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {selectedCourse.students.toLocaleString()} students
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 text-lg">{selectedCourse.description}</p>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">What you'll learn:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {selectedCourse.topics.map((topic, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      <span className="text-gray-700">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Course Features:</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Interactive lessons with real-world examples</li>
                  <li>• Practical exercises and case studies</li>
                  <li>• Downloadable resources and templates</li>
                  <li>• Certificate of completion</li>
                  <li>• Lifetime access to course materials</li>
                </ul>
              </div>
            </div>

            <div className="flex justify-between items-center mt-6">
              <span className="text-2xl font-bold text-green-600">Free Course</span>
              <button
                onClick={() => setSelectedCourse(null)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Start Learning
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};