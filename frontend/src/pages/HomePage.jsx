import { ListChecks } from 'lucide-react';
import CreateForm from '../components/CreateForm';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-dark-925">
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        {/* Main Content */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[calc(100vh-12rem)]">
            {/* Left Side - Hero Content */}
          <div className="text-center lg:text-left order-1 lg:order-1 mt-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl mb-6 shadow-2xl shadow-primary-500/25 relative lg:hidden">
              <ListChecks className="w-8 h-8 text-white" />
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-100 mb-4 sm:mb-6 tracking-tight">
              Smart<span className="gradient-text">List</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-400 mb-6 sm:mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Create public lists and collect entries from anyone with just a shareable link.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500">
              <span className="flex items-center gap-2 px-3 py-1 bg-dark-800/50 rounded-full border border-gray-800">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Real-time
              </span>
              <span className="flex items-center gap-2 px-3 py-1 bg-dark-800/50 rounded-full border border-gray-800">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                No signup
              </span>
              <span className="flex items-center gap-2 px-3 py-1 bg-dark-800/50 rounded-full border border-gray-800">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                Instant
              </span>
            </div>
          </div>          {/* Right Side - Create Form */}
          <div className="w-full order-2 lg:order-2">
            <div className="card">
              <div className="hidden lg:flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg relative">
                  <ListChecks className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-gray-100">
                  Create Your List
                </h2>
              </div>
              <CreateForm />
            </div>
          </div>
        </div>

        {/* Simple Footer */}
        <div className="text-center mt-8 lg:mt-16 pt-6 border-t border-gray-800/50">
          <p className="text-gray-600 text-sm">
            Made by VJ_2303
          </p>
        </div>
      </div>
    </div>
  );
}