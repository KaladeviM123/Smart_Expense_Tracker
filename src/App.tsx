import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { ChatAssistant } from './components/ChatAssistant';
import { ExpenseTracker } from './components/ExpenseTracker';
import { BudgetPlanning } from './components/BudgetPlanning';
import { TaxCalculator } from './components/TaxCalculator';
import { InvestmentAssistant } from './components/InvestmentAssistant';
import { DocumentUpload } from './components/DocumentUpload';
import { FinanceEducation } from './components/FinanceEducation';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/chat" element={
              <ProtectedRoute>
                <ChatAssistant />
              </ProtectedRoute>
            } />
            <Route path="/expenses" element={
              <ProtectedRoute>
                <ExpenseTracker />
              </ProtectedRoute>
            } />
            <Route path="/budget" element={
              <ProtectedRoute>
                <BudgetPlanning />
              </ProtectedRoute>
            } />
            <Route path="/tax" element={
              <ProtectedRoute>
                <TaxCalculator />
              </ProtectedRoute>
            } />
            <Route path="/investments" element={
              <ProtectedRoute>
                <InvestmentAssistant />
              </ProtectedRoute>
            } />
            <Route path="/documents" element={
              <ProtectedRoute>
                <DocumentUpload />
              </ProtectedRoute>
            } />
            <Route path="/education" element={
              <ProtectedRoute>
                <FinanceEducation />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;