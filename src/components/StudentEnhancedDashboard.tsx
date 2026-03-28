import React, { useEffect, useState } from 'react';
import { TrendingUp, AlertCircle, CheckCircle2, Zap, BookOpen } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { studentAPI } from '../services/api';

export function StudentEnhancedDashboard({ onNavigate, onLogout }) {
  const [profile, setProfile] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const [profileData, suggestionsData] = await Promise.all([
        studentAPI.getProfile(),
        studentAPI.getUssSuggestions()
      ]);
      
      setProfile(profileData);
      setSuggestions(suggestionsData.suggestions || []);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !profile) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  const { uss = {} } = profile;
  const { breakdown = {} } = uss;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Welcome, {profile.userId?.firstName}!
          </h1>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {/* USS Score Card */}
        <Card className="mb-8 bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0">
          <CardHeader>
            <CardTitle>Your Universal Standard Score (USS)</CardTitle>
            <CardDescription className="text-purple-100">
              Composite score based on academics, skills, projects & experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Main Score */}
              <div className="flex flex-col items-center justify-center">
                <div className="text-6xl font-bold mb-2">{Math.round(uss.score || 0)}</div>
                <p className="text-lg text-purple-50">Overall USS</p>
                <div className="mt-4 text-sm text-purple-100">
                  Confidence: <span className="font-semibold">{uss.confidence || 0}%</span>
                </div>
              </div>

              {/* Verification */}
              <div className="flex flex-col items-center justify-center">
                <div className="text-5xl font-bold mb-2">{uss.verificationPercentage || 0}%</div>
                <p className="text-lg text-purple-50">Verified Data</p>
                <div className="mt-4 text-sm text-purple-100">
                  Complete your assessments to boost verification
                </div>
              </div>

              {/* Status */}
              <div className="flex flex-col items-center justify-center">
                <CheckCircle2 className="w-12 h-12 mb-2" />
                <p className="text-lg text-purple-50">Profile Status</p>
                <div className="mt-4 text-sm text-purple-100">
                  Your profile is {profile.internships?.length > 0 ? 'strong' : 'good'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Score Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {[
            { label: 'Academics', value: breakdown.academicsScore, icon: '📚', color: 'from-yellow-400 to-yellow-600' },
            { label: 'Skills', value: breakdown.skillsScore, icon: '💻', color: 'from-green-400 to-green-600' },
            { label: 'Projects', value: breakdown.projectsScore, icon: '🚀', color: 'from-blue-400 to-blue-600' },
            { label: 'Experience', value: breakdown.experienceScore, icon: '💼', color: 'from-purple-400 to-purple-600' },
            { label: 'Achievements', value: breakdown.achievementsScore, icon: '🏆', color: 'from-pink-400 to-pink-600' }
          ].map((item, i) => (
            <Card key={i} className={`bg-gradient-to-br ${item.color} text-white`}>
              <CardContent className="p-6">
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="text-3xl font-bold mb-2">{Math.round(item.value || 0)}</div>
                <p className="text-sm opacity-90">{item.label}</p>
                <Progress value={item.value || 0} className="mt-3 bg-white/30" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Improvement Suggestions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              How to Boost Your USS Score
            </CardTitle>
            <CardDescription>
              Follow these personalized recommendations to increase your score and visibility
            </CardDescription>
          </CardHeader>
          <CardContent>
            {suggestions.length > 0 ? (
              <div className="space-y-4">
                {suggestions.map((suggestion, i) => (
                  <Alert key={i} className="border-l-4 border-blue-500">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      <div className="font-semibold text-gray-900 mb-1">{suggestion.category}</div>
                      <p className="text-gray-700 text-sm mb-2">{suggestion.suggestion}</p>
                      <div className="text-xs text-gray-600">
                        Impact: <span className="font-semibold text-red-600">{suggestion.impact}</span>
                      </div>
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">Your profile is looking great! Keep improving to unlock new opportunities.</p>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { 
              icon: BookOpen, 
              title: 'Take Skill Assessment', 
              description: 'Verify your skills to boost USS score',
              action: 'Start Assessment'
            },
            { 
              icon: TrendingUp, 
              title: 'Add Project', 
              description: 'Showcase your portfolio and increase visibility',
              action: 'Add Project'
            },
            { 
              icon: CheckCircle2, 
              title: 'Browse Jobs', 
              description: 'See matches based on your USS score',
              action: 'Explore Roles'
            }
          ].map((item, i) => (
            <Card key={i} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <item.icon className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                <button className="text-blue-600 text-sm font-semibold hover:text-blue-700">
                  {item.action} →
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
