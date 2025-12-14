import { Home, Trophy, Users, BarChart3, User, MessageSquare } from 'lucide-react';

type Page = 'dashboard' | 'profile' | 'leaderboard' | 'recruiters' | 'analytics';

interface MobileNavProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  userRole: 'student' | 'recruiter' | 'faculty';
}

export function MobileNav({ currentPage, onNavigate, userRole }: MobileNavProps) {
  const navItems = [
    { id: 'dashboard' as Page, icon: Home, label: 'Home' },
    { id: 'leaderboard' as Page, icon: Trophy, label: 'Ranks' },
    { id: 'recruiters' as Page, icon: Users, label: 'Jobs' },
    userRole === 'faculty' && { id: 'analytics' as Page, icon: BarChart3, label: 'Analytics' },
    { id: 'profile' as Page, icon: User, label: 'Profile' },
  ].filter(Boolean);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-200 z-50 lg:hidden">
      <div className="flex justify-around items-center px-2 py-2 safe-area-bottom">
        {navItems.map((item) => {
          if (!item) return null;
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center px-3 py-2 rounded-xl transition-all ${
                isActive
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className={`w-5 h-5 mb-1 ${isActive ? 'text-blue-600' : ''}`} />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
