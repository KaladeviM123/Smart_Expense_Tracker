import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Send, Bot, User, ArrowLeft, Mic, MicOff, 
  DollarSign, TrendingUp, Calculator, Lightbulb 
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export const ChatAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hi! I'm your AI finance assistant. I can help you with budgeting, investments, tax planning, and answer any financial questions you have. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('budget') || lowerMessage.includes('spending')) {
      return "Based on your recent expenses, I notice you're spending ₹37,500 monthly. Your biggest categories are bills (₹12,000) and food (₹8,500). I'd recommend setting a budget of ₹35,000 to increase your savings by ₹2,500 per month. Would you like me to help you create a detailed budget plan?";
    } else if (lowerMessage.includes('invest') || lowerMessage.includes('sip') || lowerMessage.includes('mutual fund')) {
      return "For investment planning, I'd suggest a diversified approach based on your risk profile. With your current savings rate of 26.5%, you could invest ₹13,500 monthly in SIPs. I recommend 60% in equity funds, 30% in debt funds, and 10% in international funds. Shall I help you select specific funds?";
    } else if (lowerMessage.includes('tax') || lowerMessage.includes('80c') || lowerMessage.includes('deduction')) {
      return "For tax optimization, you can save up to ₹46,800 annually under Section 80C through ELSS, PPF, or ULIP. Based on your ₹51,000 monthly income, you're likely in the 20% tax bracket. Investing ₹1.5L in 80C options could save you ₹46,800 in taxes. Would you like specific recommendations?";
    } else if (lowerMessage.includes('save') || lowerMessage.includes('emergency fund')) {
      return "Your current savings rate of 26.5% is excellent! For emergency funds, I recommend saving 6-12 months of expenses (₹2.25L - ₹4.5L). You currently have ₹1.24L saved. Consider parking emergency funds in liquid funds or high-yield savings accounts for easy access.";
    } else if (lowerMessage.includes('expense') || lowerMessage.includes('track')) {
      return "I've analyzed your expense patterns. Your top spending categories are: Bills (32%), Food (23%), Transport (11%), Shopping (15%), and Entertainment (8%). To optimize, consider reducing shopping expenses by 20% and switching to a more economical food plan. This could save you ₹2,000+ monthly.";
    } else {
      return "I understand you're asking about financial planning. I can help you with budgeting, investment advice, tax planning, expense tracking, and general financial guidance. Could you be more specific about what aspect of your finances you'd like to discuss?";
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI processing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: simulateAIResponse(inputMessage),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "What's my spending pattern this month?",
    "How can I optimize my budget?",
    "Suggest investment options for ₹10,000",
    "Help me with tax saving strategies"
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center space-x-4">
            <Link
              to="/dashboard"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </Link>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">AI Finance Assistant</h1>
                <p className="text-sm text-gray-500">Always here to help with your finances</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`flex items-start space-x-3 max-w-3xl ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`p-2 rounded-xl ${message.type === 'user' ? 'bg-blue-600' : 'bg-white border border-gray-200'}`}>
                    {message.type === 'user' ? (
                      <User className="h-5 w-5 text-white" />
                    ) : (
                      <Bot className="h-5 w-5 text-blue-600" />
                    )}
                  </div>
                  <div className={`p-4 rounded-2xl ${message.type === 'user' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200'}`}>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <p className={`text-xs mt-2 ${message.type === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              className="flex justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-start space-x-3 max-w-3xl">
                <div className="p-2 bg-white border border-gray-200 rounded-xl">
                  <Bot className="h-5 w-5 text-blue-600" />
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Questions */}
      {messages.length === 1 && (
        <div className="px-4 py-4 bg-white border-t border-gray-200">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm text-gray-600 mb-3">Try asking:</p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setInputMessage(question)}
                  className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end space-x-4">
            <div className="flex-1 relative">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about your finances..."
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={1}
                style={{ minHeight: '48px', maxHeight: '120px' }}
              />
            </div>
            <button
              onClick={() => setIsListening(!isListening)}
              className={`p-3 rounded-xl transition-colors duration-200 ${isListening ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </button>
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};