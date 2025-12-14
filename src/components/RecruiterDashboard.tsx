import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  Search, 
  Settings, 
  Bell, 
  LogOut, 
  Briefcase, 
  FileText, 
  Users,
  Target,
  TrendingUp,
  Calendar,
  Award,
  ChevronRight,
  Star,
  Building2,
  UserPlus,
  MessageSquare,
  Eye
} from 'lucide-react';
import logoImage from 'figma:asset/a0fae53220a0559f5a6b46d7beefdf1fb301528a.png';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface RecruiterDashboardProps {
  onLogout: () => void;
  onNavigate: (page: string) => void;
}

// Mock candidate data
const topCandidates = [
  {
    id: 1,
    name: 'Aarav Sharma',
    university: 'MIT',
    degree: 'B.Tech Computer Science',
    uss: 96,
    skills: ['React', 'Python', 'ML'],
    match: 95,
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aarav',
  },
  {
    id: 2,
    name: 'Priya Patel',
    university: 'Stanford',
    degree: 'M.S. Data Science',
    uss: 94,
    skills: ['TensorFlow', 'Python', 'SQL'],
    match: 92,
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
  },
  {
    id: 3,
    name: 'Rohan Kumar',
    university: 'Berkeley',
    degree: 'B.Tech AI/ML',
    uss: 92,
    skills: ['Java', 'Spring Boot', 'AWS'],
    match: 90,
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan',
  },
  {
    id: 4,
    name: 'Ananya Singh',
    university: 'Carnegie Mellon',
    degree: 'B.S. Software Engineering',
    uss: 91,
    skills: ['React Native', 'Node.js', 'MongoDB'],
    match: 88,
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya',
  },
  {
    id: 5,
    name: 'Vikram Reddy',
    university: 'IIT Delhi',
    degree: 'B.Tech Electronics',
    uss: 89,
    skills: ['IoT', 'Embedded Systems', 'C++'],
    match: 87,
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram',
  },
];

const recentApplications = [
  { id: 1, candidate: 'Sarah Chen', position: 'Software Engineer', status: 'Under Review', time: '2 hours ago' },
  { id: 2, candidate: 'Michael Kumar', position: 'Data Scientist', status: 'Shortlisted', time: '4 hours ago' },
  { id: 3, candidate: 'Emily Rodriguez', position: 'Frontend Developer', status: 'Interview Scheduled', time: '1 day ago' },
  { id: 4, candidate: 'David Park', position: 'Full Stack Developer', status: 'Under Review', time: '1 day ago' },
  { id: 5, candidate: 'Jessica Lee', position: 'ML Engineer', status: 'Shortlisted', time: '2 days ago' },
];

const applicationsData = [
  { month: 'Jan', applications: 45 },
  { month: 'Feb', applications: 52 },
  { month: 'Mar', applications: 61 },
  { month: 'Apr', applications: 58 },
  { month: 'May', applications: 72 },
  { month: 'Jun', applications: 85 },
];

const skillDemandData = [
  { skill: 'React', demand: 85 },
  { skill: 'Python', demand: 78 },
  { skill: 'AWS', demand: 72 },
  { skill: 'Node.js', demand: 68 },
  { skill: 'ML/AI', demand: 90 },
];

export function RecruiterDashboard({ onLogout, onNavigate }: RecruiterDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredCandidates = topCandidates.filter(candidate =>
    candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    candidate.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
    candidate.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleLogoClick = () => {
    onNavigate('dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            {/* Logo and Title */}
            <div className="flex items-center gap-4">
              <button 
                onClick={handleLogoClick}
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <img 
                  src={logoImage} 
                  alt="Campus-Link Logo" 
                  className="w-10 h-10 rounded-lg shadow-md"
                />
                <div className="hidden sm:block">
                  <h1 className="text-gray-900">Recruiter Dashboard</h1>
                  <p className="text-sm text-gray-600">Campus-Link</p>
                </div>
              </button>
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors relative">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
              
              <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs rounded-full">
                  12
                </Badge>
              </button>

              <div className="hidden lg:flex items-center gap-2 pl-3 border-l border-gray-300">
                <Avatar className="w-9 h-9 ring-2 ring-purple-100">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Recruiter" />
                  <AvatarFallback className="bg-purple-600 text-white">TC</AvatarFallback>
                </Avatar>
                <div className="hidden xl:block">
                  <p className="text-sm text-gray-900">TechCorp Inc.</p>
                  <p className="text-xs text-gray-600">HR Manager</p>
                </div>
              </div>

              <Button
                onClick={onLogout}
                variant="ghost"
                size="sm"
                className="hidden lg:flex items-center gap-2 text-gray-600 hover:text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden xl:inline">Logout</span>
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search Candidates by Name / University / Skills..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(e.target.value.length > 0);
              }}
              onFocus={() => setShowSuggestions(searchQuery.length > 0)}
              className="pl-12 pr-4 py-6 bg-white border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all shadow-sm"
            />

            {/* Auto-suggest Dropdown */}
            {showSuggestions && filteredCandidates.length > 0 && (
              <Card className="absolute top-full mt-2 w-full bg-white border-2 border-gray-200 rounded-2xl shadow-xl z-50 max-h-96 overflow-y-auto">
                {filteredCandidates.map((candidate) => (
                  <button
                    key={candidate.id}
                    onClick={() => {
                      setSearchQuery('');
                      setShowSuggestions(false);
                    }}
                    className="w-full flex items-center gap-4 p-4 hover:bg-purple-50 transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={candidate.photo} />
                      <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-left">
                      <p className="text-gray-900">{candidate.name}</p>
                      <p className="text-sm text-gray-600">{candidate.university} • {candidate.degree}</p>
                      <div className="flex gap-1 mt-1">
                        {candidate.skills.slice(0, 3).map((skill, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {candidate.match}% Match
                    </Badge>
                  </button>
                ))}
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 space-y-6">
        {/* Analytics Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-6 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-2">
              <Briefcase className="w-8 h-8 opacity-80" />
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Briefcase className="w-6 h-6" />
              </div>
            </div>
            <p className="text-3xl mb-1">24</p>
            <p className="text-sm text-purple-100">Active Job Postings</p>
          </Card>

          <Card className="p-6 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 text-white border-0 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-2">
              <FileText className="w-8 h-8 opacity-80" />
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
            </div>
            <p className="text-3xl mb-1">342</p>
            <p className="text-sm text-rose-100">Applications Received</p>
          </Card>

          <Card className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-2">
              <Target className="w-8 h-8 opacity-80" />
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
            </div>
            <p className="text-3xl mb-1">156</p>
            <p className="text-sm text-cyan-100">Mutual Matches</p>
          </Card>

          <Card className="p-6 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white border-0 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 opacity-80" />
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
            <p className="text-3xl mb-1">68%</p>
            <p className="text-sm text-amber-100">Response Rate</p>
          </Card>
        </div>

        {/* Quick Actions and Top Candidates */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions Panel */}
          <Card className="lg:col-span-1 p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-200 shadow-lg">
            <h3 className="text-gray-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-600" />
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start gap-3 rounded-xl hover:bg-purple-50 hover:border-purple-300 transition-all h-auto py-4"
              >
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-900">Post New Job</p>
                  <p className="text-xs text-gray-500">Create job listing</p>
                </div>
              </Button>

              <Button 
                variant="outline" 
                className="w-full justify-start gap-3 rounded-xl hover:bg-pink-50 hover:border-pink-300 transition-all h-auto py-4"
              >
                <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Eye className="w-5 h-5 text-pink-600" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-900">View Applications</p>
                  <p className="text-xs text-gray-500">Review candidates</p>
                </div>
              </Button>

              <Button 
                variant="outline" 
                className="w-full justify-start gap-3 rounded-xl hover:bg-cyan-50 hover:border-cyan-300 transition-all h-auto py-4"
              >
                <div className="w-10 h-10 bg-cyan-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-cyan-600" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-900">Search Talent Pool</p>
                  <p className="text-xs text-gray-500">Find candidates</p>
                </div>
              </Button>

              <Button 
                variant="outline" 
                className="w-full justify-start gap-3 rounded-xl hover:bg-green-50 hover:border-green-300 transition-all h-auto py-4"
              >
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-900">Message Candidates</p>
                  <p className="text-xs text-gray-500">Start conversation</p>
                </div>
              </Button>
            </div>
          </Card>

          {/* Top Matched Candidates */}
          <Card className="lg:col-span-2 p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-200 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900 flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500" />
                Top Matched Candidates
              </h3>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
              >
                View All
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            <div className="space-y-3">
              {topCandidates.map((candidate, index) => (
                <button
                  key={candidate.id}
                  className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all border border-gray-100 hover:border-purple-200 hover:shadow-md"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    index === 0 ? 'bg-gradient-to-br from-amber-400 to-yellow-500 text-white' :
                    index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-white' :
                    index === 2 ? 'bg-gradient-to-br from-orange-400 to-amber-600 text-white' :
                    'bg-purple-100 text-purple-700'
                  }`}>
                    {index + 1}
                  </div>

                  <Avatar className="w-12 h-12 ring-2 ring-white shadow-md">
                    <AvatarImage src={candidate.photo} />
                    <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1 text-left">
                    <p className="text-gray-900">{candidate.name}</p>
                    <p className="text-sm text-gray-600">{candidate.university}</p>
                    <div className="flex gap-1 mt-1">
                      {candidate.skills.slice(0, 2).map((skill, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-gray-900">USS: {candidate.uss}</p>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 mt-1">
                      {candidate.match}% Match
                    </Badge>
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Recent Applications and Analytics Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Applications */}
          <Card className="p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-200 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-600" />
                Recent Applications
              </h3>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
              >
                View All
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            <div className="space-y-3">
              {recentApplications.map((app) => (
                <div
                  key={app.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-br from-gray-50 to-purple-50 border border-gray-200 hover:shadow-md transition-all"
                >
                  <div>
                    <p className="text-sm text-gray-900">{app.candidate}</p>
                    <p className="text-xs text-gray-600">{app.position}</p>
                    <p className="text-xs text-gray-500 mt-1">{app.time}</p>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={
                      app.status === 'Shortlisted' ? 'bg-green-50 text-green-700 border-green-200' :
                      app.status === 'Interview Scheduled' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                      'bg-amber-50 text-amber-700 border-amber-200'
                    }
                  >
                    {app.status}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Applications Trend Chart */}
          <Card className="p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-200 shadow-lg">
            <h3 className="text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              Applications Trend
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={applicationsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="applications" 
                  stroke="#9333ea" 
                  strokeWidth={3}
                  dot={{ fill: '#9333ea', r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Skill Demand Analytics */}
        <Card className="p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-200 shadow-lg">
          <h3 className="text-gray-900 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-purple-600" />
            Top Skills in Demand
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={skillDemandData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="skill" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }} 
              />
              <Bar 
                dataKey="demand" 
                fill="url(#colorGradient)" 
                radius={[8, 8, 0, 0]}
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9333ea" stopOpacity={0.9}/>
                  <stop offset="95%" stopColor="#ec4899" stopOpacity={0.9}/>
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Footer */}
      <footer className="bg-white/50 backdrop-blur-sm border-t border-gray-200 mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 text-center">
          <p className="text-sm text-gray-600">
            Campus-Link © 2025 <span className="text-purple-600">Team DevEon</span>. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
