import React, { useState } from 'react';
import { Search, RotateCcw, Download, Upload, Plus, ChevronDown, X, Trash2 } from 'lucide-react';
import { FilterOptions, ExcelSheet } from '../types/Employee';

interface FilterPanelProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  filterOptions: FilterOptions;
  onFilterChange: (options: FilterOptions) => void;
  onReset: () => void;
  onImport: (sheetName: string) => void;
  onExport: () => void;
  onAddEmployee: () => void;
  onAddMultiple: () => void;
  onDeleteSelected: () => void;
  isAdmin: boolean;
  selectedCount: number;
  availableSheets: ExcelSheet[];
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  searchTerm,
  onSearchChange,
  filterOptions,
  onFilterChange,
  onReset,
  onImport,
  onExport,
  onAddEmployee,
  onAddMultiple,
  onDeleteSelected,
  isAdmin,
  selectedCount,
  availableSheets
}) => {
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showAdminDropdown, setShowAdminDropdown] = useState(false);
  const [showImportDropdown, setShowImportDropdown] = useState(false);
  const [filterInputValue, setFilterInputValue] = useState('');

  const handleFilterSelect = (type: 'team' | 'manager') => {
    onFilterChange({ filterType: type, filterValue: '' });
    setShowFilterDropdown(false);
    setFilterInputValue('');
  };

  const handleFilterInputChange = (value: string) => {
    setFilterInputValue(value);
    onFilterChange({ ...filterOptions, filterValue: value });
  };

  const clearFilter = () => {
    onFilterChange({ filterType: '', filterValue: '' });
    setFilterInputValue('');
  };

  const handleSheetSelect = (sheetName: string) => {
    onImport(sheetName);
    setShowImportDropdown(false);
  };

  return (
    <div className="bg-white p-6 border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        {/* Search and Filter Controls */}
        <div className="flex flex-wrap items-center gap-4 mb-4">
          {/* Search */}
          <div className="relative flex-1 min-w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Filter By
              <ChevronDown className="w-4 h-4" />
            </button>
            {showFilterDropdown && (
              <div className="absolute top-full mt-1 left-0 bg-white border border-gray-300 rounded-lg shadow-lg z-10 min-w-40">
                <button
                  onClick={() => handleFilterSelect('team')}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors first:rounded-t-lg"
                >
                  By Team
                </button>
                <button
                  onClick={() => handleFilterSelect('manager')}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors last:rounded-b-lg"
                >
                  By Manager
                </button>
              </div>
            )}
          </div>

          {/* Reset Button */}
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>

          {/* Action Buttons */}
          <div className="flex gap-2">
            {/* Import Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowImportDropdown(!showImportDropdown)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Upload className="w-4 h-4" />
                Import
                <ChevronDown className="w-4 h-4" />
              </button>
              {showImportDropdown && (
                <div className="absolute top-full mt-1 left-0 bg-white border border-gray-300 rounded-lg shadow-lg z-10 min-w-48">
                  {availableSheets.length > 0 ? (
                    availableSheets.map((sheet, index) => (
                      <button
                        key={index}
                        onClick={() => handleSheetSelect(sheet.name)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                      >
                        {sheet.name}
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-gray-500 text-sm">
                      No Excel sheets available
                    </div>
                  )}
                </div>
              )}
            </div>

            <button
              onClick={onExport}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>

          {/* Admin Controls */}
          {isAdmin && (
            <div className="flex gap-2">
              {/* Delete Selected Button */}
              {selectedCount > 0 && (
                <button
                  onClick={onDeleteSelected}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete ({selectedCount})
                </button>
              )}

              {/* Add Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowAdminDropdown(!showAdminDropdown)}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add
                  <ChevronDown className="w-4 h-4" />
                </button>
                {showAdminDropdown && (
                  <div className="absolute top-full mt-1 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-10 min-w-48">
                    <button
                      onClick={() => {
                        onAddEmployee();
                        setShowAdminDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors first:rounded-t-lg"
                    >
                      Add Single Employee
                    </button>
                    <button
                      onClick={() => {
                        onAddMultiple();
                        setShowAdminDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors last:rounded-b-lg"
                    >
                      Add Multiple Employees
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Active Filters */}
        {filterOptions.filterType && filterOptions.filterValue && (
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm text-gray-600">Active filters:</span>
            <div className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              <span className="capitalize">{filterOptions.filterType}:</span>
              <span className="font-medium">{filterOptions.filterValue}</span>
              <button onClick={clearFilter} className="ml-1 hover:bg-blue-200 rounded-full p-0.5">
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}

        {/* Filter Value Input */}
        {filterOptions.filterType && (
          <div className="mb-4">
            <input
              type="text"
              placeholder={`Enter ${filterOptions.filterType} name...`}
              value={filterInputValue}
              onChange={(e) => handleFilterInputChange(e.target.value)}
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterPanel