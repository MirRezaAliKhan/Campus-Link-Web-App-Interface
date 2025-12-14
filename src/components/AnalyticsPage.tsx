import { TopBar } from './TopBar';
import { MobileNav } from './MobileNav';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  BarChart3,
  Download,
  TrendingUp,
  Users,
  GraduationCap,
  Award,
  Target
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart,
  Pie,
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';

type Page = 'dashboard' | 'profile' | 'leaderboard' | 'recruiters' | 'analytics';

interface AnalyticsPageProps {
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

const placementTrends = [
  { year: '2020', placements: 245, avgSalary: 95 },
  { year: '2021', placements: 278, avgSalary: 102 },
  { year: '2022', placements: 312, avgSalary: 115 },
  { year: '2023', placements: 356, avgSalary: 128 },
  { year: '2024', placements: 389, avgSalary: 142 },
];

const departmentUSS = [
  { department: 'CS', avgUSS: 88, students: 450 },
  { department: 'ECE', avgUSS: 85, students: 380 },
  { department: 'ME', avgUSS: 82, students: 320 },
  { department: 'ChemE', avgUSS: 80, students: 250 },
  { department: 'Aero', avgUSS: 84, students: 180 },
];

const skillGaps = [
  { skill: 'Machine Learning', demand: 92, supply: 68 },
  { skill: 'Cloud Computing', demand: 88, supply: 72 },
  { skill: 'Cybersecurity', demand: 85, supply: 58 },
  { skill: 'Data Science', demand: 90, supply: 75 },
  { skill: 'Mobile Dev', demand: 78, supply: 65 },
];

const industryDistribution = [
  { name: 'Technology', value: 42, color: '#3b82f6' },
  { name: 'Finance', value: 18, color: '#10b981' },
  { name: 'Consulting', value: 15, color: '#f59e0b' },
  { name: 'Healthcare', value: 12, color: '#ef4444' },
  { name: 'Other', value: 13, color: '#8b5cf6' },
];

export function AnalyticsPage({ onNavigate, onLogout }: AnalyticsPageProps) {
  const handleLogoClick = () => {
    onNavigate('dashboard');
  };

  const handleDownloadReport = () => {
    // In a real app, this would generate and download a PDF report
    const reportData = {
      date: new Date().toLocaleDateString(),
      totalStudents: 1580,
      placementRate: 92,
      avgUSS: 85.4,
      avgPackage: 142
    };
    console.log('Downloading report:', reportData);
    alert('Report downloaded successfully! (In a real app, this would download a PDF file)');
  };

  return (
    <div className="min-h-screen pb-20 lg:pb-6">
      <TopBar onLogout={onLogout} userName="Faculty Admin" onLogoClick={handleLogoClick} />
      
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 space-y-6">
        {/* Header */}
        <Card className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white p-6 lg:p-8 rounded-2xl border-0 shadow-xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl lg:text-3xl mb-2 flex items-center justify-center sm:justify-start gap-2">
                <BarChart3 className="w-8 h-8" />
                Faculty Analytics Dashboard
              </h1>
              <p className="text-purple-100">
                Insights into student performance, placements, and skill trends
              </p>
            </div>
            <Button className="bg-white/20 backdrop-blur-lg hover:bg-white/30 text-white rounded-xl flex items-center gap-2" onClick={handleDownloadReport}>
              <Download className="w-4 h-4" />
              Download Report
            </Button>
          </div>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 lg:p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-2xl lg:text-3xl text-gray-900">1,580</div>
            </div>
            <div className="text-sm text-gray-600">Total Students</div>
            <div className="text-xs text-green-600 mt-2 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +12% YoY
            </div>
          </Card>

          <Card className="p-4 lg:p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <Award className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-2xl lg:text-3xl text-gray-900">92%</div>
            </div>
            <div className="text-sm text-gray-600">Placement Rate</div>
            <div className="text-xs text-green-600 mt-2 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +5% from last year
            </div>
          </Card>

          <Card className="p-4 lg:p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <Target className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-2xl lg:text-3xl text-gray-900">85.4</div>
            </div>
            <div className="text-sm text-gray-600">Avg USS Score</div>
            <div className="text-xs text-green-600 mt-2 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +2.3 points
            </div>
          </Card>

          <Card className="p-4 lg:p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-amber-600" />
              </div>
              <div className="text-2xl lg:text-3xl text-gray-900">$142k</div>
            </div>
            <div className="text-sm text-gray-600">Avg Package</div>
            <div className="text-xs text-green-600 mt-2 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +11% increase
            </div>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Placement Trends */}
          <Card className="p-4 lg:p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900">Placement Trends (5 Years)</h3>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Growing
              </Badge>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={placementTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="year" stroke="#9ca3af" />
                <YAxis yAxisId="left" stroke="#9ca3af" />
                <YAxis yAxisId="right" orientation="right" stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb'
                  }} 
                />
                <Legend />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="placements" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  name="Placements"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="avgSalary" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  name="Avg Salary ($k)"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Department USS */}
          <Card className="p-4 lg:p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900">Average USS by Department</h3>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Current Semester
              </Badge>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={departmentUSS}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="department" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb'
                  }} 
                />
                <Bar dataKey="avgUSS" fill="#6366f1" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Skill Gap Analysis */}
          <Card className="p-4 lg:p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900">Skill Gap Analysis</h3>
              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                Action Needed
              </Badge>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={skillGaps}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="skill" stroke="#9ca3af" angle={-45} textAnchor="end" height={80} />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb'
                  }} 
                />
                <Legend />
                <Bar dataKey="demand" fill="#ef4444" radius={[8, 8, 0, 0]} name="Industry Demand" />
                <Bar dataKey="supply" fill="#10b981" radius={[8, 8, 0, 0]} name="Student Supply" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Industry Distribution */}
          <Card className="p-4 lg:p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900">Industry Distribution</h3>
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                2024 Placements
              </Badge>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={industryDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {industryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Top Performers */}
        <Card className="p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-200">
          <h3 className="text-gray-900 mb-4">Top Performing Students This Month</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Sarah Chen', dept: 'CS', uss: 98, improvement: '+5' },
              { name: 'Michael Kumar', dept: 'CS', uss: 96, improvement: '+4' },
              { name: 'Emily Rodriguez', dept: 'ECE', uss: 94, improvement: '+6' },
              { name: 'David Park', dept: 'ME', uss: 93, improvement: '+3' },
            ].map((student, idx) => (
              <div 
                key={idx}
                className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <Badge className="bg-blue-600 text-white">#{idx + 1}</Badge>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {student.improvement}
                  </Badge>
                </div>
                <p className="text-gray-900 mb-1">{student.name}</p>
                <p className="text-sm text-gray-600 mb-2">{student.dept}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">USS Score</span>
                  <span className="text-lg text-blue-700">{student.uss}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Insights & Recommendations */}
        <Card className="p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200">
          <h3 className="text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-amber-600" />
            Key Insights & Recommendations
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-xl">
              <h4 className="text-gray-900 mb-2">✅ Strengths</h4>
              <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                <li>92% placement rate exceeds national average</li>
                <li>Strong performance in CS and ECE departments</li>
                <li>Increasing average package year-over-year</li>
              </ul>
            </div>
            <div className="p-4 bg-white rounded-xl">
              <h4 className="text-gray-900 mb-2">🎯 Action Items</h4>
              <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                <li>Bridge skill gap in ML and Cybersecurity</li>
                <li>Increase industry partnerships in Finance</li>
                <li>Boost USS scores in ME and ChemE departments</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      <MobileNav currentPage="analytics" onNavigate={onNavigate} userRole="faculty" />
    </div>
  );
}