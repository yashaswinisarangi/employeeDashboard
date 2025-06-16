import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Employee } from '../types/Employee';

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (employee: Omit<Employee, 'emp_id' | 'created_at' | 'modified_at'>) => void;
  isMultiple?: boolean;
}

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({
  isOpen,
  onClose,
  onSave,
  isMultiple = false
}) => {
  const [formData, setFormData] = useState({
    resource_name: '',
    core_alignment: '',
    core_team: '',
    email_id: '',
    contact_number: '',
    hire_date: '',
    term_date: '',
    status: 'Active' as 'Active' | 'Inactive' | 'Open',
    job_title: '',
    role_type: 'Engineering' as 'Engineering' | 'Non-Engineering',
    base_location: '',
    created_by: 'Admin',
    modified_by: 'Admin'
  });

  const [employees, setEmployees] = useState([formData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isMultiple) {
      employees.forEach(emp => onSave(emp));
    } else {
      onSave(formData);
    }
    onClose();
    resetForm();
  };

  const resetForm = () => {
    const initialData = {
      resource_name: '',
      core_alignment: '',
      core_team: '',
      email_id: '',
      contact_number: '',
      hire_date: '',
      term_date: '',
      status: 'Active' as 'Active' | 'Inactive' | 'Open',
      job_title: '',
      role_type: 'Engineering' as 'Engineering' | 'Non-Engineering',
      base_location: '',
      created_by: 'Admin',
      modified_by: 'Admin'
    };
    setFormData(initialData);
    setEmployees([initialData]);
  };

  const addEmployee = () => {
    setEmployees([...employees, { ...formData }]);
  };

  const removeEmployee = (index: number) => {
    setEmployees(employees.filter((_, i) => i !== index));
  };

  const updateEmployee = (index: number, field: string, value: string) => {
    const updated = employees.map((emp, i) => 
      i === index ? { ...emp, [field]: value } : emp
    );
    setEmployees(updated);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {isMultiple ? 'Add Multiple Employees' : 'Add New Employee'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {isMultiple ? (
            <div className="space-y-6">
              {employees.map((employee, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 relative">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Employee {index + 1}</h3>
                    {employees.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeEmployee(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                  <EmployeeForm
                    data={employee}
                    onChange={(field, value) => updateEmployee(index, field, value)}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={addEmployee}
                className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-800 transition-colors"
              >
                + Add Another Employee
              </button>
            </div>
          ) : (
            <EmployeeForm
              data={formData}
              onChange={(field, value) => setFormData(prev => ({ ...prev, [field]: value }))}
            />
          )}

          <div className="flex items-center justify-end gap-4 mt-6 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {isMultiple ? `Save ${employees.length} Employees` : 'Save Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface EmployeeFormProps {
  data: any;
  onChange: (field: string, value: string) => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ data, onChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Resource Name *
        </label>
        <input
          type="text"
          required
          value={data.resource_name}
          onChange={(e) => onChange('resource_name', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Core Alignment *
        </label>
        <input
          type="text"
          required
          value={data.core_alignment}
          onChange={(e) => onChange('core_alignment', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Core Team *
        </label>
        <input
          type="text"
          required
          value={data.core_team}
          onChange={(e) => onChange('core_team', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email ID *
        </label>
        <input
          type="email"
          required
          value={data.email_id}
          onChange={(e) => onChange('email_id', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Contact Number
        </label>
        <input
          type="tel"
          value={data.contact_number}
          onChange={(e) => onChange('contact_number', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Job Title *
        </label>
        <input
          type="text"
          required
          value={data.job_title}
          onChange={(e) => onChange('job_title', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Role Type *
        </label>
        <select
          required
          value={data.role_type}
          onChange={(e) => onChange('role_type', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="Engineering">Engineering</option>
          <option value="Non-Engineering">Non-Engineering</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Status *
        </label>
        <select
          required
          value={data.status}
          onChange={(e) => onChange('status', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Open">Open</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Base Location *
        </label>
        <input
          type="text"
          required
          value={data.base_location}
          onChange={(e) => onChange('base_location', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Hire Date *
        </label>
        <input
          type="date"
          required
          value={data.hire_date}
          onChange={(e) => onChange('hire_date', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Term Date
        </label>
        <input
          type="date"
          value={data.term_date}
          onChange={(e) => onChange('term_date', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );
};

export default AddEmployeeModal;