import { useState } from 'react';
import { TopBar } from './TopBar';
import { MobileNav } from './MobileNav';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { 
  Trophy, 
  Medal, 
  Award,
  Search,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';

type Page = 'dashboard' | 'profile' | 'leaderboard' | 'recruiters' | 'analytics';

interface LeaderboardPageProps {
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

const globalLeaderboard = [
  { 
    rank: 1, 
    name: 'Sarah Chen', 
    university: 'Stanford', 
    uss: 98, 
    change: 2,
    avatar: 'Sarah',
    badge: 'gold'
  },
  { 
    rank: 2, 
    name: 'Michael Kumar', 
    university: 'MIT', 
    uss: 96, 
    change: 0,
    avatar: 'Michael',
    badge: 'silver'
  },
  { 
    rank: 3, 
    name: 'Emily Rodriguez', 
    university: 'Harvard', 
    uss: 94, 
    change: -1,
    avatar: 'Emily',
    badge: 'bronze'
  },
  { 
    rank: 4, 
    name: 'David Park', 
    university: 'Berkeley', 
    uss: 93, 
    change: 3,
    avatar: 'David',
    badge: null
  },
  { 
    rank: 5, 
    name: 'Jessica Thompson', 
    university: 'CMU', 
    uss: 92, 
    change: 1,
    avatar: 'Jessica',
    badge: null
  },
  { 
    rank: 42, 
    name: 'Reza Mohammad', 
    university: 'MIT', 
    uss: 88, 
    change: 8,
    avatar: 'Reza',
    badge: null,
    isCurrentUser: true
  },
  { 
    rank: 43, 
    name: 'Alex Johnson', 
    university: 'Stanford', 
    uss: 87, 
    change: -2,
    avatar: 'Alex',
    badge: null
  },
  { 
    rank: 44, 
    name: 'Priya Patel', 
    university: 'MIT', 
    uss: 87, 
    change: 0,
    avatar: 'Priya',
    badge: null
  },
  { 
    rank: 45, 
    name: 'James Wilson', 
    university: 'Caltech', 
    uss: 86, 
    change: 1,
    avatar: 'James',
    badge: null
  },
];

const mitLeaderboard = [
  { 
    rank: 1, 
    name: 'Michael Kumar', 
    university: 'MIT', 
    uss: 96, 
    change: 0,
    avatar: 'Michael',
    badge: 'gold'
  },
  { 
    rank: 2, 
    name: 'Reza Mohammad', 
    university: 'MIT', 
    uss: 88, 
    change: 2,
    avatar: 'Reza',
    badge: 'silver',
    isCurrentUser: true
  },
  { 
    rank: 3, 
    name: 'Priya Patel', 
    university: 'MIT', 
    uss: 87, 
    change: -1,
    avatar: 'Priya',
    badge: 'bronze'
  },
  { 
    rank: 4, 
    name: 'Kevin Zhang', 
    university: 'MIT', 
    uss: 85, 
    change: 1,
    avatar: 'Kevin',
    badge: null
  },
  { 
    rank: 5, 
    name: 'Rachel Green', 
    university: 'MIT', 
    uss: 84, 
    change: 0,
    avatar: 'Rachel',
    badge: null
  },
];

export function LeaderboardPage({ onNavigate, onLogout }: LeaderboardPageProps) {
  const [activeTab, setActiveTab] = useState('global');
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogoClick = () => {
    onNavigate('dashboard');
  };

  const getBadgeIcon = (badge: string | null) => {
    if (badge === 'gold') return <Trophy className="w-5 h-5 text-amber-400" />;
    if (badge === 'silver') return <Medal className="w-5 h-5 text-gray-400" />;
    if (badge === 'bronze') return <Award className="w-5 h-5 text-orange-400" />;
    return null;
  };

  const getChangeIndicator = (change: number) => {
    if (change > 0) {
      return (
        <div className="flex items-center gap-1 text-green-600">
          <TrendingUp className="w-4 h-4" />
          <span className="text-xs">+{change}</span>
        </div>
      );
    }
    if (change < 0) {
      return (
        <div className="flex items-center gap-1 text-red-600">
          <TrendingDown className="w-4 h-4" />
          <span className="text-xs">{change}</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-1 text-gray-400">
        <Minus className="w-4 h-4" />
        <span className="text-xs">0</span>
      </div>
    );
  };

  const renderLeaderboard = (data: typeof globalLeaderboard) => (
    <div className="space-y-3">
      {data.map((student) => (
        <Card 
          key={`${student.rank}-${student.name}`}
          className={`p-4 rounded-2xl border transition-all ${
            student.isCurrentUser 
              ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-300 shadow-lg' 
              : 'bg-white/70 backdrop-blur-sm border-gray-200 hover:shadow-md'
          }`}
        >
          <div className="flex items-center gap-4">
            {/* Rank */}
            <div className="flex items-center justify-center w-10 h-10 flex-shrink-0">
              {student.badge ? (
                getBadgeIcon(student.badge)
              ) : (
                <span className={`text-lg ${student.isCurrentUser ? 'text-blue-700' : 'text-gray-600'}`}>
                  #{student.rank}
                </span>
              )}
            </div>

            {/* Avatar */}
            <Avatar className={`w-12 h-12 ${student.isCurrentUser ? 'ring-2 ring-blue-600' : ''}`}>
              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${student.avatar}`} />
              <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className={`truncate ${student.isCurrentUser ? 'text-blue-900' : 'text-gray-900'}`}>
                {student.name}
                {student.isCurrentUser && (
                  <Badge className="ml-2 bg-blue-600 text-white text-xs">You</Badge>
                )}
              </p>
              <p className="text-sm text-gray-600 truncate">{student.university}</p>
            </div>

            {/* USS Score */}
            <div className="text-right flex-shrink-0">
              <div className={`text-xl mb-1 ${student.isCurrentUser ? 'text-blue-700' : 'text-gray-900'}`}>
                {student.uss}
              </div>
              {getChangeIndicator(student.change)}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen pb-20 lg:pb-6">
      <TopBar onLogout={onLogout} userName="Reza" onLogoClick={handleLogoClick} />
      
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 space-y-6">
        {/* Header */}
        <Card className="bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 text-white p-6 lg:p-8 rounded-2xl border-0 shadow-xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl lg:text-3xl mb-2 flex items-center justify-center sm:justify-start gap-2">
                <Trophy className="w-8 h-8" />
                Leaderboard
              </h1>
              <p className="text-orange-100">
                See how you rank against peers worldwide
              </p>
            </div>
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-4 lg:p-6 text-center min-w-[140px]">
              <div className="text-sm text-orange-100 mb-1">Your Rank</div>
              <div className="text-4xl lg:text-5xl">#42</div>
              <div className="text-sm text-green-300 mt-1">↑ 8 positions</div>
            </div>
          </div>
        </Card>

        {/* Search */}
        <Card className="p-4 rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by name or university..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-gray-300 rounded-xl"
            />
          </div>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full bg-white/70 backdrop-blur-sm p-1 rounded-2xl border border-gray-200">
            <TabsTrigger value="global" className="flex-1 rounded-xl data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              🌍 Global
            </TabsTrigger>
            <TabsTrigger value="college" className="flex-1 rounded-xl data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              🎓 MIT
            </TabsTrigger>
          </TabsList>

          {/* Global Leaderboard */}
          <TabsContent value="global" className="mt-6">
            {renderLeaderboard(globalLeaderboard)}
          </TabsContent>

          {/* College Leaderboard */}
          <TabsContent value="college" className="mt-6">
            {renderLeaderboard(mitLeaderboard)}
          </TabsContent>
        </Tabs>

        {/* Info Card */}
        <Card className="p-6 rounded-2xl bg-blue-50 border border-blue-200">
          <h3 className="text-gray-900 mb-2 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            How to Improve Your Rank
          </h3>
          <ul className="text-sm text-gray-700 space-y-1 ml-7 list-disc">
            <li>Add and validate new skills</li>
            <li>Complete certifications and projects</li>
            <li>Maintain high academic performance</li>
            <li>Engage with recruiters and get endorsements</li>
          </ul>
        </Card>
      </div>

      <MobileNav currentPage="leaderboard" onNavigate={onNavigate} userRole="student" />
    </div>
  );
}
