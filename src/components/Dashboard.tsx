import { TopBar } from './TopBar';
import { MobileNav } from './MobileNav';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { AddSkillDialog } from './AddSkillDialog';
import { useState } from 'react';
import { 
  TrendingUp, 
  Award, 
  Users, 
  MessageSquare, 
  Plus,
  Target,
  BookOpen,
  Star,
  ChevronRight
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

type Page = 'dashboard' | 'profile' | 'leaderboard' | 'recruiters' | 'analytics';
type UserRole = 'student' | 'recruiter' | 'faculty';

interface DashboardProps {
  onNavigate: (page: Page) => void;
  onLogout: () => void;
  userRole: UserRole;
}

const ussProgressData = [
  { month: 'Jan', score: 72 },
  { month: 'Feb', score: 75 },
  { month: 'Mar', score: 78 },
  { month: 'Apr', score: 82 },
  { month: 'May', score: 85 },
  { month: 'Jun', score: 88 },
];

const skillsData = [
  { subject: 'React', value: 85 },
  { subject: 'Python', value: 75 },
  { subject: 'ML/AI', value: 70 },
  { subject: 'Design', value: 80 },
  { subject: 'Leadership', value: 78 },
];

const recentActivities = [
  { id: 1, type: 'achievement', text: 'Earned "Top Performer" badge', time: '2h ago' },
  { id: 2, type: 'match', text: 'New mutual match with TechCorp', time: '5h ago' },
  { id: 3, type: 'skill', text: 'Added skill: Machine Learning', time: '1d ago' },
  { id: 4, type: 'rank', text: 'Climbed to Rank #42 globally', time: '2d ago' },
];

export function Dashboard({ onNavigate, onLogout, userRole }: DashboardProps) {
  const [showAddSkillDialog, setShowAddSkillDialog] = useState(false);

  const handleAddSkill = (skill: { name: string; category: string; level: number }) => {
    console.log('New skill added:', skill);
    // In a real app, this would save to database
  };

  const handleLogoClick = () => {
    onNavigate('dashboard');
  };

  return (
    <div className="min-h-screen pb-20 lg:pb-6">
      <TopBar onLogout={onLogout} userName="Reza" onLogoClick={handleLogoClick} />
      
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 space-y-6">
        {/* Welcome Banner */}
        <Card className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white p-6 lg:p-8 rounded-2xl border-0 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16 lg:w-20 lg:h-20 ring-4 ring-white/30">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Reza" />
                <AvatarFallback>RZ</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl lg:text-3xl mb-1">Welcome back, Reza! 👋</h1>
                <p className="text-blue-100">MIT • Computer Science • Class of 2025</p>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-4 lg:p-6 text-center min-w-[140px]">
              <div className="text-sm text-blue-100 mb-1">USS Score</div>
              <div className="text-4xl lg:text-5xl">88</div>
              <div className="text-sm text-green-300 mt-1 flex items-center justify-center gap-1">
                <TrendingUp className="w-4 h-4" />
                +3 this week
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 lg:p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-200 hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Target className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-2xl lg:text-3xl text-gray-900">3.85</div>
            </div>
            <div className="text-sm text-gray-600">GPA</div>
            <Progress value={96} className="mt-2 h-1.5" />
          </Card>

          <Card className="p-4 lg:p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-200 hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-2xl lg:text-3xl text-gray-900">24</div>
            </div>
            <div className="text-sm text-gray-600">Skills</div>
            <Progress value={75} className="mt-2 h-1.5" />
          </Card>

          <Card className="p-4 lg:p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-200 hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                <Award className="w-5 h-5 text-amber-600" />
              </div>
              <div className="text-2xl lg:text-3xl text-gray-900">12</div>
            </div>
            <div className="text-sm text-gray-600">Achievements</div>
            <Progress value={60} className="mt-2 h-1.5" />
          </Card>

          <Card className="p-4 lg:p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-200 hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <Star className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-2xl lg:text-3xl text-gray-900">#42</div>
            </div>
            <div className="text-sm text-gray-600">Global Rank</div>
            <div className="text-xs text-green-600 mt-2">↑ 8 positions</div>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* USS Progress Chart */}
          <Card className="p-4 lg:p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900">USS Progress</h3>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Last 6 months
              </Badge>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={ussProgressData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  fill="url(#colorScore)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          {/* Skills Radar */}
          <Card className="p-4 lg:p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900">Top Skills</h3>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-blue-600 hover:text-blue-700"
                onClick={() => onNavigate('profile')}
              >
                View All
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={skillsData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="subject" stroke="#6b7280" />
                <PolarRadiusAxis stroke="#9ca3af" />
                <Radar 
                  name="Skills" 
                  dataKey="value" 
                  stroke="#6366f1" 
                  fill="#6366f1" 
                  fillOpacity={0.5}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Quick Actions & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <Card className="lg:col-span-1 p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-200">
            <h3 className="text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start gap-3 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all"
                onClick={() => setShowAddSkillDialog(true)}
              >
                <Plus className="w-4 h-4 text-blue-600" />
                Add New Skill
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start gap-3 rounded-xl hover:bg-purple-50 hover:border-purple-300 transition-all"
                onClick={() => onNavigate('recruiters')}
              >
                <Users className="w-4 h-4 text-purple-600" />
                Browse Recruiters
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start gap-3 rounded-xl hover:bg-green-50 hover:border-green-300 transition-all"
              >
                <MessageSquare className="w-4 h-4 text-green-600" />
                Chat with AI Bot
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start gap-3 rounded-xl hover:bg-amber-50 hover:border-amber-300 transition-all"
                onClick={() => onNavigate('leaderboard')}
              >
                <Award className="w-4 h-4 text-amber-600" />
                View Leaderboard
              </Button>
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="lg:col-span-2 p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-200">
            <h3 className="text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div 
                  key={activity.id} 
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === 'achievement' ? 'bg-amber-100' :
                    activity.type === 'match' ? 'bg-green-100' :
                    activity.type === 'skill' ? 'bg-blue-100' :
                    'bg-purple-100'
                  }`}>
                    {activity.type === 'achievement' && <Award className="w-5 h-5 text-amber-600" />}
                    {activity.type === 'match' && <Users className="w-5 h-5 text-green-600" />}
                    {activity.type === 'skill' && <BookOpen className="w-5 h-5 text-blue-600" />}
                    {activity.type === 'rank' && <TrendingUp className="w-5 h-5 text-purple-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 text-sm">{activity.text}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <MobileNav currentPage="dashboard" onNavigate={onNavigate} userRole={userRole} />
      
      <AddSkillDialog 
        open={showAddSkillDialog} 
        onOpenChange={setShowAddSkillDialog}
        onAdd={handleAddSkill}
      />
    </div>
  );
}