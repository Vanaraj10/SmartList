import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, CheckCircle, FileText, Loader2 } from 'lucide-react';
import EntryForm from '../components/EntryForm';
import EntryList from '../components/EntryList';
import api from '../api';
import { generateShareableLink, copyToClipboard } from '../utils';

export default function ListPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listData, setListData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
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

    if (id) {
      fetchListData();
    }
  }, [id]);

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
      <div className="min-h-screen bg-dark-925 bg-mesh flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-primary-500 animate-spin mx-auto mb-2" />
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-dark-925 bg-mesh flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <FileText className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-100 mb-2">Error</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="btn-primary inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-925 bg-mesh">
      <div className="max-w-4xl mx-auto px-4 py-6">
        
        {/* Simple Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/')}
            className="btn-secondary flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
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
                Share
              </>
            )}
          </button>
        </div>

        {/* List Title */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-100 mb-2">
            {listData?.title}
          </h1>
          {listData?.description && (
            <p className="text-gray-400">
              {listData.description}
            </p>
          )}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <EntryForm listId={id} onEntryAdded={handleEntryAdded} />
          </div>
          
          <div>
            <EntryList listId={id} refreshTrigger={refreshTrigger} />
          </div>
        </div>
      </div>
    </div>
  );
}
