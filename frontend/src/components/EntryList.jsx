import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Clock, User, Hash, RefreshCw, Search } from 'lucide-react';
import api from '../api';
import { formatDate, cn } from '../utils';

export default function EntryList({ listId, refreshTrigger }) {
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  const fetchEntries = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/lists/${listId}/entries`);
      setEntries(response.data.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)));
      setError('');
    } catch (error) {
      console.error('Failed to fetch entries:', error);
      setError('Failed to load entries. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (listId) {
      fetchEntries();
    }
  }, [listId, refreshTrigger]);

  const filteredEntries = entries.filter(entry =>
    entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="card text-center py-12"
      >
        <RefreshCw className="w-8 h-8 text-primary-600 animate-spin mx-auto mb-4" />
        <p className="text-gray-600">Loading entries...</p>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card text-center py-12"
      >
        <div className="text-red-500 mb-4">
          <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p className="text-lg font-medium">{error}</p>
        </div>
        <button
          onClick={fetchEntries}
          className="btn-primary inline-flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="card"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <Users className="w-5 h-5 text-primary-600" />
          Submitted Entries
          <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded-full">
            {entries.length}
          </span>
        </h2>
        
        <button
          onClick={fetchEntries}
          className="btn-secondary text-sm py-2 px-3 flex items-center gap-1"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {entries.length > 0 && (
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or roll number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10 text-sm"
            />
          </div>
        </div>
      )}

      {entries.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center py-12"
        >
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No entries yet</h3>
          <p className="text-gray-600">Be the first to submit an entry!</p>
        </motion.div>
      ) : filteredEntries.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8"
        >
          <Search className="w-8 h-8 text-gray-300 mx-auto mb-2" />
          <p className="text-gray-600">No entries match your search</p>
        </motion.div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredEntries.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                layout
                className={cn(
                  "p-4 rounded-lg border transition-all duration-200",
                  "bg-gray-50 hover:bg-gray-100 border-gray-200",
                  index === 0 && "ring-2 ring-primary-100 bg-primary-50 hover:bg-primary-100"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium",
                      index === 0 ? "bg-primary-100 text-primary-700" : "bg-gray-200 text-gray-700"
                    )}>
                      {index + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="font-medium text-gray-900">{entry.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Hash className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600 font-mono uppercase">
                          {entry.rollNo}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      {formatDate(entry.submittedAt)}
                    </div>
                    {index === 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-primary-100 text-primary-700 rounded-full"
                      >
                        Latest
                      </motion.span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}
