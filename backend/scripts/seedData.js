require('dotenv').config();
const prisma = require('../src/config/prismaClient');
const bcrypt = require('bcryptjs');
const USSCalculator = require('../src/utils/USSCalculator');

const calculator = new USSCalculator();

async function seedData() {
  try {
    console.log('Using SQLite with Prisma for database seeding');

    await prisma.application.deleteMany();
    await prisma.studentProfile.deleteMany();
    await prisma.recruiterProfile.deleteMany();
    await prisma.user.deleteMany();

    const student1 = await prisma.user.create({
      data: {
        email: 'student1@example.com',
        password: await bcrypt.hash('password123', 10),
        firstName: 'Arjun',
        lastName: 'Kumar',
        role: 'student',
      },
    });

    const student1Skills = [
      { name: 'Java', proficiency: 95, verified: true },
      { name: 'Python', proficiency: 88, verified: false },
      { name: 'Data Structures', proficiency: 92, verified: false },
    ];
    const student1Projects = [
      { title: 'Library Management System', description: 'A simple CRUD application', technologies: ['Java', 'MySQL'], verified: false },
    ];

    const student1Profile = await prisma.studentProfile.create({
      data: {
        userId: student1.id,
        university: 'IIT Delhi',
        degree: 'B.Tech',
        branch: 'Computer Science',
        currentYear: 4,
        cgpa: 9.2,
        about: 'Dedicated engineer with focus on academics',
        skills: JSON.stringify(student1Skills),
        projects: JSON.stringify(student1Projects),
        internships: JSON.stringify([]),
        achievements: JSON.stringify([{ title: 'Dean\'s List', description: 'Achieved high academic performance', verified: true }]),
        uss: JSON.stringify({}),
      },
    });

    const uss1 = calculator.calculateUSS({
      cgpa: student1Profile.cgpa,
      skills: student1Skills,
      projects: student1Projects,
      internships: [],
      achievements: [{ title: 'Dean\'s List', description: 'Achieved high academic performance', verified: true }],
    });

    await prisma.studentProfile.update({
      where: { id: student1Profile.id },
      data: { uss: JSON.stringify({ ...uss1, lastCalculated: new Date().toISOString() }) },
    });

    const student2 = await prisma.user.create({
      data: {
        email: 'student2@example.com',
        password: await bcrypt.hash('password123', 10),
        firstName: 'Priya',
        lastName: 'Singh',
        role: 'student',
      },
    });

    const student2Skills = [
      { name: 'JavaScript', proficiency: 95, verified: true },
      { name: 'React', proficiency: 92, verified: true },
      { name: 'Node.js', proficiency: 90, verified: false },
      { name: 'MongoDB', proficiency: 88, verified: false },
      { name: 'DevOps', proficiency: 75, verified: false },
    ];
    const student2Projects = [
      { title: 'CourseHub - Online Learning Platform', description: 'Full-stack application for online courses with 5K+ users', technologies: ['React', 'Node.js', 'MongoDB', 'AWS'], link: 'https://coursehub.io', githubLink: 'https://github.com/priyasingh/coursehub', verified: true },
      { title: 'AI-Powered Chat Application', description: 'Real-time chat with NLP features', technologies: ['React', 'Socket.io', 'Python', 'TensorFlow'], githubLink: 'https://github.com/priyasingh/ai-chat', verified: true },
      { title: 'E-Commerce Platform', description: 'Scalable e-commerce backend', technologies: ['Node.js', 'Express', 'PostgreSQL'], githubLink: 'https://github.com/priyasingh/ecommerce', verified: true },
    ];
    const student2Internships = [
      { company: 'TechStartup XYZ', position: 'Full-Stack Developer Intern', duration: '3 months', description: 'Built React dashboard and REST APIs', verified: true },
      { company: 'CloudTech Solutions', position: 'Backend Developer Intern', duration: '2 months', description: 'Developed microservices architecture', verified: true },
    ];
    const student2Achievements = [
      { title: 'Hackathon Winner - TechFest 2024', description: 'Won first prize in national hackathon', verified: true },
      { title: 'Open Source Contributor', description: '50+ pull requests merged', verified: false },
    ];

    const student2Profile = await prisma.studentProfile.create({
      data: {
        userId: student2.id,
        university: 'BITS Pilani',
        degree: 'B.Tech',
        branch: 'Electronics',
        currentYear: 4,
        cgpa: 7.5,
        about: 'Full-stack developer with real-world experience',
        githubUsername: 'priyasingh',
        linkedinUrl: 'https://linkedin.com/in/priyasingh',
        portfolioUrl: 'https://priyasingh.dev',
        skills: JSON.stringify(student2Skills),
        projects: JSON.stringify(student2Projects),
        internships: JSON.stringify(student2Internships),
        achievements: JSON.stringify(student2Achievements),
        uss: JSON.stringify({}),
      },
    });

    const uss2 = calculator.calculateUSS({
      cgpa: student2Profile.cgpa,
      skills: student2Skills,
      projects: student2Projects,
      internships: student2Internships,
      achievements: student2Achievements,
    });

    await prisma.studentProfile.update({
      where: { id: student2Profile.id },
      data: { uss: JSON.stringify({ ...uss2, lastCalculated: new Date().toISOString() }) },
    });

    const student3 = await prisma.user.create({
      data: {
        email: 'student3@example.com',
        password: await bcrypt.hash('password123', 10),
        firstName: 'Rohit',
        lastName: 'Patel',
        role: 'student',
      },
    });

    const student3Skills = [
      { name: 'Python', proficiency: 85, verified: true },
      { name: 'C++', proficiency: 80, verified: false },
      { name: 'SQL', proficiency: 82, verified: false },
    ];
    const student3Projects = [
      { title: 'Todo Application', description: 'MERN stack todo app', technologies: ['React', 'Express', 'Node.js'], githubLink: 'https://github.com/rohitpatel/todo-app', verified: false },
    ];
    const student3Internships = [{ company: 'Tech Company ABC', position: 'Junior Developer', duration: '2 months', description: 'Worked on bug fixes and feature development', verified: false }];

    const student3Profile = await prisma.studentProfile.create({
      data: {
        userId: student3.id,
        university: 'NIT Bangalore',
        degree: 'B.Tech',
        branch: 'Information Technology',
        currentYear: 4,
        cgpa: 8.0,
        about: 'Aspiring software engineer',
        skills: JSON.stringify(student3Skills),
        projects: JSON.stringify(student3Projects),
        internships: JSON.stringify(student3Internships),
        achievements: JSON.stringify([]),
        uss: JSON.stringify({}),
      },
    });

    const uss3 = calculator.calculateUSS({
      cgpa: student3Profile.cgpa,
      skills: student3Skills,
      projects: student3Projects,
      internships: student3Internships,
      achievements: [],
    });

    await prisma.studentProfile.update({
      where: { id: student3Profile.id },
      data: { uss: JSON.stringify({ ...uss3, lastCalculated: new Date().toISOString() }) },
    });

    const recruiter1 = await prisma.user.create({
      data: {
        email: 'recruiter1@google.com',
        password: await bcrypt.hash('password123', 10),
        firstName: 'Sarah',
        lastName: 'Johnson',
        role: 'recruiter',
      },
    });

    await prisma.recruiterProfile.create({
      data: {
        userId: recruiter1.id,
        companyName: 'Google',
        industry: 'Technology',
        companySize: 'enterprise',
        location: 'Mountain View, CA',
        companyWebsite: 'https://google.com',
        description: 'Leading search and advertising company',
        scoringWeights: JSON.stringify({ academics: 15, skills: 40, projects: 30, experience: 10, achievements: 5, verificationBonus: 10 }),
        filterPreferences: JSON.stringify({ minimumUssScore: 70, minimumCgpa: 7.0, preferredSkills: ['JavaScript', 'React', 'Python', 'System Design'], verifiedOnly: false, preferredBranches: ['Computer Science', 'IT'], preferredYears: [4] }),
        viewedCandidates: JSON.stringify([]),
        hiringRoles: JSON.stringify([{ title: 'Software Engineer - Backend', description: 'Build scalable backend systems', requiredSkills: ['Python', 'Go', 'System Design'], minimumUss: 75, salary: '$120K-$180K', location: 'Mountain View, CA', positions: 5 }]),
      },
    });

    const recruiter2 = await prisma.user.create({
      data: {
        email: 'recruiter@startup.com',
        password: await bcrypt.hash('password123', 10),
        firstName: 'Ravi',
        lastName: 'Sharma',
        role: 'recruiter',
      },
    });

    await prisma.recruiterProfile.create({
      data: {
        userId: recruiter2.id,
        companyName: 'InnovateX',
        industry: 'Startup',
        companySize: 'small',
        location: 'Bengaluru, India',
        companyWebsite: 'https://innovatex.com',
        description: 'Agile startup building SaaS products',
        scoringWeights: JSON.stringify({ academics: 20, skills: 25, projects: 30, experience: 15, achievements: 5, verificationBonus: 5 }),
        filterPreferences: JSON.stringify({ minimumUssScore: 65, minimumCgpa: 6.5, preferredSkills: ['React', 'Node.js', 'AWS'], verifiedOnly: false, preferredBranches: ['Computer Science', 'IT', 'Electronics'], preferredYears: [3, 4] }),
        viewedCandidates: JSON.stringify([]),
        hiringRoles: JSON.stringify([{ title: 'Frontend Engineer', description: 'Develop feature-rich front-end experiences', requiredSkills: ['React', 'TypeScript', 'UX'], minimumUss: 70, salary: '$30K-$50K', location: 'Remote', positions: 2 }]),
      },
    });

    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedData();