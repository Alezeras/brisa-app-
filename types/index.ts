export interface User {
  id: string;
  name: string;
  email: string;
  role?: 'admin' | 'user';
  photo?: string;
}

export interface Client {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  projects: number;
  hours: number;
  favorite: boolean;
}

export interface Activity {
  id: number;
  title: string;
  date: string; 
  startTime?: string;
  endTime?: string;
  duration: number; 
  type: 'Timer' | 'Manual';
  color?: string;
}

export type FontSize = 12 | 14 | 16;