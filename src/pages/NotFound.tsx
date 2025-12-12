import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container } from '../components/layout/Container';
import { Button } from '../components/common/Button';

export const NotFound: React.FC = () => {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* 404 Number */}
          <h1 className="text-9xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-4">
            404
          </h1>
          
          {/* Sad Anime Face */}
          <div className="text-6xl mb-6">😢</div>
          
          {/* Error Message */}
          <h2 className="text-3xl font-bold mb-3">Page Not Found</h2>
          <p className="text-gray-400 text-lg mb-8 max-w-md">
            Looks like this anime has gone missing from our database!
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <Link to="/">
              <Button variant="primary" className="px-6 py-3">
                🏠 Back to Home
              </Button>
            </Link>
            <Link to="/library">
              <Button variant="secondary" className="px-6 py-3">
                📚 Browse Library
              </Button>
            </Link>
          </div>
          
          {/* Fun Suggestion */}
          <p className="text-gray-500 text-sm mt-8">
            Why not try our random anime selector while you're here?
          </p>
        </motion.div>
      </div>
    </Container>
  );
};
