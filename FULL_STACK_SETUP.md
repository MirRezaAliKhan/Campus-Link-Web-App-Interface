# Campus-Link Full-Stack Implementation Guide

## 🚀 Project Overview

Campus-Link is now a **complete full-stack AI-powered placement platform** with:

### Backend (Node.js + Express + Prisma + SQLite)
- User authentication (JWT)
- USS (Universal Standard Score) calculation engine
- Student profile management
- Recruiter dashboard with dynamic weights
- Real-time candidate ranking
- Application tracking system

### Frontend Enhancements
- Landing page with "Beyond CGPA" messaging
- Enhanced Student Dashboard with USS breakdown
- Recruiter Dashboard with weight sliders
- Integrated API layer for backend communication

---

## 📋 Quick Start

### Backend Setup

1. **Install Dependencies**
```bash
cd backend
npm install
```

2. **Create `.env` file**
```env
PORT=5000
JWT_SECRET=your_secure_random_key_here_change_in_production
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

3. **Setup SQLite database with Prisma**
```bash
cd backend
npx prisma db push
npm run seed
```


4. **Seed Demo Data**
```bash
npm run seed
```
This creates demo students and recruiters with contrasting profiles.

5. **Start Backend Server**
```bash
npm run dev
```
Backend runs on `http://localhost:5000`

---

### Frontend Setup

1. **Create `.env` file in project root**
```env
VITE_API_URL=http://localhost:5000/api
```

2. **Install & Run**
```bash
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`

---

## 🔐 Demo Accounts

### Students
| Email | Password | Profile |
|-------|----------|---------|
| student1@example.com | password123 | High CGPA (9.2), Low Projects - Traditional top performer |
| student2@example.com | password123 | Lower CGPA (7.5), Strong Portfolio - Skill-focused developer |
| student3@example.com | password123 | Balanced (8.0 CGPA) - Average profile |

### Recruiters
| Email | Password | Company |
|-------|----------|---------|
| recruiter1@google.com | password123 | Google - Weights: Skills 40%, Projects 30% |
| recruiter@startup.com | password123 | TechStartup - Weights: Projects 30%, Skills 25% |

---

## 📊 USS Scoring System

The Universal Standard Score (USS) is calculated as a weighted combination of:

```
USS = (Academics × 0.2) + (Skills × 0.3) + (Projects × 0.25) + 
      (Experience × 0.15) + (Achievements × 0.1) + (VerificationBonus × 0.05)
```

### Scoring Factors:

**Academics (0-100)**
- Based on CGPA (10-point scale normalized to 100)
- Weight: 20% (default)

**Skills (0-100)**
- Average proficiency of all skills
- Verified skills get +20% boost
- Weight: 30% (default)

**Projects (0-100)**
- Base: 15 points × number of projects (max 70)
- Verification bonus: +30
- GitHub/link bonus: +5 per project
- Weight: 25% (default)

**Experience (0-100)**
- Base: 30 points
- +15 points per internship (max 40)
- Verification bonus: 0-20 points
- Weight: 15% (default)

**Achievements (0-100)**
- Base: 10 points × number of achievements (max 50)
- Verification bonus: +50 for verified achievements
- Weight: 10% (default)

**Verification Bonus (0-10)**
- +10 bonus points if 100% verified
- Increases confidence score
- Weight: 5% (default)

---

## 🎯 Key Features

### For Students
✅ **Dashboard**
- Real-time USS score with confidence indicator
- Score breakdown by category (Academics, Skills, Projects, etc.)
- Personalized improvement suggestions

✅ **Profile Management**
- Add/Edit CGPA, skills, projects, internships, achievements
- Link GitHub, LinkedIn, portfolio
- Track verification status

✅ **Skill Assessments**
- Take platform-hosted assessments
- Verify skills to boost USS score
- Assessment scores directly feed into USS

✅ **Job Discovery**
- Browse recruiters and roles
- See personalized match scores
- Apply with cover letter (profile auto-included)

### For Recruiters
✅ **Weight Customization**
- Adjust scoring weights for:
  - Academics (0-100%)
  - Skills (0-100%)
  - Projects (0-100%)
  - Experience (0-100%)
  - Achievements (0-100%)
  - Verification Bonus (0-100%)

✅ **Real-time Ranking**
- Candidates instantly re-ranked based on custom weights
- See how weight changes affect rankings

✅ **Filtering**
- Minimum USS score threshold
- Minimum CGPA requirement
- Preferred skills filter
- Verified-only toggle
- Preferred branches & years

✅ **Candidate Details**
- Full score breakdown
- Projects with GitHub links
- Internship history
- Skill verification status
- Achievement records

✅ **Application Management**
- Review applications (sorted by match score)
- Shortlist, interview, or reject candidates
- Track application status

---

## 🏗️ API Endpoints

### Authentication
```
POST   /api/auth/register          - Register new user
POST   /api/auth/login             - Login and get JWT token
GET    /api/auth/profile           - Get current user profile
PUT    /api/auth/profile           - Update user info
```

### Student APIs
```
GET    /api/student/profile        - Get student profile & USS score
PUT    /api/student/profile        - Update profile (CGPA, about, links)
POST   /api/student/skills         - Add a skill
POST   /api/student/projects       - Add a project
POST   /api/student/internships    - Add internship
GET    /api/student/uss-suggestions - Get improvement suggestions
```

### Recruiter APIs
```
GET    /api/recruiter/profile             - Get recruiter profile
PUT    /api/recruiter/profile             - Update company info
PUT    /api/recruiter/weights             - Update scoring weights
PUT    /api/recruiter/filters             - Update filter preferences
GET    /api/recruiter/candidates          - Get ranked candidates (custom scoring)
GET    /api/recruiter/candidates/:id      - Get single candidate details
POST   /api/recruiter/roles               - Add hiring role
```

### Applications
```
POST   /api/applications                  - Create application
GET    /api/applications/student          - Get student's applications
GET    /api/applications/recruiter        - Get recruiter's applications
PUT    /api/applications/:id/status       - Update application status
```

---

## 📁 Project Structure

```
campus-link/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js           # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── authController.js     # Authentication logic
│   │   │   ├── studentController.js  # Student operations
│   │   │   ├── recruiterController.js # Recruiter operations
│   │   │   └── applicationController.js # Application logic
│   │   ├── middleware/
│   │   │   └── auth.js               # JWT verification
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── StudentProfile.js
│   │   │   ├── RecruiterProfile.js
│   │   │   └── Application.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── studentRoutes.js
│   │   │   ├── recruiterRoutes.js
│   │   │   └── applicationRoutes.js
│   │   ├── utils/
│   │   │   ├── USSCalculator.js      # USS computation engine
│   │   │   └── tokenUtils.js         # JWT utilities
│   │   └── server.js                 # Express app entry
│   ├── scripts/
│   │   └── seedData.js               # Demo data seeding
│   ├── package.json
│   └── .env
│
├── src/
│   ├── components/
│   │   ├── LandingPage.tsx           # NEW: Landing page
│   │   ├── StudentEnhancedDashboard.tsx # NEW: USS dashboard
│   │   ├── RecruiterWeightSliders.tsx   # NEW: Weight adjustment
│   │   ├── LoginPage.tsx             # Existing login
│   │   ├── Dashboard.tsx             # Existing student dashboard
│   │   ├── RecruiterDashboard.tsx    # Existing recruiter view
│   │   └── ... (other existing components)
│   ├── services/
│   │   └── api.js                    # NEW: API integration layer
│   ├── App.tsx                       # Main component (to be updated)
│   └── ...
├── .env.example
└── package.json
```

---

## 🧪 Testing the System

### 1. Login as Student (Priya Singh)
- Email: `student2@example.com`
- Password: `password123`
- **See**: High USS score (85.4) despite lower CGPA (7.5) due to strong portfolio
- **View**: Score breakdown, improvement suggestions, job recommendations

### 2. Login as Recruiter (Google)
- Email: `recruiter1@google.com`
- Password: `password123`
- **Adjust Weights**: Increase "Skills" to 50%, decrease "Academics" to 10%
- **See**: Priya (85.4) now ranks higher than Arjun (75.1) because of verified skills
- **Click Details**: View full candidate profile with projects and GitHub links

### 3. Contrast with Recruiter (Startup)
- Email: `recruiter@startup.com`
- Password: `password123`
- **Adjust Weights**: Balance all factors (Skills 25%, Projects 30%)
- **See**: Different ranking reflecting startup's preferences

---

## 💡 Key Innovation Points

1. **Transparent Scoring** - Students see exactly how each component affects their USS
2. **Recruiter Customization** - Real-time rankings change as weights adjust
3. **Verification System** - Unverified info gets lower weight automatically
4. **Smart Matching** - Students with strong portfolios get discovered
5. **Confidence Indicator** - Shows reliability of the USS score based on verification

---

## 🔓 Future Enhancements

- [ ] GitHub activity integration for verification
- [ ] LinkedIn profile verification
- [ ] Skill assessments engine with proctoring
- [ ] AI chatbot for score explanations
- [ ] Recruiter notifications & hiring pipeline
- [ ] Analytics dashboard for institutional insights
- [ ] Email notifications
- [ ] Two-factor authentication
- [ ] Video interview integration

---

## 📝 Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/campus-link
JWT_SECRET=your_jwt_secret_key_here_change_in_production
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

---

## 🚨 Important Notes

1. **Change JWT_SECRET** before production deployment
2. **Never commit .env files** with real keys
3. **MongoDB must be running** for backend to work
4. **CORS is configured** for localhost:5173 - update for production
5. **Demo data is seeded** with realistic contrasting profiles

---

## 📞 Support

For issues or questions:
1. Check that MongoDB is running (`mongod`)
2. Ensure backend is on port 5000 (`npm run dev` in backend folder)
3. Ensure frontend is on port 5173 (`npm run dev` in root folder)
4. Check browser console for errors
5. Check backend terminal for API errors

---

**Campus-Link: Beyond CGPA, Smarter, Fairer Placements** 🚀
