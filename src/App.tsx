import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { Dashboard } from './components/Dashboard';
import { FacultyDashboard } from './components/FacultyDashboard';
import { RecruiterDashboard } from './components/RecruiterDashboard';
import { ProfilePage } from './components/ProfilePage';
import { LeaderboardPage } from './components/LeaderboardPage';
import { RecruiterPage } from './components/RecruiterPage';
import { AnalyticsPage } from './components/AnalyticsPage';
import { ChatbotWidget } from './components/ChatbotWidget';

type Page = 'login' | 'dashboard' | 'profile' | 'leaderboard' | 'recruiters' | 'analytics';
type UserRole = 'student' | 'recruiter' | 'faculty';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [userRole, setUserRole] = useState<UserRole>('student');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('login');
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // Faculty Dashboard (separate view for faculty)
  if (userRole === 'faculty') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-violet-50">
        {currentPage === 'dashboard' && (
          <FacultyDashboard onNavigate={handleNavigate} onLogout={handleLogout} />
        )}
        {currentPage === 'analytics' && (
          <AnalyticsPage onNavigate={handleNavigate} onLogout={handleLogout} />
        )}
        <ChatbotWidget userRole={userRole} />
      </div>
    );
  }

  // Recruiter Dashboard (separate view for recruiters)
  if (userRole === 'recruiter') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
        {currentPage === 'dashboard' && (
          <RecruiterDashboard onNavigate={handleNavigate} onLogout={handleLogout} />
        )}
        {currentPage === 'recruiters' && (
          <RecruiterPage onNavigate={handleNavigate} onLogout={handleLogout} />
        )}
        {currentPage === 'analytics' && (
          <AnalyticsPage onNavigate={handleNavigate} onLogout={handleLogout} />
        )}
        <ChatbotWidget userRole={userRole} />
      </div>
    );
  }

  // Student Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {currentPage === 'dashboard' && (
        <Dashboard onNavigate={handleNavigate} onLogout={handleLogout} userRole={userRole} />
      )}
      {currentPage === 'profile' && (
        <ProfilePage onNavigate={handleNavigate} onLogout={handleLogout} />
      )}
      {currentPage === 'leaderboard' && (
        <LeaderboardPage onNavigate={handleNavigate} onLogout={handleLogout} />
      )}
      {currentPage === 'recruiters' && (
        <RecruiterPage onNavigate={handleNavigate} onLogout={handleLogout} />
      )}
      {currentPage === 'analytics' && (
        <AnalyticsPage onNavigate={handleNavigate} onLogout={handleLogout} />
      )}
      
      <ChatbotWidget userRole={userRole} />
    </div>
  );
}