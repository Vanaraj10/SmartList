import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Loader2, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { cn } from '../utils';

export default function CreateForm() {
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) return;

    setIsLoading(true);
    
    try {
      const response = await api.post('/lists', formData);
      setIsSuccess(true);
      
      // Brief success state before navigation
      setTimeout(() => {
        navigate(`/list/${response.data.id}`);
      }, 800);
    } catch (error) {
      console.error('Failed to create list:', error);
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center py-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
          className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4"
        >
          <CheckCircle className="w-8 h-8 text-green-600" />
        </motion.div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">List Created!</h3>
        <p className="text-gray-600">Redirecting you to your new list...</p>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            List Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Completed Lab 4"
            className={cn(
              "input-field",
              formData.title && "ring-1 ring-green-200 border-green-300"
            )}
            required
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Optional: Add more details about this list"
            rows={3}
            className={cn(
              "input-field resize-none",
              formData.description && "ring-1 ring-green-200 border-green-300"
            )}
            disabled={isLoading}
          />
        </div>
      </div>

      <motion.button
        type="submit"
        disabled={!formData.title.trim() || isLoading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="btn-primary w-full flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Creating List...
          </>
        ) : (
          <>
            <Plus className="w-5 h-5" />
            Create List
          </>
        )}
      </motion.button>
    </motion.form>
  );
}
