import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, CheckCircle, User, Hash } from 'lucide-react';
import api from '../api';
import { cn } from '../utils';

export default function EntryForm({ listId, onEntryAdded }) {
  const [formData, setFormData] = useState({ name: '', rollNo: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.rollNo.trim()) return;

    setIsLoading(true);
    setError('');
    
    try {
      const response = await api.post(`/lists/${listId}/entries`, {
        name: formData.name.trim(),
        rollNo: formData.rollNo.trim().toUpperCase()
      });
      
      setIsSuccess(true);
      
      // Call the callback to refresh the entries list
      if (onEntryAdded) {
        onEntryAdded(response.data);
      }
      
      // Reset form after brief success state
      setTimeout(() => {
        setFormData({ name: '', rollNo: '' });
        setIsSuccess(false);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Failed to submit entry:', error);
      const errorMessage = error.response?.data || error.response?.data?.message || 'Failed to submit entry. Please try again.';
      setError(typeof errorMessage === 'string' ? errorMessage : 'Failed to submit entry. Please try again.');
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="card text-center py-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
          className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4"
        >
          <CheckCircle className="w-8 h-8 text-green-600" />
        </motion.div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Entry Submitted!</h3>
        <p className="text-gray-600">Your entry has been added to the list.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="card"
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
        <Send className="w-5 h-5 text-primary-600" />
        Submit Your Entry
      </h2>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
        >
          {error}
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={cn(
                "input-field pl-10",
                formData.name && "ring-1 ring-green-200 border-green-300"
              )}
              required
              disabled={isLoading}
            />
          </div>
        </div>

        <div>
          <label htmlFor="rollNo" className="block text-sm font-medium text-gray-700 mb-2">
            Roll Number *
          </label>
          <div className="relative">
            <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              id="rollNo"
              name="rollNo"
              value={formData.rollNo}
              onChange={handleChange}
              placeholder="e.g., 21CS045"
              className={cn(
                "input-field pl-10 uppercase",
                formData.rollNo && "ring-1 ring-green-200 border-green-300"
              )}
              required
              disabled={isLoading}
            />
          </div>
        </div>

        <motion.button
          type="submit"
          disabled={!formData.name.trim() || !formData.rollNo.trim() || isLoading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Submit Entry
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
}
