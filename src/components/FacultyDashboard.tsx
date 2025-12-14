import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { StudentDetailModal } from './StudentDetailModal';
import { 
  Search, 
  Settings, 
  Bell, 
  LogOut, 
  FileText, 
  Upload, 
  Megaphone, 
  Users,
  BookOpen,
  TrendingUp,
  Calendar,
  Award,
  ChevronRight,
  Star
} from 'lucide-react';
import logoImage from 'figma:asset/a0fae53220a0559f5a6b46d7beefdf1fb301528a.png';

interface FacultyDashboardProps {
  onLogout: () => void;
  onNavigate: (page: string) => void;
}

// Mock student data
const mockStudents = [
  {
    id: '1',
    name: 'Aarav Sharma',
    rollNo: 'CS2024001',
    department: 'Computer Science',
    year: '3rd Year',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aarav',
    averageMarks: 92.5,
    rank: 1,
    subjects: [
      { name: 'Data Structures', test1: 95, test2: 92, test3: 94, average: 93.7 },
      { name: 'Algorithms', test1: 90, test2: 93, test3: 91, average: 91.3 },
      { name: 'Database Systems', test1: 88, test2: 95, test3: 92, average: 91.7 },
      { name: 'Operating Systems', test1: 94, test2: 90, test3: 93, average: 92.3 },
      { name: 'Web Technologies', test1: 92, test2: 94, test3: 95, average: 93.7 },
    ]
  },
  {
    id: '2',
    name: 'Priya Patel',
    rollNo: 'CS2024002',
    department: 'Computer Science',
    year: '3rd Year',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
    averageMarks: 89.8,
    rank: 2,
    subjects: [
      { name: 'Data Structures', test1: 92, test2: 88, test3: 90, average: 90.0 },
      { name: 'Algorithms', test1: 87, test2: 91, test3: 89, average: 89.0 },
      { name: 'Database Systems', test1: 90, test2: 89, test3: 91, average: 90.0 },
      { name: 'Operating Systems', test1: 88, test2: 90, test3: 89, average: 89.0 },
      { name: 'Web Technologies', test1: 91, test2: 89, test3: 90, average: 90.0 },
    ]
  },
  {
    id: '3',
    name: 'Rohan Kumar',
    rollNo: 'CS2024003',
    department: 'Computer Science',
    year: '3rd Year',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan',
    averageMarks: 87.3,
    rank: 3,
    subjects: [
      { name: 'Data Structures', test1: 85, test2: 88, test3: 87, average: 86.7 },
      { name: 'Algorithms', test1: 89, test2: 86, test3: 88, average: 87.7 },
      { name: 'Database Systems', test1: 87, test2: 88, test3: 86, average: 87.0 },
      { name: 'Operating Systems', test1: 86, test2: 89, test3: 87, average: 87.3 },
      { name: 'Web Technologies', test1: 88, test2: 87, test3: 89, average: 88.0 },
    ]
  },
  {
    id: '4',
    name: 'Ananya Singh',
    rollNo: 'CS2024004',
    department: 'Computer Science',
    year: '3rd Year',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya',
    averageMarks: 85.6,
    rank: 4,
    subjects: [
      { name: 'Data Structures', test1: 84, test2: 86, test3: 85, average: 85.0 },
      { name: 'Algorithms', test1: 87, test2: 84, test3: 86, average: 85.7 },
      { name: 'Database Systems', test1: 85, test2: 87, test3: 84, average: 85.3 },
      { name: 'Operating Systems', test1: 86, test2: 85, test3: 87, average: 86.0 },
      { name: 'Web Technologies', test1: 85, test2: 86, test3: 85, average: 85.3 },
    ]
  },
  {
    id: '5',
    name: 'Vikram Reddy',
    rollNo: 'CS2024005',
    department: 'Computer Science',
    year: '3rd Year',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram',
    averageMarks: 84.2,
    rank: 5,
    subjects: [
      { name: 'Data Structures', test1: 83, test2: 85, test3: 84, average: 84.0 },
      { name: 'Algorithms', test1: 85, test2: 83, test3: 85, average: 84.3 },
      { name: 'Database Systems', test1: 84, test2: 84, test3: 83, average: 83.7 },
      { name: 'Operating Systems', test1: 85, test2: 84, test3: 85, average: 84.7 },
      { name: 'Web Technologies', test1: 84, test2: 85, test3: 84, average: 84.3 },
    ]
  },
];

const announcements = [
  { id: 1, title: 'Mid-term exams scheduled', date: '2 hours ago', priority: 'high' },
  { id: 2, title: 'New assignment uploaded', date: '5 hours ago', priority: 'medium' },
  { id: 3, title: 'Faculty meeting on Friday', date: '1 day ago', priority: 'low' },
  { id: 4, title: 'Project submission deadline', date: '2 days ago', priority: 'high' },
];

export function FacultyDashboard({ onLogout, onNavigate }: FacultyDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<typeof mockStudents[0] | null>(null);
  const [showStudentModal, setShowStudentModal] = useState(false);

  const filteredStudents = mockStudents.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.id.includes(searchQuery)
  );

  const handleStudentSelect = (student: typeof mockStudents[0]) => {
    setSelectedStudent(student);
    setShowStudentModal(true);
    setSearchQuery('');
    setShowSuggestions(false);
  };

  const handleLogoClick = () => {
    onNavigate('dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-violet-50">
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
                  <h1 className="text-gray-900">Faculty Dashboard</h1>
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
                  4
                </Badge>
              </button>

              <div className="hidden lg:flex items-center gap-2 pl-3 border-l border-gray-300">
                <Avatar className="w-9 h-9 ring-2 ring-blue-100">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Faculty" />
                  <AvatarFallback className="bg-blue-600 text-white">DR</AvatarFallback>
                </Avatar>
                <div className="hidden xl:block">
                  <p className="text-sm text-gray-900">Dr. Rajesh Kumar</p>
                  <p className="text-xs text-gray-600">Computer Science</p>
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
              placeholder="Search Student by Name / Roll No / ID..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(e.target.value.length > 0);
              }}
              onFocus={() => setShowSuggestions(searchQuery.length > 0)}
              className="pl-12 pr-4 py-6 bg-white border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all shadow-sm"
            />

            {/* Auto-suggest Dropdown */}
            {showSuggestions && filteredStudents.length > 0 && (
              <Card className="absolute top-full mt-2 w-full bg-white border-2 border-gray-200 rounded-2xl shadow-xl z-50 max-h-96 overflow-y-auto">
                {filteredStudents.map((student) => (
                  <button
                    key={student.id}
                    onClick={() => handleStudentSelect(student)}
                    className="w-full flex items-center gap-4 p-4 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={student.photo} />
                      <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-left">
                      <p className="text-gray-900">{student.name}</p>
                      <p className="text-sm text-gray-600">{student.rollNo} • {student.department}</p>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {student.averageMarks.toFixed(1)}%
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
        {/* Class Overview / Analytics Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-6 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 opacity-80" />
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
            </div>
            <p className="text-3xl mb-1">245</p>
            <p className="text-sm text-blue-100">Total Students</p>
          </Card>

          <Card className="p-6 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-2">
              <BookOpen className="w-8 h-8 opacity-80" />
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
            </div>
            <p className="text-3xl mb-1">5</p>
            <p className="text-sm text-purple-100">Subjects Handled</p>
          </Card>

          <Card className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-600 text-white border-0 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 opacity-80" />
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
            <p className="text-3xl mb-1">86.4%</p>
            <p className="text-sm text-cyan-100">Avg Performance</p>
          </Card>

          <Card className="p-6 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white border-0 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="w-8 h-8 opacity-80" />
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
            </div>
            <p className="text-3xl mb-1">3</p>
            <p className="text-sm text-amber-100">Upcoming Evaluations</p>
          </Card>
        </div>

        {/* Quick Actions and Leaderboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions Panel */}
          <Card className="lg:col-span-1 p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-200 shadow-lg">
            <h3 className="text-gray-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-600" />
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start gap-3 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all h-auto py-4"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-900">Add Internal Marks</p>
                  <p className="text-xs text-gray-500">Update student scores</p>
                </div>
              </Button>

              <Button 
                variant="outline" 
                className="w-full justify-start gap-3 rounded-xl hover:bg-violet-50 hover:border-violet-300 transition-all h-auto py-4"
              >
                <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Upload className="w-5 h-5 text-violet-600" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-900">Upload Results</p>
                  <p className="text-xs text-gray-500">Bulk upload CSV/Excel</p>
                </div>
              </Button>

              <Button 
                variant="outline" 
                className="w-full justify-start gap-3 rounded-xl hover:bg-cyan-50 hover:border-cyan-300 transition-all h-auto py-4"
              >
                <div className="w-10 h-10 bg-cyan-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Megaphone className="w-5 h-5 text-cyan-600" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-900">Post Announcement</p>
                  <p className="text-xs text-gray-500">Notify all students</p>
                </div>
              </Button>

              <Button 
                variant="outline" 
                className="w-full justify-start gap-3 rounded-xl hover:bg-green-50 hover:border-green-300 transition-all h-auto py-4"
              >
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-900">Attendance Summary</p>
                  <p className="text-xs text-gray-500">View & manage attendance</p>
                </div>
              </Button>
            </div>
          </Card>

          {/* Leaderboard Section */}
          <Card className="lg:col-span-2 p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-200 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900 flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500" />
                Top Performers
              </h3>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              >
                View All
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            <div className="space-y-3">
              {mockStudents.slice(0, 5).map((student, index) => (
                <button
                  key={student.id}
                  onClick={() => handleStudentSelect(student)}
                  className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-violet-50 transition-all border border-gray-100 hover:border-blue-200 hover:shadow-md"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    index === 0 ? 'bg-gradient-to-br from-amber-400 to-yellow-500 text-white' :
                    index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-white' :
                    index === 2 ? 'bg-gradient-to-br from-orange-400 to-amber-600 text-white' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {index + 1}
                  </div>

                  <Avatar className="w-12 h-12 ring-2 ring-white shadow-md">
                    <AvatarImage src={student.photo} />
                    <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1 text-left">
                    <p className="text-gray-900">{student.name}</p>
                    <p className="text-sm text-gray-600">{student.rollNo}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-gray-900">{student.averageMarks.toFixed(1)}%</p>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 mt-1">
                      Rank #{student.rank}
                    </Badge>
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Announcements Widget */}
        <Card className="p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-200 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900 flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-blue-600" />
              Recent Announcements
            </h3>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            >
              View All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                className="p-4 rounded-xl bg-gradient-to-br from-gray-50 to-blue-50 border border-gray-200 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <Badge 
                    variant="outline" 
                    className={
                      announcement.priority === 'high' ? 'bg-red-50 text-red-700 border-red-200' :
                      announcement.priority === 'medium' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      'bg-green-50 text-green-700 border-green-200'
                    }
                  >
                    {announcement.priority}
                  </Badge>
                </div>
                <p className="text-sm text-gray-900 mb-2">{announcement.title}</p>
                <p className="text-xs text-gray-500">{announcement.date}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Footer */}
      <footer className="bg-white/50 backdrop-blur-sm border-t border-gray-200 mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 text-center">
          <p className="text-sm text-gray-600">
            Campus-Link © 2025 <span className="text-blue-600">Team DevEon</span>. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Student Detail Modal */}
      <StudentDetailModal 
        open={showStudentModal}
        onOpenChange={setShowStudentModal}
        student={selectedStudent}
      />
    </div>
  );
}
