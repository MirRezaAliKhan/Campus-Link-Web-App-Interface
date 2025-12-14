import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { GraduationCap, Users, BookOpen } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import logoImage from 'figma:asset/a0fae53220a0559f5a6b46d7beefdf1fb301528a.png';

type UserRole = 'student' | 'recruiter' | 'faculty';

interface LoginPageProps {
  onLogin: (role: UserRole) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(selectedRole);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-12 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1758270705317-3ef6142d306f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGNvbGxhYm9yYXRpb24lMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2MjM5NTM3OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Students collaborating"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 text-white text-center max-w-lg">
          <div className="mb-8">
            <img 
              src={logoImage} 
              alt="Campus-Link Logo" 
              className="w-24 h-24 mx-auto mb-6"
            />
          </div>
          <h1 className="text-5xl mb-4">Campus-Link</h1>
          <p className="text-xl text-blue-100">
            Bridging the gap between talent and opportunity through AI-driven analytics and smart matching.
          </p>
          <div className="mt-12 grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">10K+</div>
              <div className="text-sm text-blue-200">Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">500+</div>
              <div className="text-sm text-blue-200">Recruiters</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">200+</div>
              <div className="text-sm text-blue-200">Universities</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <img 
              src={logoImage} 
              alt="Campus-Link Logo" 
              className="w-20 h-20 mx-auto mb-4"
            />
            <h1 className="text-3xl text-gray-900 mb-2">Campus-Link</h1>
            <p className="text-gray-600">Connect. Learn. Grow.</p>
          </div>

          <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50">
            <h2 className="text-2xl text-gray-900 mb-2">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-gray-600 mb-6">
              {isSignUp ? 'Join the Campus-Link community' : 'Sign in to continue'}
            </p>

            {/* Role Selection */}
            <div className="mb-6">
              <Label className="text-gray-700 mb-3 block">Login as</Label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedRole('student')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedRole === 'student'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <GraduationCap className={`w-6 h-6 mx-auto mb-2 ${selectedRole === 'student' ? 'text-blue-600' : 'text-gray-400'}`} />
                  <div className={`text-xs ${selectedRole === 'student' ? 'text-blue-700' : 'text-gray-600'}`}>
                    Student
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole('recruiter')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedRole === 'recruiter'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <Users className={`w-6 h-6 mx-auto mb-2 ${selectedRole === 'recruiter' ? 'text-blue-600' : 'text-gray-400'}`} />
                  <div className={`text-xs ${selectedRole === 'recruiter' ? 'text-blue-700' : 'text-gray-600'}`}>
                    Recruiter
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole('faculty')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedRole === 'faculty'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <BookOpen className={`w-6 h-6 mx-auto mb-2 ${selectedRole === 'faculty' ? 'text-blue-600' : 'text-gray-400'}`} />
                  <div className={`text-xs ${selectedRole === 'faculty' ? 'text-blue-700' : 'text-gray-600'}`}>
                    Faculty
                  </div>
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-gray-700">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 bg-white/80 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-gray-700">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 bg-white/80 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                  required
                />
              </div>

              {!isSignUp && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center text-gray-600">
                    <input type="checkbox" className="mr-2 rounded" />
                    Remember me
                  </label>
                  <a href="#" className="text-blue-600 hover:text-blue-700">
                    Forgot password?
                  </a>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl py-6 transition-all transform hover:scale-[1.02]"
              >
                {isSignUp ? 'Sign Up' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                <span className="text-blue-600">
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </span>
              </button>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            By continuing, you agree to Campus-Link's Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}