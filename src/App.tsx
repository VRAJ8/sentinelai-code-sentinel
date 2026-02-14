import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';

function App() {
  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <ThemeProvider>
      {showDashboard ? (
        <Dashboard />
      ) : (
        <LandingPage onGetStarted={() => setShowDashboard(true)} />
      )}
    </ThemeProvider>
  );
}

export default App; 