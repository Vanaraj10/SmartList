import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import ErrorBoundary from './components/ErrorBoundary';
import HomePage from './pages/HomePage';
import ListPage from './pages/ListPage';
import './index.css';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/list/:id" element={<ListPage />} />
            </Routes>
          </AnimatePresence>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
