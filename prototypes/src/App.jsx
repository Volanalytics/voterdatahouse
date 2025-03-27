import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CommunityPlatform from './pages/CommunityPlatform';
import ContentAggregation from './pages/ContentAggregation';

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">VoterDataHouse Community Platform Prototypes</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Interactive demonstrations of our proposed community platform with credit system and governance structure.
        </p>
      </header>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
          <div className="h-48 bg-blue-50 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">Community Platform</h2>
            <p className="text-gray-600 mb-4">
              Dashboard, governance system, credit economy, and user contribution tracking.
            </p>
            <Link 
              to="/community-platform" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              View Prototype
            </Link>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
          <div className="h-48 bg-green-50 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">Content Aggregation</h2>
            <p className="text-gray-600 mb-4">
              Article and resource submission, voting, and discovery interface.
            </p>
            <Link 
              to="/content-aggregation" 
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              View Prototype
            </Link>
          </div>
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <Link 
          to="https://voterdatahouse.com" 
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Return to VoterDataHouse Main Site
        </Link>
      </div>
    </div>
  );
};

const App = () => {
  // Configure the basename based on your GitHub Pages setup
  const basename = process.env.NODE_ENV === 'production' ? '/prototypes' : '';

  return (
    <Router basename={basename}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/community-platform" element={<CommunityPlatform />} />
        <Route path="/content-aggregation" element={<ContentAggregation />} />
      </Routes>
    </Router>
  );
};

export default App;
