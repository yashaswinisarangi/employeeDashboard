import React, { useState } from 'react';
import ConfirmationModal from './components/ConfirmationModal';
import EditEmployeeModal from './components/EditEmployeeModal';
import { Employee } from './types/Employee';
import { mockEmployees } from './data/mockData';
import EmployeeTable from './components/EmployeeTable';

function App() {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
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
  const [editModal, setEditModal] = useState<{
    isOpen: boolean;
    employee: Employee | null;
  }>({
    isOpen: false,
    employee: null
  });

  const handleSelectEmployee = (empId: string) => {
    setSelectedEmployees(prev =>
      prev.includes(empId)
        ? prev.filter(id => id !== empId)
        : [...prev, empId]
    );
  };

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      setSelectedEmployees(employees.map(emp => emp.emp_id));
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

  const handleEditEmployee = (employee: Employee) => {
    setEditModal({
      isOpen: true,
      employee
    });
  };

  const handleSaveEmployee = (updatedEmployee: Employee) => {
    setEmployees(prev => 
      prev.map(emp => 
        emp.emp_id === updatedEmployee.emp_id ? updatedEmployee : emp
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Employee View</h2>
        </div>

        <EmployeeTable 
          employees={employees}
          loading={false}
          isAdmin={isAdmin}
          selectedEmployees={selectedEmployees}
          onSelectEmployee={handleSelectEmployee}
          onSelectAll={handleSelectAll}
          onDeleteEmployee={handleDeleteEmployee}
          onEditEmployee={handleEditEmployee}
        />
      </main>

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

      <EditEmployeeModal
        isOpen={editModal.isOpen}
        onClose={() => setEditModal({ isOpen: false, employee: null })}
        onSave={handleSaveEmployee}
        employee={editModal.employee}
      />
    </div>
  );
}

export default App;