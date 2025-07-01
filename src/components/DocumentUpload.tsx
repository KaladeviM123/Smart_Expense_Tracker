import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Upload, FileText, Image, 
  CheckCircle, AlertTriangle, Eye, Download, Trash2
} from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: Date;
  status: 'processing' | 'completed' | 'error';
  extractedData?: any;
}

export const DocumentUpload: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'bank_statement_jan2024.pdf',
      type: 'pdf',
      size: 2048000,
      uploadDate: new Date('2024-01-15'),
      status: 'completed',
      extractedData: {
        transactions: 45,
        totalIncome: 51000,
        totalExpenses: 37500,
        categories: ['Salary', 'Food', 'Transport', 'Bills']
      }
    },
    {
      id: '2',
      name: 'utility_bill_dec2023.jpg',
      type: 'image',
      size: 1024000,
      uploadDate: new Date('2024-01-10'),
      status: 'completed',
      extractedData: {
        amount: 3200,
        dueDate: '2024-02-15',
        category: 'Electricity',
        vendor: 'State Electricity Board'
      }
    }
  ]);

  const [dragActive, setDragActive] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach(file => {
      const newDocument: Document = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.type.includes('pdf') ? 'pdf' : 'image',
        size: file.size,
        uploadDate: new Date(),
        status: 'processing'
      };

      setDocuments(prev => [newDocument, ...prev]);

      // Simulate processing
      setTimeout(() => {
        setDocuments(prev => prev.map(doc => 
          doc.id === newDocument.id 
            ? { 
                ...doc, 
                status: 'completed',
                extractedData: simulateExtraction(file.name)
              }
            : doc
        ));
      }, 3000);
    });
  };

  const simulateExtraction = (filename: string) => {
    if (filename.toLowerCase().includes('bank') || filename.toLowerCase().includes('statement')) {
      return {
        transactions: Math.floor(Math.random() * 50) + 20,
        totalIncome: Math.floor(Math.random() * 20000) + 40000,
        totalExpenses: Math.floor(Math.random() * 15000) + 25000,
        categories: ['Salary', 'Food', 'Transport', 'Bills', 'Entertainment']
      };
    } else if (filename.toLowerCase().includes('bill') || filename.toLowerCase().includes('invoice')) {
      return {
        amount: Math.floor(Math.random() * 5000) + 1000,
        dueDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        category: ['Electricity', 'Water', 'Internet', 'Phone'][Math.floor(Math.random() * 4)],
        vendor: 'Service Provider'
      };
    }
    return null;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const deleteDocument = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
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
              <h1 className="text-2xl font-bold text-gray-900">Document Upload</h1>
              <p className="text-sm text-gray-500">Upload and analyze your financial documents</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Upload Area */}
        <motion.div
          className={`border-2 border-dashed rounded-2xl p-8 text-center transition-colors duration-200 ${
            dragActive 
              ? 'border-blue-400 bg-blue-50' 
              : 'border-gray-300 bg-white hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Upload className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Upload Financial Documents
              </h3>
              <p className="text-gray-600 mb-4">
                Drag and drop your files here, or click to browse
              </p>
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png,.csv"
                onChange={(e) => e.target.files && handleFiles(e.target.files)}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors duration-200"
              >
                <Upload className="h-4 w-4 mr-2" />
                Choose Files
              </label>
            </div>
            <p className="text-sm text-gray-500">
              Supports: PDF, JPG, PNG, CSV • Max size: 10MB per file
            </p>
          </div>
        </motion.div>

        {/* Documents List */}
        {documents.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Uploaded Documents</h2>
            <div className="space-y-4">
              <AnimatePresence>
                {documents.map((doc, index) => (
                  <motion.div
                    key={doc.id}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-gray-50 rounded-xl">
                          {doc.type === 'pdf' ? (
                            <FileText className="h-6 w-6 text-red-600" />
                          ) : (
                            <Image className="h-6 w-6 text-blue-600" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{doc.name}</h3>
                          <p className="text-sm text-gray-500">
                            {formatFileSize(doc.size)} • {doc.uploadDate.toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        {/* Status */}
                        <div className="flex items-center space-x-2">
                          {doc.status === 'processing' && (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
                              <span className="text-sm text-blue-600">Processing...</span>
                            </>
                          )}
                          {doc.status === 'completed' && (
                            <>
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <span className="text-sm text-green-600">Completed</span>
                            </>
                          )}
                          {doc.status === 'error' && (
                            <>
                              <AlertTriangle className="h-4 w-4 text-red-600" />
                              <span className="text-sm text-red-600">Error</span>
                            </>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-2">
                          {doc.status === 'completed' && (
                            <button
                              onClick={() => setSelectedDocument(doc)}
                              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteDocument(doc.id)}
                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Extracted Data Preview */}
                    {doc.status === 'completed' && doc.extractedData && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                        <h4 className="font-medium text-gray-900 mb-2">Extracted Information</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          {doc.extractedData.transactions && (
                            <div>
                              <span className="text-gray-600">Transactions:</span>
                              <span className="ml-2 font-medium">{doc.extractedData.transactions}</span>
                            </div>
                          )}
                          {doc.extractedData.totalIncome && (
                            <div>
                              <span className="text-gray-600">Income:</span>
                              <span className="ml-2 font-medium text-green-600">₹{doc.extractedData.totalIncome.toLocaleString()}</span>
                            </div>
                          )}
                          {doc.extractedData.totalExpenses && (
                            <div>
                              <span className="text-gray-600">Expenses:</span>
                              <span className="ml-2 font-medium text-red-600">₹{doc.extractedData.totalExpenses.toLocaleString()}</span>
                            </div>
                          )}
                          {doc.extractedData.amount && (
                            <div>
                              <span className="text-gray-600">Amount:</span>
                              <span className="ml-2 font-medium">₹{doc.extractedData.amount.toLocaleString()}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Smart OCR</h3>
            <p className="text-sm text-gray-600">
              Automatically extract text and data from scanned documents and images
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Auto Categorization</h3>
            <p className="text-sm text-gray-600">
              Intelligently categorize transactions and expenses from your documents
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <Download className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Export Data</h3>
            <p className="text-sm text-gray-600">
              Export extracted data to CSV or integrate with your expense tracker
            </p>
          </div>
        </div>
      </div>

      {/* Document Details Modal */}
      {selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Document Details</h3>
              <button
                onClick={() => setSelectedDocument(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">File Information</h4>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">{selectedDocument.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Size:</span>
                    <span className="font-medium">{formatFileSize(selectedDocument.size)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Upload Date:</span>
                    <span className="font-medium">{selectedDocument.uploadDate.toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {selectedDocument.extractedData && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Extracted Data</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                      {JSON.stringify(selectedDocument.extractedData, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setSelectedDocument(null)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};