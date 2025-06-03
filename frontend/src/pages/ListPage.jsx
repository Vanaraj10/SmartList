import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Share2, 
  Copy, 
  CheckCircle, 
  Calendar, 
  FileText,
  ExternalLink,
  Loader2
} from 'lucide-react';
import Navbar from '../components/Navbar';
import EntryForm from '../components/EntryForm';
import EntryList from '../components/EntryList';
import api from '../api';
import { formatDate, generateShareableLink, copyToClipboard } from '../utils';

export default function ListPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listData, setListData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    if (id) {
      fetchListData();
    }
  }, [id]);

  const fetchListData = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/lists/${id}`);
      setListData(response.data);
      setError('');
    } catch (error) {
      console.error('Failed to fetch list:', error);
      setError('List not found or failed to load.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = async () => {
    const shareableLink = generateShareableLink(id);
    try {
      await copyToClipboard(shareableLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  const handleEntryAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <Loader2 className="w-12 h-12 text-primary-600 animate-spin mx-auto mb-4" />
            <p className="text-lg text-gray-600">Loading list...</p>
          </motion.div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md mx-auto px-4"
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Oops!</h2>
              <p className="text-gray-600 mb-6">{error}</p>
              <button
                onClick={() => navigate('/')}
                className="btn-primary inline-flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Home
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigate('/')}
              className="btn-secondary flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
            
            <button
              onClick={handleShare}
              className="btn-primary flex items-center gap-2"
            >
              {copied ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  Share List
                </>
              )}
            </button>
          </div>

          <div className="card">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-3">
                  {listData?.title}
                </h1>
                
                {listData?.description && (
                  <p className="text-lg text-gray-600 mb-4">
                    {listData.description}
                  </p>
                )}
                
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Created {formatDate(listData?.createdAt)}
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <ExternalLink className="w-4 h-4" />
                    <code className="px-2 py-1 bg-gray-100 rounded text-xs">
                      {id}
                    </code>
                  </div>
                </div>
              </div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-shrink-0"
              >
                <button
                  onClick={handleShare}
                  className="p-3 bg-primary-50 hover:bg-primary-100 text-primary-600 rounded-lg transition-colors duration-200"
                  title="Copy share link"
                >
                  {copied ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Entry Form */}
          <div>
            <EntryForm listId={id} onEntryAdded={handleEntryAdded} />
          </div>
          
          {/* Entry List */}
          <div>
            <EntryList listId={id} refreshTrigger={refreshTrigger} />
          </div>
        </div>

        {/* Share Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 card bg-gradient-to-r from-primary-50 to-blue-50 border-primary-200"
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <Share2 className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Share This List
              </h3>
              <p className="text-gray-600 mb-3">
                Send this link to anyone you want to collect entries from:
              </p>
              <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-primary-200">
                <code className="flex-1 text-sm text-gray-700 break-all">
                  {generateShareableLink(id)}
                </code>
                <button
                  onClick={handleShare}
                  className="btn-secondary text-sm py-1 px-2 flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" />
                  Copy
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
