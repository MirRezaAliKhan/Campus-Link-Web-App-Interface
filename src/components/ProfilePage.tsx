import { useState } from 'react';
import { TopBar } from './TopBar';
import { MobileNav } from './MobileNav';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { AddSkillDialog } from './AddSkillDialog';
import { 
  Mail, 
  MapPin, 
  Calendar,
  Award,
  Star,
  Code,
  Briefcase,
  GraduationCap,
  Edit,
  TrendingUp
} from 'lucide-react';

type Page = 'dashboard' | 'profile' | 'leaderboard' | 'recruiters' | 'analytics';

interface ProfilePageProps {
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

const skills = [
  { name: 'React', level: 85, category: 'Frontend' },
  { name: 'Python', level: 75, category: 'Programming' },
  { name: 'Machine Learning', level: 70, category: 'AI/ML' },
  { name: 'UI/UX Design', level: 80, category: 'Design' },
  { name: 'Node.js', level: 78, category: 'Backend' },
  { name: 'TypeScript', level: 82, category: 'Programming' },
  { name: 'PostgreSQL', level: 68, category: 'Database' },
  { name: 'Docker', level: 72, category: 'DevOps' },
];

const achievements = [
  { 
    id: 1, 
    title: 'Top Performer', 
    description: 'Ranked in top 5% globally',
    date: 'May 2024',
    icon: '🏆',
    color: 'from-amber-400 to-orange-500'
  },
  { 
    id: 2, 
    title: 'Skill Master', 
    description: 'Mastered 20+ skills',
    date: 'April 2024',
    icon: '⭐',
    color: 'from-purple-400 to-pink-500'
  },
  { 
    id: 3, 
    title: 'Rising Star', 
    description: 'Improved USS by 15 points',
    date: 'March 2024',
    icon: '🚀',
    color: 'from-blue-400 to-cyan-500'
  },
  { 
    id: 4, 
    title: 'Team Player', 
    description: 'Led 5+ collaborative projects',
    date: 'February 2024',
    icon: '🤝',
    color: 'from-green-400 to-emerald-500'
  },
];

const academics = [
  { semester: 'Fall 2024', gpa: 3.92, courses: 5, credits: 18 },
  { semester: 'Spring 2024', gpa: 3.85, courses: 5, credits: 17 },
  { semester: 'Fall 2023', gpa: 3.78, courses: 6, credits: 19 },
  { semester: 'Spring 2023', gpa: 3.81, courses: 5, credits: 16 },
];

export function ProfilePage({ onNavigate, onLogout }: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState('overview');
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
        {/* Profile Header */}
        <Card className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white p-6 lg:p-8 rounded-2xl border-0 shadow-xl">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="relative">
              <Avatar className="w-24 h-24 lg:w-32 lg:h-32 ring-4 ring-white/30">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Reza" />
                <AvatarFallback>RZ</AvatarFallback>
              </Avatar>
              <Button 
                size="sm" 
                className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white text-blue-600 hover:bg-blue-50 p-0"
              >
                <Edit className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl lg:text-3xl mb-2">Reza Mohammad</h1>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-blue-100 mb-4">
                <div className="flex items-center gap-1">
                  <GraduationCap className="w-4 h-4" />
                  MIT • Computer Science
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  Cambridge, MA
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Class of 2025
                </div>
              </div>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <Badge className="bg-white/20 text-white border-0">Available for Internship</Badge>
                <Badge className="bg-white/20 text-white border-0">Full-time 2025</Badge>
              </div>
            </div>

            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 text-center min-w-[140px]">
              <div className="text-sm text-blue-100 mb-1">USS Score</div>
              <div className="text-5xl mb-1">88</div>
              <div className="flex items-center justify-center gap-1 text-sm text-green-300">
                <TrendingUp className="w-4 h-4" />
                Top 5%
              </div>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full bg-white/70 backdrop-blur-sm p-1 rounded-2xl border border-gray-200">
            <TabsTrigger value="overview" className="flex-1 rounded-xl data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex-1 rounded-xl data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Skills
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex-1 rounded-xl data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Achievements
            </TabsTrigger>
            <TabsTrigger value="academics" className="flex-1 rounded-xl data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Academics
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-6 space-y-6">
            <Card className="p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-200">
              <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-blue-600" />
                About Me
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Passionate Computer Science student at MIT with a focus on AI/ML and full-stack development. 
                Strong foundation in algorithms, data structures, and modern web technologies. 
                Seeking opportunities to apply technical skills in innovative projects and contribute to cutting-edge solutions.
              </p>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-200">
                <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                  <Code className="w-5 h-5 text-purple-600" />
                  Top Skills
                </h3>
                <div className="space-y-3">
                  {skills.slice(0, 5).map((skill) => (
                    <div key={skill.name}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm text-gray-700">{skill.name}</span>
                        <span className="text-sm text-gray-500">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-200">
                <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-green-600" />
                  Experience Highlights
                </h3>
                <div className="space-y-4">
                  <div className="border-l-2 border-blue-600 pl-4">
                    <p className="text-gray-900">Software Engineering Intern</p>
                    <p className="text-sm text-gray-600">Google • Summer 2024</p>
                    <p className="text-xs text-gray-500 mt-1">Developed ML models for search optimization</p>
                  </div>
                  <div className="border-l-2 border-purple-600 pl-4">
                    <p className="text-gray-900">Research Assistant</p>
                    <p className="text-sm text-gray-600">MIT CSAIL • 2023-2024</p>
                    <p className="text-xs text-gray-500 mt-1">AI-driven accessibility research</p>
                  </div>
                  <div className="border-l-2 border-green-600 pl-4">
                    <p className="text-gray-900">Full Stack Developer</p>
                    <p className="text-sm text-gray-600">Startup XYZ • 2023</p>
                    <p className="text-xs text-gray-500 mt-1">Built scalable web applications</p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills" className="mt-6">
            <Card className="p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-gray-900">All Skills ({skills.length})</h3>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl" onClick={() => setShowAddSkillDialog(true)}>
                  Add Skill
                </Button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {skills.map((skill) => (
                  <div key={skill.name} className="p-4 bg-white rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="text-gray-900">{skill.name}</p>
                        <p className="text-xs text-gray-500">{skill.category}</p>
                      </div>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {skill.level}%
                      </Badge>
                    </div>
                    <Progress value={skill.level} className="h-2.5" />
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {achievements.map((achievement) => (
                <Card 
                  key={achievement.id}
                  className={`p-6 rounded-2xl bg-gradient-to-br ${achievement.color} text-white border-0 shadow-lg hover:scale-105 transition-transform`}
                >
                  <div className="text-4xl mb-3">{achievement.icon}</div>
                  <h4 className="mb-2">{achievement.title}</h4>
                  <p className="text-sm text-white/90 mb-3">{achievement.description}</p>
                  <div className="text-xs text-white/80">{achievement.date}</div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Academics Tab */}
          <TabsContent value="academics" className="mt-6 space-y-6">
            <Card className="p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-gray-900">Academic Performance</h3>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Cumulative GPA</div>
                  <div className="text-2xl text-gray-900">3.85</div>
                </div>
              </div>
              
              <div className="space-y-4">
                {academics.map((semester) => (
                  <div 
                    key={semester.semester}
                    className="p-4 bg-white rounded-xl border border-gray-200"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-gray-900">{semester.semester}</p>
                        <p className="text-sm text-gray-500">
                          {semester.courses} courses • {semester.credits} credits
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-blue-600 text-white">
                          GPA: {semester.gpa}
                        </Badge>
                      </div>
                    </div>
                    <Progress value={semester.gpa * 25} className="h-2" />
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <MobileNav currentPage="profile" onNavigate={onNavigate} userRole="student" />
      
      <AddSkillDialog 
        open={showAddSkillDialog} 
        onOpenChange={setShowAddSkillDialog}
        onAdd={handleAddSkill}
      />
    </div>
  );
}