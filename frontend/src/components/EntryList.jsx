import { useState, useEffect } from 'react';
import { Users, RefreshCw, Clock } from 'lucide-react';
import api from '../api';
import { formatDate } from '../utils';

export default function EntryList({ listId, refreshTrigger }) {
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState('');

  const fetchEntries = async (isManualRefresh = false) => {
    try {
      if (isManualRefresh) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }
      const response = await api.get(`/lists/${listId}/entries`);
      setEntries(response.data.sort((a, b) => new Date(a.submittedAt) - new Date(b.submittedAt)));
      setError('');
    } catch (error) {
      console.error('Failed to fetch entries:', error);
      setError('Failed to load entries.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };
  useEffect(() => {
    if (listId) {
      fetchEntries();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listId, refreshTrigger]);

  const handleManualRefresh = () => {
    fetchEntries(true);
  };

  if (isLoading) {
    return (
      <div className="card text-center py-8">
        <RefreshCw className="w-6 h-6 text-primary-500 animate-spin mx-auto mb-2" />
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card text-center py-8">
        <p className="text-red-400 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="btn-primary"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="card">      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-100">
          Entries ({entries.length})
        </h2>
        <button
          onClick={handleManualRefresh}
          disabled={isRefreshing}
          className="p-2 text-gray-400 hover:text-primary-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Refresh entries"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {entries.length === 0 ? (
        <div className="text-center py-8">
          <Users className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400">No entries yet</p>
        </div>
      ) : (
        <div className="space-y-2">
          {entries.map((entry, index) => (            <div
              key={entry.id}
              className="p-3 rounded-lg bg-dark-800/50 border border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-200">{entry.name}</p>
                  <p className="text-sm text-gray-400 font-mono uppercase">
                    {entry.rollNo}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                    <Clock className="w-3 h-3" />
                    <span>{formatDate(entry.submittedAt)}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-500">
                    #{index + 1}
                  </span>
                  {index === 0 && (
                    <div className="text-xs text-green-400 font-medium mt-1">
                      First!
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
