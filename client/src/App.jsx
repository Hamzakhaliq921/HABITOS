import { useRef, useState } from 'react';
import { DashboardShell } from './components/DashboardShell';
import { ReportExportDocument } from './components/ReportExportDocument';
import { ToastViewport } from './components/ToastViewport';
import { useHabitsDashboard } from './hooks/useHabitsDashboard';
import { usePrayerTracker } from './hooks/usePrayerTracker';
import { useTheme } from './hooks/useTheme';

const navItems = [
  { key: 'overview', label: 'Overview', icon: 'OV' },
  { key: 'prayers', label: 'Prayers', icon: 'PR' },
  { key: 'habits', label: 'Habits', icon: 'HB' },
  { key: 'analytics', label: 'Analytics', icon: 'AN' },
  { key: 'goals', label: 'Goals', icon: 'GL' },
  { key: 'settings', label: 'Settings', icon: 'ST' },
];

export default function App() {
  const reportExportRef = useRef(null);
  const { theme, toggleTheme } = useTheme();
  const [currentPage, setCurrentPage] = useState('overview');
  const handleNavigation = (page) => {
    setCurrentPage(page === 'prayers' ? 'prayers' : 'overview');
  };