import { Loader2 } from 'lucide-react';

export default function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="mb-4">
        <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
      </div>
      <p className="text-gray-600">{message}</p>
    </div>
  );
}
