import React, { useState, useEffect } from 'react';
import { X, Save, User } from 'lucide-react';
import { Employee } from '../types/Employee';

interface EditEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (employee: Employee) => void;
  employee: Employee | null;
}

const EditEmployeeModal: React.FC<EditEmployeeModalProps> = ({
  isOpen,
  onClose,
  onSave,
  employee
}) => {
  const [formData, setFormData] = useState<Employee>({
    emp_id: 0,
    resource_name: '',
    prj_align: '',
    core_alignment: '',
    core_team: '',
    job_title: '',
    role_type: '',
    status: '',
    base_location: '',
    email_id: '',
    hire_date: '',
    term_date: '',
    modified_by: '',
    modified_at: '',
    vendor: '',
    contact_number: '',
    team_name: '',
    manager_name: '',
    secondary_team: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const projectOptions = ['PRJ7782', 'PRJ8722', 'PRJ9901', 'PRJ5543', 'PRJ3321'];
  const coreAlignmentOptions = [
    'Frontend Development',
    'Backend Development',
    'Full Stack Development',
    'Product Management',
    'UI/UX Design',
    'Quality Assurance',
    'DevOps',
    'Data Science',
    'Marketing',
    'Sales'
  ];
  const coreTeamOptions = [
    'Engineering Team A',
    'Engineering Team B',
    'Product Team',
    'Design Team',
    'QA Team',
    'Infrastructure Team',
    'Data Team',
    'Marketing Team',
    'Sales Team'
  ];
  const roleTypeOptions = ['Engineering', 'Non Engineering', 'Both'];
  const statusOptions = ['Active', 'Inactive', 'Open'];
  const vendorOptions = [
    'TechCorp Solutions',
    'DevSolutions Inc',
    'ProductWorks LLC',
    'DesignHub Studios',
    'QualityFirst Partners',
    'CloudOps Solutions',
    'DataTech Analytics'
  ];
  const teamNameOptions = [
    'Frontend Development Team',
    'Backend Development Team',
    'Product Strategy Team',
    'UX Design Team',
    'Quality Assurance Team',
    'Infrastructure Team',
    'Data Science Team'
  ];
  const managerOptions = [
    'Sarah Mitchell',
    'David Thompson',
    'Emily Rodriguez',
    'Michael Chen',
    'Jessica Williams',
    'Robert Johnson',
    'Amanda Davis',
    'Christopher Lee'
  ];
  const secondaryTeamOptions = [
    'UI/UX Team',
    'DevOps Team',
    'Marketing Team',
    'Product Team',
    'Engineering Team A',
    'Backend Development Team'
  ];

  useEffect(() => {
    if (employee) {
      setFormData(employee);
    }
  }, [employee]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.resource_name.trim()) {
      newErrors.resource_name = 'Name is required';
    }
    if (!formData.email_id.trim()) {
      newErrors.email_id = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email_id)) {
      newErrors.email_id = 'Email is invalid';
    }
    if (!formData.job_title.trim()) {
      newErrors.job_title = 'Job title is required';
    }
    if (!formData.hire_date) {
      newErrors.hire_date = 'Hire date is required';
    }
    if (!formData.contact_number.trim()) {
      newErrors.contact_number = 'Contact number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const updatedEmployee = {
        ...formData,
        modified_at: new Date().toISOString().split('T')[0]
      };
      onSave(updatedEmployee);
      onClose();
    }
  };

  const handleInputChange = (field: keyof Employee, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen || !employee) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onClose}
        />

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-blue-100">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="ml-4 text-lg leading-6 font-medium text-gray-900">
                Edit Employee - {employee.resource_name}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Employee ID - Read only */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employee ID
                </label>
                <input
                  type="number"
                  value={formData.emp_id}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500 cursor-not-allowed"
                />
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.resource_name}
                  onChange={(e) => handleInputChange('resource_name', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.resource_name ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.resource_name && (
                  <p className="mt-1 text-sm text-red-600">{errors.resource_name}</p>
                )}
              </div>

              {/* Project Alignment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Alignment
                </label>
                <select
                  value={formData.prj_align}
                  onChange={(e) => handleInputChange('prj_align', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Project</option>
                  {projectOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              {/* Core Alignment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Core Alignment
                </label>
                <select
                  value={formData.core_alignment}
                  onChange={(e) => handleInputChange('core_alignment', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Core Alignment</option>
                  {coreAlignmentOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              {/* Core Team */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Core Team
                </label>
                <select
                  value={formData.core_team}
                  onChange={(e) => handleInputChange('core_team', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Core Team</option>
                  {coreTeamOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              {/* Job Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.job_title}
                  onChange={(e) => handleInputChange('job_title', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.job_title ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.job_title && (
                  <p className="mt-1 text-sm text-red-600">{errors.job_title}</p>
                )}
              </div>

              {/* Role Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role Type
                </label>
                <select
                  value={formData.role_type}
                  onChange={(e) => handleInputChange('role_type', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Role Type</option>
                  {roleTypeOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Status</option>
                  {statusOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Base Location
                </label>
                <input
                  type="text"
                  value={formData.base_location}
                  onChange={(e) => handleInputChange('base_location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email_id}
                  onChange={(e) => handleInputChange('email_id', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.email_id ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.email_id && (
                  <p className="mt-1 text-sm text-red-600">{errors.email_id}</p>
                )}
              </div>

              {/* Hire Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hire Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.hire_date}
                  onChange={(e) => handleInputChange('hire_date', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.hire_date ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.hire_date && (
                  <p className="mt-1 text-sm text-red-600">{errors.hire_date}</p>
                )}
              </div>

              {/* Termination Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Termination Date
                </label>
                <input
                  type="date"
                  value={formData.term_date || ''}
                  onChange={(e) => handleInputChange('term_date', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Vendor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vendor
                </label>
                <select
                  value={formData.vendor}
                  onChange={(e) => handleInputChange('vendor', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Vendor</option>
                  {vendorOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              {/* Contact Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.contact_number}
                  onChange={(e) => handleInputChange('contact_number', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.contact_number ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.contact_number && (
                  <p className="mt-1 text-sm text-red-600">{errors.contact_number}</p>
                )}
              </div>

              {/* Team Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Team Name
                </label>
                <select
                  value={formData.team_name}
                  onChange={(e) => handleInputChange('team_name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Team Name</option>
                  {teamNameOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              {/* Manager Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Manager Name
                </label>
                <select
                  value={formData.manager_name}
                  onChange={(e) => handleInputChange('manager_name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Manager</option>
                  {managerOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              {/* Secondary Team */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Secondary Team
                </label>
                <select
                  value={formData.secondary_team}
                  onChange={(e) => handleInputChange('secondary_team', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Secondary Team</option>
                  {secondaryTeamOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              {/* Modified By - Text Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Modified By
                </label>
                <input
                  type="text"
                  value={formData.modified_by}
                  onChange={(e) => handleInputChange('modified_by', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditEmployeeModal;