require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../src/models/User');
const StudentProfile = require('../src/models/StudentProfile');
const RecruiterProfile = require('../src/models/RecruiterProfile');
const USSCalculator = require('../src/utils/USSCalculator');

const calculator = new USSCalculator();

async function seedData() {
  try {
    // Connect to DB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await StudentProfile.deleteMany({});
    await RecruiterProfile.deleteMany({});
    console.log('Cleared existing data');

    // ===== DEMO STUDENTS =====
    // Student 1: High CGPA, low projects (traditional top performer)
    const student1User = await User.create({
      email: 'student1@example.com',
      password: 'password123',
      firstName: 'Arjun',
      lastName: 'Kumar',
      role: 'student'
    });

    const student1Profile = await StudentProfile.create({
      userId: student1User._id,
      university: 'IIT Delhi',
      degree: 'B.Tech',
      branch: 'Computer Science',
      currentYear: 4,
      cgpa: 9.2,
      about: 'Dedicated engineer with focus on academics',
      skills: [
        { name: 'Java', proficiency: 95, verified: true },
        { name: 'Python', proficiency: 88, verified: false },
        { name: 'Data Structures', proficiency: 92, verified: false }
      ],
      projects: [
        {
          title: 'Library Management System',
          description: 'A simple CRUD application',
          technologies: ['Java', 'MySQL'],
          verified: false
        }
      ],
      internships: [],
      achievements: [
        {
          title: 'Dean\'s List',
          description: 'Achieved high academic performance',
          verified: true
        }
      ]
    });

    const uss1 = calculator.calculateUSS({
      cgpa: student1Profile.cgpa,
      skills: student1Profile.skills,
      projects: student1Profile.projects,
      internships: student1Profile.internships,
      achievements: student1Profile.achievements
    });

    student1Profile.uss = { ...uss1, lastCalculated: new Date() };
    await student1Profile.save();

    console.log('Student 1 created: Arjun Kumar (High CGPA, Low Projects)');
    console.log('USS Score:', student1Profile.uss.score);

    // Student 2: Lower CGPA, strong projects & experience (skill-focused)
    const student2User = await User.create({
      email: 'student2@example.com',
      password: 'password123',
      firstName: 'Priya',
      lastName: 'Singh',
      role: 'student'
    });

    const student2Profile = await StudentProfile.create({
      userId: student2User._id,
      university: 'BITS Pilani',
      degree: 'B.Tech',
      branch: 'Electronics',
      currentYear: 4,
      cgpa: 7.5,
      about: 'Full-stack developer with real-world experience',
      githubUsername: 'priyasingh',
      linkedinUrl: 'https://linkedin.com/in/priyasingh',
      portfolioUrl: 'https://priyasingh.dev',
      skills: [
        { name: 'JavaScript', proficiency: 95, verified: true },
        { name: 'React', proficiency: 92, verified: true },
        { name: 'Node.js', proficiency: 90, verified: false },
        { name: 'MongoDB', proficiency: 88, verified: false },
        { name: 'DevOps', proficiency: 75, verified: false }
      ],
      projects: [
        {
          title: 'CourseHub - Online Learning Platform',
          description: 'Full-stack application for online courses with 5K+ users',
          technologies: ['React', 'Node.js', 'MongoDB', 'AWS'],
          link: 'https://coursehub.io',
          githubLink: 'https://github.com/priyasingh/coursehub',
          verified: true
        },
        {
          title: 'AI-Powered Chat Application',
          description: 'Real-time chat with NLP features',
          technologies: ['React', 'Socket.io', 'Python', 'TensorFlow'],
          githubLink: 'https://github.com/priyasingh/ai-chat',
          verified: true
        },
        {
          title: 'E-Commerce Platform',
          description: 'Scalable e-commerce backend',
          technologies: ['Node.js', 'Express', 'PostgreSQL'],
          githubLink: 'https://github.com/priyasingh/ecommerce',
          verified: true
        }
      ],
      internships: [
        {
          company: 'TechStartup XYZ',
          position: 'Full-Stack Developer Intern',
          duration: '3 months',
          description: 'Built React dashboard and REST APIs',
          verified: true
        },
        {
          company: 'CloudTech Solutions',
          position: 'Backend Developer Intern',
          duration: '2 months',
          description: 'Developed microservices architecture',
          verified: true
        }
      ],
      achievements: [
        {
          title: 'Hackathon Winner - TechFest 2024',
          description: 'Won first prize in national hackathon',
          verified: true
        },
        {
          title: 'Open Source Contributor',
          description: '50+ pull requests merged',
          verified: false
        }
      ]
    });

    const uss2 = calculator.calculateUSS({
      cgpa: student2Profile.cgpa,
      skills: student2Profile.skills,
      projects: student2Profile.projects,
      internships: student2Profile.internships,
      achievements: student2Profile.achievements
    });

    student2Profile.uss = { ...uss2, lastCalculated: new Date() };
    await student2Profile.save();

    console.log('Student 2 created: Priya Singh (Lower CGPA, Strong Projects)');
    console.log('USS Score:', student2Profile.uss.score);

    // Student 3: Average CGPA, moderate projects (balanced)
    const student3User = await User.create({
      email: 'student3@example.com',
      password: 'password123',
      firstName: 'Rohit',
      lastName: 'Patel',
      role: 'student'
    });

    const student3Profile = await StudentProfile.create({
      userId: student3User._id,
      university: 'NIT Bangalore',
      degree: 'B.Tech',
      branch: 'Information Technology',
      currentYear: 4,
      cgpa: 8.0,
      about: 'Aspiring software engineer',
      skills: [
        { name: 'Python', proficiency: 85, verified: true },
        { name: 'C++', proficiency: 80, verified: false },
        { name: 'SQL', proficiency: 82, verified: false }
      ],
      projects: [
        {
          title: 'Todo Application',
          description: 'MERN stack todo app',
          technologies: ['React', 'Express', 'Node.js'],
          githubLink: 'https://github.com/rohitpatel/todo-app',
          verified: false
        }
      ],
      internships: [
        {
          company: 'Tech Company ABC',
          position: 'Junior Developer',
          duration: '2 months',
          description: 'Worked on bug fixes and feature development',
          verified: false
        }
      ],
      achievements: []
    });

    const uss3 = calculator.calculateUSS({
      cgpa: student3Profile.cgpa,
      skills: student3Profile.skills,
      projects: student3Profile.projects,
      internships: student3Profile.internships,
      achievements: student3Profile.achievements
    });

    student3Profile.uss = { ...uss3, lastCalculated: new Date() };
    await student3Profile.save();

    console.log('Student 3 created: Rohit Patel (Balanced Profile)');
    console.log('USS Score:', student3Profile.uss.score);

    // ===== DEMO RECRUITERS =====
    // Recruiter 1: Tech Company (Focus on skills & projects)
    const recruiter1User = await User.create({
      email: 'recruiter1@google.com',
      password: 'password123',
      firstName: 'Sarah',
      lastName: 'Johnson',
      role: 'recruiter'
    });

    await RecruiterProfile.create({
      userId: recruiter1User._id,
      companyName: 'Google',
      industry: 'Technology',
      companySize: 'enterprise',
      location: 'Mountain View, CA',
      companyWebsite: 'https://google.com',
      description: 'Leading search and advertising company',
      scoringWeights: {
        academics: 15,
        skills: 40,
        projects: 30,
        experience: 10,
        achievements: 5,
        verificationBonus: 10
      },
      filterPreferences: {
        minimumUssScore: 70,
        minimumCgpa: 7.0,
        preferredSkills: ['JavaScript', 'React', 'Python', 'System Design'],
        verifiedOnly: false,
        preferredBranches: ['Computer Science', 'IT'],
        preferredYears: [4]
      },
      hiringRoles: [
        {
          title: 'Software Engineer - Backend',
          description: 'Build scalable backend systems',
          requiredSkills: ['Python', 'Go', 'System Design'],
          minimumUss: 75,
          salary: '$120K-$180K',
          location: 'Mountain View, CA',
          positions: 5
        }
      ]
    });

    console.log('Recruiter 1 created: Google');

    // Recruiter 2: Startup (Focus on CGPA & balanced)
   const recruiter2User = await User.create({
      email: 'recruiter@startup.com',
      password: 'password123',
      firstName: 'Mike',
      lastName: 'Chen',
      role: 'recruiter'
    });

    await RecruiterProfile.create({
      userId: recruiter2User._id,
      companyName: 'TechStartup Inc',
      industry: 'SaaS',
      companySize: 'small',
      location: 'Bangalore, India',
      description: 'Growing SaaS startup',
      scoringWeights: {
        academics: 20,
        skills: 25,
        projects: 30,
        experience: 15,
        achievements: 10,
        verificationBonus: 5
      },
      filterPreferences: {
        minimumUssScore: 65,
        minimumCgpa: 6.5,
        preferredSkills: ['JavaScript', 'React', 'Node.js'],
        verifiedOnly: false,
        preferredBranches: [],
        preferredYears: [4]
      },
      hiringRoles: [
        {
          title: 'Full Stack Developer',
          description: 'Build our SaaS platform',
          requiredSkills: ['React', 'Node.js', 'MongoDB'],
          minimumUss: 65,
          salary: '₹15L-₹25L',
          location: 'Bangalore, India',
          positions: 3
        }
      ]
    });

    console.log('Recruiter 2 created: TechStartup Inc');

    console.log('\n========================================');
    console.log('Seeding completed successfully!');
    console.log('========================================');
    console.log('Demo Accounts:');
    console.log('Student 1: student1@example.com / password123');
    console.log('Student 2: student2@example.com / password123');
    console.log('Student 3: student3@example.com / password123');
    console.log('Recruiter 1: recruiter1@google.com / password123');
    console.log('Recruiter 2: recruiter@startup.com / password123');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

seedData();
