import { useState } from 'react';
import { Send, Loader2, CheckCircle } from 'lucide-react';
import api from '../api';

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
      
      if (onEntryAdded) {
        onEntryAdded(response.data);
      }
        setTimeout(() => {
        setFormData({ name: '', rollNo: '' });
        setIsSuccess(false);
        setIsLoading(false);
      }, 1000);
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
    if (error) setError('');
  };
  return (
    <div className="card">
      <h2 className="text-lg font-semibold text-gray-100 mb-4">Add Entry</h2>

      {isSuccess && (
        <div className="mb-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg text-green-300 text-sm">
          Entry added successfully!
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm">
          {error}
        </div>
      )}      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="input-field"
          required
          disabled={isLoading}
        />

        <input
          type="text"
          name="rollNo"
          value={formData.rollNo}
          onChange={handleChange}
          placeholder="Roll Number"
          className="input-field uppercase"
          required
          disabled={isLoading}
        />

        <button
          type="submit"
          disabled={!formData.name.trim() || !formData.rollNo.trim() || isLoading}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Submit
            </>
          )}
        </button>
      </form>
    </div>
  );
}
