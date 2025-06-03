import { motion } from 'framer-motion';
import { ListChecks, Users, Zap, Shield } from 'lucide-react';
import CreateForm from '../components/CreateForm';
import Navbar from '../components/Navbar';

export default function HomePage() {
  const features = [
    {
      icon: ListChecks,
      title: 'Easy List Creation',
      description: 'Create public lists in seconds with just a title and description',
    },
    {
      icon: Users,
      title: 'Real-time Collaboration',
      description: 'Share your list URL and let others submit their entries instantly',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Built with modern tech stack for optimal performance',
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Your data is safe with enterprise-grade security',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-blue-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6"
          >
            <ListChecks className="w-8 h-8 text-primary-600" />
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Smart<span className="text-gradient">List</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Create public lists and collect entries from anyone with just a shareable link. 
            Perfect for attendance, sign-ups, and data collection.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Create Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:order-2"
          >
            <div className="card">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                Create Your List
              </h2>
              <CreateForm />
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:order-1"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Why Choose SmartList?
            </h2>
            
            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-white/50 transition-all duration-200"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="mt-8 p-6 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl text-white"
            >
              <h3 className="text-lg font-semibold mb-2">How it works</h3>
              <div className="space-y-2 text-sm text-primary-100">
                <p>1. Create a list with a title and description</p>
                <p>2. Share the generated link with your audience</p>
                <p>3. Collect entries and view them in real-time</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-16 pt-8 border-t border-gray-200"
        >
          <p className="text-gray-600">
            Built with ❤️ using React, Spring Boot, and MongoDB
          </p>
        </motion.div>
      </div>
    </div>
  );
}
