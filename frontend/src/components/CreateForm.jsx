import { useState } from 'react';
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
      <div className="text-center py-6 sm:py-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-4 shadow-2xl shadow-green-500/25">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-lg sm:text-xl font-semibold text-gray-100 mb-2">List Created!</h3>
        <p className="text-gray-400 text-sm sm:text-base">Redirecting you to your new list...</p>
        <div className="mt-4 flex justify-center">
          <div className="w-8 h-1 bg-gradient-to-r from-primary-500 to-green-500 rounded-full"></div>
        </div>
      </div>
    );
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 sm:space-y-6"
    >
      <div className="space-y-4 sm:space-y-5">
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-300">
            List Title *
          </label>
          <div className="relative">
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Completed Lab 4"
              className={cn(
                "input-field text-sm sm:text-base transition-colors duration-200",
                formData.title && "ring-2 ring-primary-500/50 border-primary-500"
              )}
              required
              disabled={isLoading}
            />
            {formData.title && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-300">
            Description <span className="text-gray-500">(optional)</span>
          </label>
          <div>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add more details about this list"
              rows={3}
              className={cn(
                "input-field resize-none text-sm sm:text-base transition-colors duration-200",
                formData.description && "ring-2 ring-primary-500/50 border-primary-500"
              )}
              disabled={isLoading}
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={!formData.title.trim() || isLoading}
        className="btn-primary w-full flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base font-semibold py-3 sm:py-4"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
            Creating...
          </>
        ) : (
          <>
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            Create List
          </>
        )}
      </button>

      <div className="text-center">
        <p className="text-xs sm:text-sm text-gray-500">
          Your list will be public and shareable instantly
        </p>
      </div>
    </form>
  );
}
