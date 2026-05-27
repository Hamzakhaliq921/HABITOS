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

  const {
    draft,
    editingHabitId,
    isBootstrapping,
    isRefreshing,
    isSubmitting,
    pendingHabitIds,
    error,
    toasts,
    setDraft,
    resetDraft,
    beginEditHabit,
    submitHabit,
    removeHabit,
    markHabitComplete,
    refreshHabits,
    exportReport,
    dashboard,
  } = useHabitsDashboard();
  const {
    dailyPrayers,
    extraPrayers,
    extraPrayerDraft,
    setExtraPrayerDraft,
    togglePrayerCompletion,
    updatePrayerNotes,
    addExtraPrayer,
    removeExtraPrayer,
    summary: prayerSummary,
  } = usePrayerTracker();

  
  return (
    <>
      <DashboardShell
        navItems={navItems.map((item) => ({ ...item, active: item.key === currentPage }))}
        currentPage={currentPage}
        onNavigate={handleNavigation}
        draft={draft}
        editingHabitId={editingHabitId}
        isBootstrapping={isBootstrapping}
        isRefreshing={isRefreshing}
        isSubmitting={isSubmitting}
        pendingHabitIds={pendingHabitIds}
        error={error}
        setDraft={setDraft}
        resetDraft={resetDraft}
        beginEditHabit={beginEditHabit}
        submitHabit={submitHabit}
        removeHabit={removeHabit}
        markHabitComplete={markHabitComplete}
        refreshHabits={refreshHabits}
        exportReport={() => exportReport(reportExportRef.current)}
        theme={theme}
        toggleTheme={toggleTheme}
        stats={dashboard.stats}
        habits={dashboard.habits}
        analyticsDatasets={dashboard.analyticsDatasets}
        streakSummary={dashboard.streakSummary}
        insights={dashboard.insights}
        achievements={dashboard.achievements}
        activityFeed={dashboard.activityFeed}
        dailyPrayers={dailyPrayers}
        extraPrayers={extraPrayers}
        extraPrayerDraft={extraPrayerDraft}
        setExtraPrayerDraft={setExtraPrayerDraft}
        togglePrayerCompletion={togglePrayerCompletion}
        updatePrayerNotes={updatePrayerNotes}
        addExtraPrayer={addExtraPrayer}
        removeExtraPrayer={removeExtraPrayer}
        prayerSummary={prayerSummary}
      />
      <div className="report-export-shell" aria-hidden="true">
        <div ref={reportExportRef}>
          <ReportExportDocument
            dashboard={dashboard}
            habits={dashboard.habits}
            prayers={[...dailyPrayers, ...extraPrayers]}
            prayerSummary={prayerSummary}
          />
        </div>
      </div>
      <ToastViewport toasts={toasts} />
    </>
  );
}
