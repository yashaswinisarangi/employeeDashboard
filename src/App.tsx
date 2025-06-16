import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import FilterPanel from './components/FilterPanel';
import EmployeeTable from './components/EmployeeTable';
import AddEmployeeModal from './components/AddEmployeeModal';
import ConfirmationModal from './components/ConfirmationModal';
import { Employee, FilterOptions, ExcelSheet } from './types/Employee';
import { mockEmployees } from './data/mockData';

function App() {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    filterType: '',
    filterValue: ''
  });
  const [loading, setLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddMultipleModalOpen, setIsAddMultipleModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [confirmationModal, setConfirmationModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {}
  });

  // Mock Excel sheets data
  const [availableSheets] = useState<ExcelSheet[]>([
    { name: 'employees_data', data: [] },
    { name: 'contractors', data: [] },
    { name: 'archived_employees', data: [] }
  ]);

  // Filter and search employees
  const filteredEmployees = useMemo(() => {
    return employees.filter(employee => {
      // Search filter
      const matchesSearch = searchTerm === '' || 
        Object.values(employee).some(value => 
          value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );

      // Type filter
      let matchesFilter = true;
      if (filterOptions.filterType && filterOptions.filterValue) {
        if (filterOptions.filterType === 'team') {
          matchesFilter = employee.core_team.toLowerCase().includes(filterOptions.filterValue.toLowerCase());
        } else if (filterOptions.filterType === 'manager') {
          matchesFilter = employee.modified_by.toLowerCase().includes(filterOptions.filterValue.toLowerCase());
        }
      }

      return matchesSearch && matchesFilter;
    });
  }, [employees, searchTerm, filterOptions]);

  const handleReset = () => {
    setSearchTerm('');
    setFilterOptions({ filterType: '', filterValue: '' });
    setSelectedEmployees([]);
  };

  const handleImport = (sheetName: string) => {
    // In real app, this would handle Excel file import from specific sheet
    setConfirmationModal({
      isOpen: true,
      title: 'Import Data',
      message: `Import data from sheet "${sheetName}"? This will add new employees to the database.`,
      onConfirm: () => {
        alert(`Importing data from sheet: ${sheetName}`);
        // Implementation would parse Excel data and add to employees
      }
    });
  };

  const handleExport = () => {
    // Export filtered data to Excel
    const dataStr = JSON.stringify(filteredEmployees, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `employees_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleAddEmployee = () => {
    setIsAddModalOpen(true);
  };

  const handleAddMultiple = () => {
    setIsAddMultipleModalOpen(true);
  };

  const handleSaveEmployee = (employeeData: Omit<Employee, 'emp_id' | 'created_at' | 'modified_at'>) => {
    const newEmployee: Employee = {
      ...employeeData,
      emp_id: `EMP${String(employees.length + 1).padStart(3, '0')}`,
      created_at: new Date().toISOString().split('T')[0],
      modified_at: new Date().toISOString().split('T')[0]
    };
    
    setEmployees(prev => [...prev, newEmployee]);
    setIsAddModalOpen(false);
    setIsAddMultipleModalOpen(false);
  };

  const handleSelectEmployee = (empId: string) => {
    setSelectedEmployees(prev => 
      prev.includes(empId) 
        ? prev.filter(id => id !== empId)
        : [...prev, empId]
    );
  };

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      setSelectedEmployees(filteredEmployees.map(emp => emp.emp_id));
    } else {
      setSelectedEmployees([]);
    }
  };

  const handleDeleteEmployee = (empId: string) => {
    const employee = employees.find(emp => emp.emp_id === empId);
    setConfirmationModal({
      isOpen: true,
      title: 'Delete Employee',
      message: `Are you sure you want to delete ${employee?.resource_name}? This action cannot be undone.`,
      onConfirm: () => {
        setEmployees(prev => prev.filter(emp => emp.emp_id !== empId));
        setSelectedEmployees(prev => prev.filter(id => id !== empId));
      }
    });
  };

  const handleDeleteSelected = () => {
    setConfirmationModal({
      isOpen: true,
      title: 'Delete Multiple Employees',
      message: `Are you sure you want to delete ${selectedEmployees.length} selected employees? This action cannot be undone.`,
      onConfirm: () => {
        setEmployees(prev => prev.filter(emp => !selectedEmployees.includes(emp.emp_id)));
        setSelectedEmployees([]);
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <FilterPanel
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterOptions={filterOptions}
        onFilterChange={setFilterOptions}
        onReset={handleReset}
        onImport={handleImport}
        onExport={handleExport}
        onAddEmployee={handleAddEmployee}
        onAddMultiple={handleAddMultiple}
        onDeleteSelected={handleDeleteSelected}
        isAdmin={isAdmin}
        selectedCount={selectedEmployees.length}
        availableSheets={availableSheets}
      />
      
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Employee Directory</h2>
          <p className="text-gray-600">
            Manage and view employee information with advanced filtering and search capabilities
          </p>
        </div>
        
        <EmployeeTable 
          employees={filteredEmployees} 
          loading={loading}
          isAdmin={isAdmin}
          selectedEmployees={selectedEmployees}
          onSelectEmployee={handleSelectEmployee}
          onSelectAll={handleSelectAll}
          onDeleteEmployee={handleDeleteEmployee}
        />
      </main>

      <AddEmployeeModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveEmployee}
      />

      <AddEmployeeModal
        isOpen={isAddMultipleModalOpen}
        onClose={() => setIsAddMultipleModalOpen(false)}
        onSave={handleSaveEmployee}
        isMultiple={true}
      />

      <ConfirmationModal
        isOpen={confirmationModal.isOpen}
        onClose={() => setConfirmationModal(prev => ({ ...prev, isOpen: false }))}
        onConfirm={confirmationModal.onConfirm}
        title={confirmationModal.title}
        message={confirmationModal.message}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
}

export default App;