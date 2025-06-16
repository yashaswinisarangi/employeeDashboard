import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">O</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Optum</h1>
              <p className="text-sm text-gray-600 -mt-1">MarTech Data Dictionary</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;