import React, { useState, useEffect } from 'react';
import { Slider } from './ui/slider';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { recruiterAPI } from '../services/api';

export function RecruiterWeightSliders({ onNavigate, onLogout }) {
  const [weights, setWeights] = useState({
    academics: 20,
    skills: 30,
    projects: 25,
    experience: 15,
    achievements: 10,
    verificationBonus: 5
  });

  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCandidates();
  }, [weights]);

  const loadCandidates = async () => {
    try {
      setLoading(true);
      // First update weights, then get candidates
      await recruiterAPI.updateWeights(weights);
      const data = await recruiterAPI.getCandidates();
      setCandidates(data);
    } catch (error) {
      console.error('Error loading candidates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWeightChange = (key, value) => {
    setWeights(prev => ({
      ...prev,
      [key]: value[0]
    }));
  };

  const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Recruiter Dashboard</h1>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Weight Sliders */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Scoring Weights</CardTitle>
                <CardDescription>Customize how candidates are scored</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    { key: 'academics', label: 'Academics (CGPA)', icon: '📚' },
                    { key: 'skills', label: 'Skills & Assessments', icon: '💻' },
                    { key: 'projects', label: 'Projects & Portfolio', icon: '🚀' },
                    { key: 'experience', label: 'Experience & Internships', icon: '💼' },
                    { key: 'achievements', label: 'Achievements', icon: '🏆' },
                    { key: 'verificationBonus', label: 'Verification Bonus', icon: '✓' }
                  ].map(item => (
                    <div key={item.key}>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-medium text-gray-700">
                          {item.icon} {item.label}
                        </label>
                        <span className="text-lg font-bold text-purple-600">{weights[item.key]}</span>
                      </div>
                      <Slider
                        value={[weights[item.key]]}
                        onValueChange={(value) => handleWeightChange(item.key, value)}
                        min={0}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  ))}

                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-900">Total Weight</span>
                      <span className={`text-lg font-bold ${totalWeight === 100 ? 'text-green-600' : 'text-orange-600'}`}>
                        {totalWeight}%
                      </span>
                    </div>
                    {totalWeight !== 100 && (
                      <p className="text-sm text-orange-600 mt-2">Weights will be auto-normalized to sum to 100%</p>
                    )}
                  </div>

                  <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={loadCandidates} disabled={loading}>
                    {loading ? 'Updating...' : 'Apply Weights'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Ranked Candidates */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Candidates</CardTitle>
                <CardDescription>Ranked by your custom scoring preferences</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">Loading candidates...</div>
                ) : candidates.length > 0 ? (
                  <div className="space-y-4">
                    {candidates.slice(0, 10).map((candidate, i) => (
                      <div key={i} className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {candidate.userId?.firstName} {candidate.userId?.lastName}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {candidate.degree} • {candidate.branch}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-purple-600">
                              {Math.round(candidate.customUss?.score || candidate.uss?.score || 0)}
                            </div>
                            <p className="text-xs text-gray-500">USS Score</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-3">
                          {[
                            { label: 'CGPA', value: candidate.cgpa?.toFixed(1) },
                            { label: 'Skills', value: `${candidate.skills?.length || 0}` },
                            { label: 'Projects', value: `${candidate.projects?.length || 0}` },
                            { label: 'Internships', value: `${candidate.internships?.length || 0}` },
                            { label: 'Verified', value: `${candidate.uss?.verificationPercentage || 0}%` }
                          ].map((stat, j) => (
                            <div key={j} className="text-center p-2 bg-gray-50 rounded">
                              <p className="text-xs text-gray-600">{stat.label}</p>
                              <p className="font-semibold text-gray-900">{stat.value}</p>
                            </div>
                          ))}
                        </div>

                        <button
                          onClick={() => onNavigate('candidate-detail', candidate._id)}
                          className="text-sm text-purple-600 hover:text-purple-700 font-semibold"
                        >
                          View Details →
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-600">
                    No candidates found matching your filters
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
