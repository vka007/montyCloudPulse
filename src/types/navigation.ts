// Navigation types for the dashboard

export type TabValue = 'dashboard' | 'inventory';

export interface NavigationTab {
  value: TabValue;
  label: string;
  icon?: string;
  disabled?: boolean;
}

export interface FilterOptions {
  search: string;
  status: string[];
  type: string[];
  region: string[];
  account: string[];
}

export interface SortOptions {
  field: string;
  direction: 'asc' | 'desc';
}
