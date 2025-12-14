import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { MessageSquare, X, Send, Sparkles, Loader2 } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatbotWidgetProps {
  userRole?: 'student' | 'recruiter' | 'faculty';
  userName?: string;
}

// API Configuration
const GEMINI_API_KEY = 'AIzaSyAUqRoAksjapMSMISGPll_aQucFjVEsAU8';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

// Mock user data for context
const mockStudentData = {
  name: 'Alex Johnson',
  email: 'alex.johnson@university.edu',
  studentId: 'STU-2024-001',
  ussScore: 88,
  gpa: 3.8,
  skills: ['React', 'Python', 'Machine Learning', 'Data Structures', 'Node.js', 'TypeScript', 'SQL'],
  projects: [
    { name: 'E-commerce Platform', tech: ['React', 'Node.js', 'MongoDB'], status: 'Completed' },
    { name: 'ML Price Predictor', tech: ['Python', 'TensorFlow', 'Pandas'], status: 'Completed' },
    { name: 'Campus Social Network', tech: ['React Native', 'Firebase'], status: 'In Progress' },
  ],
  achievements: ['Dean\'s List 2024', 'Hackathon Winner - Spring 2024', 'Published Research Paper', 'Google Code Jam Finalist'],
  profileCompleteness: 85,
  mutualMatches: [
    { company: 'Google', match: 95, position: 'Software Engineer Intern' },
    { company: 'Meta', match: 92, position: 'Frontend Developer' },
    { company: 'Apple', match: 90, position: 'ML Engineer Intern' },
  ],
  year: '3rd Year',
  major: 'Computer Science',
  university: 'State University',
  endorsements: 7,
  skillsNeeded: ['Cloud Computing (AWS)', 'Docker & Kubernetes', 'System Design', 'GraphQL'],
  coursesCompleted: ['Data Structures', 'Algorithms', 'Database Systems', 'Machine Learning', 'Web Development'],
  currentCourses: ['Distributed Systems', 'Computer Networks', 'AI & Deep Learning'],
};

const mockRecruiterData = {
  name: 'Sarah Mitchell',
  email: 'sarah.mitchell@techcorp.com',
  company: 'TechCorp',
  position: 'Senior Technical Recruiter',
  activeJobs: 5,
  candidatesViewed: 234,
  shortlisted: 12,
  interviews: 8,
  topMatches: [
    { name: 'Alex Johnson', match: 95, ussScore: 88, skills: ['React', 'Python', 'ML'] },
    { name: 'Emma Davis', match: 93, ussScore: 92, skills: ['Java', 'Spring', 'AWS'] },
    { name: 'Ryan Chen', match: 91, ussScore: 85, skills: ['React', 'Node.js', 'MongoDB'] },
  ],
  jobOpenings: ['Software Engineer', 'ML Engineer', 'Full Stack Developer', 'DevOps Engineer', 'Data Scientist'],
};

const mockFacultyData = {
  name: 'Dr. Robert Williams',
  email: 'r.williams@university.edu',
  department: 'Computer Science',
  position: 'Associate Professor',
  studentsAdvised: 45,
  coursesTeaching: ['Data Structures', 'Algorithms', 'Machine Learning'],
  averageClassPerformance: 82,
  researchAreas: ['Machine Learning', 'Natural Language Processing', 'Computer Vision'],
  publicationsCount: 23,
};

const quickSuggestions = [
  'How can I improve my USS score?',
  'What are my top recruiter matches?',
  'What skills should I learn next?',
  'How complete is my profile?',
];

export function ChatbotWidget({ userRole = 'student', userName }: ChatbotWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const conversationHistory = useRef<Array<{ role: string; content: string }>>([]);

  // Initialize chat with personalized greeting
  useEffect(() => {
    const userData = getUserData();
    const initialMessage: Message = {
      id: 1,
      text: `Hi ${userData.name}! 👋 I'm your Campus-Link AI Assistant. I have access to your complete profile and can help you with personalized guidance. How can I assist you today?`,
      sender: 'bot',
      timestamp: new Date(),
    };
    setMessages([initialMessage]);
  }, [userRole]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Get user data based on role
  const getUserData = () => {
    switch (userRole) {
      case 'student':
        return mockStudentData;
      case 'recruiter':
        return mockRecruiterData;
      case 'faculty':
        return mockFacultyData;
      default:
        return mockStudentData;
    }
  };

  // Create personalized system prompt with user context
  const getSystemPrompt = () => {
    const userData = getUserData();
    
    if (userRole === 'student') {
      const student = userData as typeof mockStudentData;
      return `You are an AI career advisor and academic assistant for Campus-Link, helping students succeed academically and professionally.

**USER PROFILE - ${student.name}:**

ACADEMIC INFORMATION:
- Student ID: ${student.studentId}
- Major: ${student.major}, ${student.year}
- University: ${student.university}
- GPA: ${student.gpa}/4.0
- USS Score: ${student.ussScore}/100 (Universal Student Score - measures overall performance, skills, and employability)

SKILLS & EXPERTISE:
Current Skills: ${student.skills.join(', ')}
Recommended Skills to Learn: ${student.skillsNeeded.join(', ')}

ACADEMIC PROGRESS:
Completed Courses: ${student.coursesCompleted.join(', ')}
Current Courses: ${student.currentCourses.join(', ')}

PROJECTS:
${student.projects.map(p => `- ${p.name} (${p.tech.join(', ')}) - ${p.status}`).join('\n')}

ACHIEVEMENTS:
${student.achievements.join(', ')}

PROFILE STATUS:
- Profile Completeness: ${student.profileCompleteness}%
- Endorsements: ${student.endorsements}

RECRUITER MATCHES:
${student.mutualMatches.map(m => `- ${m.company}: ${m.match}% match for ${m.position}`).join('\n')}

**YOUR ROLE:**
1. Provide specific, actionable advice using ${student.name}'s actual data
2. Help improve USS score by suggesting concrete steps based on current profile
3. Recommend skills that fill gaps and match with top recruiters
4. Guide on completing profile to 100%
5. Advise on career opportunities with matched companies
6. Give academic guidance based on current courses and performance
7. Be friendly, encouraging, and use emojis appropriately

**IMPORTANT:** 
- Always reference specific data points from ${student.name}'s profile
- Give practical, achievable recommendations
- Keep responses concise (3-5 sentences) but valuable
- Use the student's name occasionally to personalize responses`;
    } 
    
    else if (userRole === 'recruiter') {
      const recruiter = userData as typeof mockRecruiterData;
      return `You are an AI recruitment assistant for Campus-Link, helping recruiters find and connect with top talent.

**USER PROFILE - ${recruiter.name}:**

RECRUITER INFORMATION:
- Name: ${recruiter.name}
- Company: ${recruiter.company}
- Position: ${recruiter.position}
- Email: ${recruiter.email}

RECRUITMENT ACTIVITY:
- Active Job Postings: ${recruiter.activeJobs}
- Candidates Viewed: ${recruiter.candidatesViewed}
- Shortlisted Candidates: ${recruiter.shortlisted}
- Scheduled Interviews: ${recruiter.interviews}

JOB OPENINGS:
${recruiter.jobOpenings.join(', ')}

TOP CANDIDATE MATCHES:
${recruiter.topMatches.map(m => `- ${m.name}: ${m.match}% match, USS Score: ${m.ussScore}, Skills: ${m.skills.join(', ')}`).join('\n')}

**YOUR ROLE:**
1. Help find candidates matching specific requirements
2. Analyze candidate profiles and suggest best fits
3. Provide insights on candidate USS scores and qualifications
4. Recommend interview questions based on candidate skills
5. Advise on competitive recruitment strategies
6. Be professional and data-driven

Keep responses focused and actionable.`;
    } 
    
    else {
      const faculty = userData as typeof mockFacultyData;
      return `You are an AI academic assistant for Campus-Link, helping faculty with student management and academic insights.

**USER PROFILE - ${faculty.name}:**

FACULTY INFORMATION:
- Name: ${faculty.name}
- Position: ${faculty.position}
- Department: ${faculty.department}
- Email: ${faculty.email}

TEACHING & RESEARCH:
- Courses Teaching: ${faculty.coursesTeaching.join(', ')}
- Students Advised: ${faculty.studentsAdvised}
- Average Class Performance: ${faculty.averageClassPerformance}%
- Research Areas: ${faculty.researchAreas.join(', ')}
- Publications: ${faculty.publicationsCount}

**YOUR ROLE:**
1. Provide insights on student performance and engagement
2. Suggest teaching strategies and course improvements
3. Help identify students needing additional support
4. Advise on research collaborations and student projects
5. Be professional and data-oriented

Keep responses actionable and specific.`;
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const currentInput = inputValue;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: currentInput,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Build full context with system prompt and conversation history
      const systemPrompt = getSystemPrompt();
      const conversationContext = conversationHistory.current
        .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
        .join('\n\n');
      
      const fullPrompt = `${systemPrompt}

${conversationContext ? `Previous conversation:\n${conversationContext}\n\n` : ''}User: ${currentInput}`;

      console.log('Sending request to Gemini API...');
      console.log('Full Prompt:', fullPrompt);

      // Call Gemini API
      const response = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: {
            messages: [
              {
                role: 'system',
                content: fullPrompt,
              },
            ],
          },
        }),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('API Error:', errorData);
        throw new Error(`API returned ${response.status}: ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      console.log('API Response:', data);

      const botResponse = data.candidates[0]?.content?.parts[0]?.text || 'Sorry, I could not process that request.';

      // Update conversation history
      conversationHistory.current.push(
        { role: 'user', content: currentInput },
        { role: 'assistant', content: botResponse }
      );

      // Keep only last 10 messages in history to avoid token limits
      if (conversationHistory.current.length > 20) {
        conversationHistory.current = conversationHistory.current.slice(-20);
      }

      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      
      // Fallback response with more details
      const botMessage: Message = {
        id: messages.length + 2,
        text: `I apologize, but I'm having trouble connecting to the AI service right now. Error: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again in a moment. 😊`,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickSuggestion = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const userData = getUserData();

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 lg:bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-110 flex items-center justify-center z-50 group"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></span>
          
          {/* Tooltip */}
          <div className="absolute right-16 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Ask me anything, {userData.name}!
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-20 lg:bottom-6 right-6 w-[calc(100vw-3rem)] sm:w-96 h-[500px] rounded-3xl shadow-2xl border-2 border-gray-200 z-50 flex flex-col bg-white overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium">Campus-Link AI</h3>
                <p className="text-xs text-blue-100">Online • Personalized for you</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 hover:bg-white/20 rounded-lg transition-colors flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-br from-gray-50 to-blue-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {message.sender === 'bot' && (
                  <Avatar className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 flex-shrink-0">
                    <AvatarFallback className="bg-transparent text-white text-xs">AI</AvatarFallback>
                  </Avatar>
                )}
                {message.sender === 'user' && (
                  <Avatar className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 flex-shrink-0">
                    <AvatarFallback className="bg-transparent text-white text-xs">
                      {userData.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-sm'
                      : 'bg-white border border-gray-200 text-gray-900 rounded-tl-sm'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex gap-2">
                <Avatar className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 flex-shrink-0">
                  <AvatarFallback className="bg-transparent text-white text-xs">AI</AvatarFallback>
                </Avatar>
                <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-tl-sm">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                    <span className="text-xs text-gray-500">Thinking...</span>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Suggestions (show only initially) */}
            {messages.length <= 1 && !isLoading && (
              <div className="space-y-2">
                <p className="text-xs text-gray-500 text-center">Quick suggestions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickSuggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickSuggestion(suggestion)}
                      className="px-3 py-2 bg-white border border-blue-200 text-blue-700 rounded-xl text-xs hover:bg-blue-50 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder={`Ask me anything, ${userData.name.split(' ')[0]}...`}
                disabled={isLoading}
                className="flex-1 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
              <Button
                onClick={handleSend}
                disabled={isLoading || !inputValue.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
}