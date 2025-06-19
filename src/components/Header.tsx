import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full top-0 left-0 flex items-center justify-between px-6 py-4 border-b bg-gray shadow-sm">
      <div className="flex items-center gap-3">
        <div className="h-6 w-6 bg-orange-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-sm">O</span>
        </div>
        <h1 className="text-xl font-semibold text-gray-1000">Employee Details</h1>
      </div>
      <div className="flex items-center gap-4 text-gray-600">
      </div>
    </header>
  );
};

export default Header;