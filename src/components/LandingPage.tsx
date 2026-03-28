import React, { useState } from 'react';
import { ArrowRight, TrendingUp, Shield, Zap, BarChart3, Users, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';

export function LandingPage({ onGetStarted }) {
  const [activeTab, setActiveTab] = useState('comparison');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            Campus-Link
          </div>
          <Button 
            onClick={() => onGetStarted('student')}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center space-y-8">
          <h1 className="text-6xl md:text-7xl font-bold leading-tight">
            Beyond CGPA:<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
              Smarter, Fairer Placements
            </span>
          </h1>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover how AI-powered Universal Standard Scoring (USS) is revolutionizing campus recruitment. 
            Replacements based on skills, projects, and verified data—not just CGPA.
          </p>

          <div className="flex gap-4 justify-center pt-8">
            <Button
              onClick={() => onGetStarted('student')}
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg px-8"
            >
              Student Login <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              onClick={() => onGetStarted('recruiter')}
              variant="outline"
              size="lg"
              className="border-purple-400 text-purple-400 hover:bg-purple-500/10 text-lg px-8"
            >
              Recruiter Login <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="mt-16 rounded-2xl overflow-hidden bg-gradient-to-b from-purple-500/20 to-transparent p-1">
          <div className="bg-slate-800 rounded-xl p-8 backdrop-blur-sm">
            <div className="grid grid-cols-3 gap-6">
              {[
                { icon: BarChart3, label: 'Real-time Analytics' },
                { icon: TrendingUp, label: 'Skill-based Scoring' },
                { icon: Shield, label: 'Verified Data' }
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-lg bg-slate-700/50 border border-purple-500/20 text-center">
                  <item.icon className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                  <p className="text-sm text-gray-300">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-16">Why Campus-Link?</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Zap,
              title: 'Adaptive Scoring',
              description: 'USS algorithm adjusts weights based on recruiter preferences and verified data'
            },
            {
              icon: Users,
              title: 'Skill-First Matching',
              description: 'Discover talent beyond CGPA—students excelling in real-world projects get recognized'
            },
            {
              icon: TrendingUp,
              title: 'Transparent Metrics',
              description: 'Clear breakdown of scores with personalized suggestions for improvement'
            }
          ].map((feature, i) => (
            <div key={i} className="p-8 rounded-xl bg-slate-800/50 border border-purple-500/20 hover:border-purple-500/50 transition-all">
              <feature.icon className="w-10 h-10 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-8">Traditional vs. Campus-Link</h2>

        <div className="bg-slate-800/50 rounded-xl border border-purple-500/20 overflow-hidden">
          <div className="grid grid-cols-2 divide-x divide-purple-500/20">
            {/* Traditional */}
            <div className="p-8">
              <h3 className="text-xl font-semibold mb-6 text-red-400">❌ Traditional Systems</h3>
              <ul className="space-y-4">
                {[
                  'CGPA-only shortlisting',
                  'No skill verification',
                  'Projects largely ignored',
                  'Limited recruiter customization',
                  'One-size-fits-all rankings',
                  'No transparency'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <span className="text-red-400 mt-1">✗</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Campus-Link */}
            <div className="p-8 bg-gradient-to-br from-purple-500/10 to-pink-500/10">
              <h3 className="text-xl font-semibold mb-6 text-green-400">✓ Campus-Link</h3>
              <ul className="space-y-4">
                {[
                  'Multi-factor USS scoring',
                  'Skill assessment integration',
                  'Projects weighted 25-30%',
                  'Full recruiter customization',
                  'Dynamic personalized rankings',
                  'Complete score breakdown'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-400 mt-8 text-sm">
          Result: Students with strong portfolios get discovered. Recruiters find perfect skill matches instantly.
        </p>
      </section>

      {/* USS Breakdown Example */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-16">USS Score Breakdown</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Example 1: Priya Singh */}
          <div className="p-8 rounded-xl bg-gradient-to-br from-purple-500/20 to-transparent border border-purple-500/30">
            <h3 className="text-2xl font-bold mb-2">Priya Singh</h3>
            <p className="text-sm text-gray-400 mb-6">Lower CGPA, Strong Portfolio</p>

            <div className="space-y-4 mb-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-300">Academics (CGPA: 7.5)</span>
                  <span className="text-lg font-semibold">75/100</span>
                </div>
                <div className="bg-slate-700/50 rounded-full h-2 overflow-hidden">
                  <div className="bg-yellow-500 h-full" style={{ width: '75%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-300">Skills (5 skills, 3 verified)</span>
                  <span className="text-lg font-semibold">92/100</span>
                </div>
                <div className="bg-slate-700/50 rounded-full h-2 overflow-hidden">
                  <div className="bg-green-500 h-full" style={{ width: '92%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-300">Projects (3 live projects)</span>
                  <span className="text-lg font-semibold">88/100</span>
                </div>
                <div className="bg-slate-700/50 rounded-full h-2 overflow-hidden">
                  <div className="bg-blue-500 h-full" style={{ width: '88%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-300">Experience (2 internships)</span>
                  <span className="text-lg font-semibold">85/100</span>
                </div>
                <div className="bg-slate-700/50 rounded-full h-2 overflow-hidden">
                  <div className="bg-purple-500 h-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-purple-500/20">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total USS</span>
                <span className="text-4xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                  85.4
                </span>
              </div>
              <p className="text-sm text-gray-400 mt-2">Confidence: 92%</p>
            </div>
          </div>

          {/* Example 2: Arjun Kumar */}
          <div className="p-8 rounded-xl bg-gradient-to-br from-amber-500/20 to-transparent border border-amber-500/30">
            <h3 className="text-2xl font-bold mb-2">Arjun Kumar</h3>
            <p className="text-sm text-gray-400 mb-6">High CGPA, Limited Portfolio</p>

            <div className="space-y-4 mb-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-300">Academics (CGPA: 9.2)</span>
                  <span className="text-lg font-semibold">92/100</span>
                </div>
                <div className="bg-slate-700/50 rounded-full h-2 overflow-hidden">
                  <div className="bg-yellow-500 h-full" style={{ width: '92%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-300">Skills (3 skills, 1 verified)</span>
                  <span className="text-lg font-semibold">65/100</span>
                </div>
                <div className="bg-slate-700/50 rounded-full h-2 overflow-hidden">
                  <div className="bg-green-500 h-full" style={{ width: '65%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-300">Projects (1 basic project)</span>
                  <span className="text-lg font-semibold">35/100</span>
                </div>
                <div className="bg-slate-700/50 rounded-full h-2 overflow-hidden">
                  <div className="bg-blue-500 h-full" style={{ width: '35%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-300">Experience (No internships)</span>
                  <span className="text-lg font-semibold">30/100</span>
                </div>
                <div className="bg-slate-700/50 rounded-full h-2 overflow-hidden">
                  <div className="bg-purple-500 h-full" style={{ width: '30%' }}></div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-amber-500/20">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total USS</span>
                <span className="text-4xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-400">
                  72.1
                </span>
              </div>
              <p className="text-sm text-gray-400 mt-2">Confidence: 65%</p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-slate-800/50 border border-purple-500/20 rounded-lg p-6 text-center">
          <p className="text-gray-300">
            <strong>Key Insight:</strong> Priya scores higher overall despite lower CGPA because her verified skills, 
            real-world projects, and internships demonstrate applied expertise. Traditional systems would rank Arjun first.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/50 rounded-2xl p-12">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Career?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of students getting discovered for their real skills and startups finding the best talent.
          </p>
          <Button
            onClick={() => onGetStarted('student')}
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg px-8"
          >
            Get Started Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-500/20 mt-20 py-8 text-center text-gray-400">
        <p>&copy; 2024 Campus-Link. Beyond CGPA, Smarter Placements.</p>
      </footer>
    </div>
  );
}
