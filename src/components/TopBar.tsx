import { Bell, Search, Menu, LogOut, GraduationCap } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import logoImage from 'figma:asset/a0fae53220a0559f5a6b46d7beefdf1fb301528a.png';

interface TopBarProps {
  onLogout: () => void;
  userName?: string;
  onMenuClick?: () => void;
  onLogoClick?: () => void;
}

export function TopBar({ onLogout, userName = 'Reza', onMenuClick, onLogoClick }: TopBarProps) {
  const handleLogoClick = () => {
    if (onLogoClick) {
      onLogoClick();
    }
  };

  return (
    <div className="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-gray-200">
      <div className="flex items-center justify-between px-4 lg:px-6 py-3">
        {/* Left Side */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          
          <button 
            onClick={handleLogoClick}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <img 
              src={logoImage} 
              alt="Campus-Link Logo" 
              className="w-8 h-8 rounded-lg"
            />
            <span className="hidden sm:block text-gray-900">Campus-Link</span>
          </button>
        </div>

        {/* Center - Search (hidden on mobile) */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search students, recruiters, skills..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2 lg:gap-4">
          {/* Search icon for mobile */}
          <button className="md:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <Search className="w-5 h-5 text-gray-600" />
          </button>

          {/* Notifications */}
          <button className="relative p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs rounded-full">
              3
            </Badge>
          </button>

          {/* Profile */}
          <div className="hidden lg:flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Reza" />
              <AvatarFallback>RZ</AvatarFallback>
            </Avatar>
            <span className="text-sm text-gray-700">{userName}</span>
          </div>

          {/* Logout */}
          <Button
            onClick={onLogout}
            variant="ghost"
            size="sm"
            className="hidden lg:flex items-center gap-2 text-gray-600 hover:text-red-600"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm"
          />
        </div>
      </div>
    </div>
  );
}