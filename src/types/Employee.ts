export interface Employee {
  emp_id: string;
  resource_name: string;
  core_alignment: string;
  core_team: string;
  email_id: string;
  contact_number: string;
  hire_date: string;
  term_date?: string;
  status: 'Active' | 'Inactive' | 'Open';
  job_title: string;
  role_type: 'Engineering' | 'Non-Engineering';
  base_location: string;
  created_at: string;
  created_by: string;
  modified_by: string;
  modified_at: string;
}

export interface FilterOptions {
  filterType: 'team' | 'manager' | '';
  filterValue: string;
}

export interface ExcelSheet {
  name: string;
  data: any[];
}