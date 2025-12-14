import { useState } from 'react';
import { TopBar } from './TopBar';
import { MobileNav } from './MobileNav';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { JobApplicationDialog } from './JobApplicationDialog';
import { 
  Building2, 
  MapPin, 
  Star,
  Search,
  Filter,
  Heart,
  TrendingUp,
  Users,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

type Page = 'dashboard' | 'profile' | 'leaderboard' | 'recruiters' | 'analytics';

interface RecruiterPageProps {
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

const recruiters = [
  {
    id: 1,
    company: 'Google',
    logo: '🔍',
    position: 'Software Engineer Intern',
    location: 'Mountain View, CA',
    industry: 'Technology',
    minUSS: 85,
    rating: 9.2,
    applicants: 1240,
    match: 95,
    isMutualMatch: true,
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 2,
    company: 'Meta',
    logo: '👥',
    position: 'ML Engineer',
    location: 'Menlo Park, CA',
    industry: 'Social Media',
    minUSS: 88,
    rating: 9.0,
    applicants: 980,
    match: 92,
    isMutualMatch: true,
    gradient: 'from-indigo-500 to-purple-500'
  },
  {
    id: 3,
    company: 'Tesla',
    logo: '⚡',
    position: 'AI Research Intern',
    location: 'Austin, TX',
    industry: 'Automotive',
    minUSS: 90,
    rating: 8.9,
    applicants: 756,
    match: 88,
    isMutualMatch: false,
    gradient: 'from-red-500 to-orange-500'
  },
  {
    id: 4,
    company: 'Microsoft',
    logo: '🪟',
    position: 'Cloud Engineer',
    location: 'Redmond, WA',
    industry: 'Technology',
    minUSS: 82,
    rating: 9.1,
    applicants: 1120,
    match: 87,
    isMutualMatch: false,
    gradient: 'from-blue-600 to-sky-500'
  },
  {
    id: 5,
    company: 'Amazon',
    logo: '📦',
    position: 'Full Stack Developer',
    location: 'Seattle, WA',
    industry: 'E-commerce',
    minUSS: 80,
    rating: 8.7,
    applicants: 1350,
    match: 85,
    isMutualMatch: false,
    gradient: 'from-orange-500 to-amber-500'
  },
  {
    id: 6,
    company: 'Apple',
    logo: '🍎',
    position: 'iOS Developer',
    location: 'Cupertino, CA',
    industry: 'Technology',
    minUSS: 86,
    rating: 9.3,
    applicants: 890,
    match: 90,
    isMutualMatch: true,
    gradient: 'from-slate-600 to-gray-500'
  },
];

export function RecruiterPage({ onNavigate, onLogout }: RecruiterPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [savedJobs, setSavedJobs] = useState<number[]>([]);
  const [showApplicationDialog, setShowApplicationDialog] = useState(false);
  const [selectedJob, setSelectedJob] = useState<{ company: string; position: string } | null>(null);

  const handleLogoClick = () => {
    onNavigate('dashboard');
  };

  const toggleSaveJob = (id: number) => {
    setSavedJobs(prev => 
      prev.includes(id) ? prev.filter(jobId => jobId !== id) : [...prev, id]
    );
  };

  const handleApplyClick = (company: string, position: string) => {
    setSelectedJob({ company, position });
    setShowApplicationDialog(true);
  };

  const handleApplicationSubmit = () => {
    console.log('Application submitted for:', selectedJob);
    // In a real app, this would send to backend
  };

  const mutualMatches = recruiters.filter(r => r.isMutualMatch);

  return (
    <div className="min-h-screen pb-20 lg:pb-6">
      <TopBar onLogout={onLogout} userName="Reza" onLogoClick={handleLogoClick} />
      
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 space-y-6">
        {/* Header */}
        <Card className="bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 text-white p-6 lg:p-8 rounded-2xl border-0 shadow-xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl lg:text-3xl mb-2 flex items-center justify-center sm:justify-start gap-2">
                <Building2 className="w-8 h-8" />
                Recruiters & Opportunities
              </h1>
              <p className="text-pink-100">
                Connect with top companies looking for talent like you
              </p>
            </div>
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-4 lg:p-6 text-center min-w-[140px]">
              <div className="text-sm text-pink-100 mb-1">Mutual Matches</div>
              <div className="text-4xl lg:text-5xl">{mutualMatches.length}</div>
              <div className="text-sm text-green-300 mt-1 flex items-center justify-center gap-1">
                <Sparkles className="w-4 h-4" />
                New!
              </div>
            </div>
          </div>
        </Card>

        {/* Search & Filter */}
        <div className="flex gap-3">
          <Card className="flex-1 p-3 rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search companies, positions, industries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-transparent border-0 focus-visible:ring-0"
              />
            </div>
          </Card>
          <Button
            onClick={() => setShowFilters(!showFilters)}
            className="rounded-2xl bg-white/70 text-gray-700 hover:bg-white border border-gray-200 px-4"
            variant="outline"
          >
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        {/* Mutual Matches Section */}
        {mutualMatches.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <h2 className="text-xl text-gray-900">Mutual Matches</h2>
              <Badge className="bg-purple-600 text-white">
                {mutualMatches.length}
              </Badge>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {mutualMatches.map((recruiter) => (
                <Card 
                  key={recruiter.id}
                  className="p-6 rounded-2xl bg-white border-2 border-purple-300 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${recruiter.gradient} flex items-center justify-center text-3xl shadow-lg`}>
                        {recruiter.logo}
                      </div>
                      <div>
                        <h3 className="text-gray-900 mb-1">{recruiter.company}</h3>
                        <p className="text-sm text-gray-600 mb-2">{recruiter.position}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <MapPin className="w-3 h-3" />
                          {recruiter.location}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleSaveJob(recruiter.id)}
                      className={`transition-colors ${
                        savedJobs.includes(recruiter.id) ? 'text-red-500' : 'text-gray-300 hover:text-red-500'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${savedJobs.includes(recruiter.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <Badge className="bg-purple-100 text-purple-700 border-0 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      {recruiter.match}% Match
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-700 border-0">
                      USS {recruiter.minUSS}+
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      {recruiter.rating}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {recruiter.applicants} applicants
                    </div>
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl" onClick={() => handleApplyClick(recruiter.company, recruiter.position)}>
                      Apply Now
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Opportunities */}
        <div>
          <h2 className="text-xl text-gray-900 mb-4">All Opportunities</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {recruiters.map((recruiter) => (
              <Card 
                key={recruiter.id}
                className={`p-6 rounded-2xl transition-all ${
                  recruiter.isMutualMatch 
                    ? 'bg-purple-50 border-2 border-purple-200 hover:shadow-lg' 
                    : 'bg-white/70 backdrop-blur-sm border border-gray-200 hover:shadow-md'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${recruiter.gradient} flex items-center justify-center text-2xl shadow-md`}>
                      {recruiter.logo}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-gray-900">{recruiter.company}</h3>
                        {recruiter.isMutualMatch && (
                          <CheckCircle2 className="w-4 h-4 text-purple-600" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{recruiter.position}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <MapPin className="w-3 h-3" />
                        {recruiter.location}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleSaveJob(recruiter.id)}
                    className={`transition-colors ${
                      savedJobs.includes(recruiter.id) ? 'text-red-500' : 'text-gray-300 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${savedJobs.includes(recruiter.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-300">
                    {recruiter.industry}
                  </Badge>
                  <Badge variant="outline" className={recruiter.match >= 90 ? 'bg-green-50 text-green-700 border-green-300' : 'bg-blue-50 text-blue-700 border-blue-300'}>
                    {recruiter.match}% Match
                  </Badge>
                  <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-300">
                    USS {recruiter.minUSS}+
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    {recruiter.rating}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {recruiter.applicants} applicants
                  </div>
                  <Button 
                    className={`rounded-xl ${
                      recruiter.isMutualMatch 
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                    onClick={() => handleApplyClick(recruiter.company, recruiter.position)}
                  >
                    {recruiter.isMutualMatch ? 'Connect Now' : 'View Details'}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <MobileNav currentPage="recruiters" onNavigate={onNavigate} userRole="student" />
      
      {selectedJob && (
        <JobApplicationDialog 
          open={showApplicationDialog} 
          onOpenChange={setShowApplicationDialog} 
          company={selectedJob.company}
          position={selectedJob.position}
          onSubmit={handleApplicationSubmit}
        />
      )}
    </div>
  );
}