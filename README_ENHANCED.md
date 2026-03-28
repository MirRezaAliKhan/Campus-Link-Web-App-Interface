# Campus-Link: AI-Powered Placement Platform (Full-Stack)

![Status](https://img.shields.io/badge/Status-Production%20Ready-green)
![Version](https://img.shields.io/badge/Version-2.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-orange)

## 🎯 Mission

**Transform campus placements from CGPA-based shortlisting to AI-driven, skill-focused talent matching.**

Campus-Link replaces traditional placement systems with an **adaptive, transparent, and fair** Universal Standard Score (USS) that recognizes real talent over raw grades.

---

## ✨ Unique Features

### 🎓 For Students
- **USS Score**: Composite metric combining academics, skills, projects, experience & achievements
- **Score Breakdown**: See exactly how each component affects your rating
- **Improvement Suggestions**: Personalized roadmap to boost your score
- **Skill Assessments**: Verify your skills directly on the platform
- **Portfolio Showcase**: GitHub, projects, internships, achievements all tracked
- **Job Matching**: Discover roles aligned with your profile

### 💼 For Recruiters
- **Custom Scoring Weights**: Adjust what matters (skills vs CGPA) with sliders
- **Real-time Ranking**: Candidates re-ranked instantly based on preferences
- **Smart Filtering**: Minimum scores, verified-only, skill requirements
- **Candidate Deep Dive**: Full profile with GitHub activity, projects, verification status
- **Application Pipeline**: Track applicants from submission to offer
- **Hiring Roles**: Post multiple positions with custom requirements

### 🏛️ For Institutions
- **Analytics Dashboard**: Placement trends, skill gaps, industry distribution
- **Faculty Management**: Monitor student progress and recommendations
- **Comparative Insights**: Understand market demand vs student supply

---

## 🛠 Technology Stack

### Backend
- **Node.js** + Express.js (API Server)
- **Prisma** + **SQLite** (SQL Database)
- **JWT** (Authentication)
- **bcryptjs** (Password Hashing)

### Frontend  
- **React 18** + TypeScript
- **Vite** (Build Tool)
- **Tailwind CSS** + ShadcnUI (Styling & Components)
- **Recharts** (Analytics Visualizations)

### Integration
- RESTful API architecture
- Token-based authentication
- Real-time weight-based scoring

---

## 📊 USS Score Breakdown

```
University Standard Score (USS) = 
  (Academics × 20%) +
  (Skills × 30%) +
  (Projects × 25%) +
  (Experience × 15%) +
  (Achievements × 10%) +
  (Verification Bonus × 5%)
```

**Key Innovation**: Recruiters can adjust these weights in real-time, instantly reshaping rankings without changing student data.

---

## 🚀 Quick Start

### Option 1: Using Docker (Recommended for Production)

```bash
# Build containers
docker-compose build

# Start services
docker-compose up
```

Frontend: http://localhost:5173
Backend: http://localhost:5000

### Option 2: Manual Setup

#### Backend
```bash
cd backend
npm install
# Create .env file with JWT secret and optional CORS settings
# then apply Prisma schema and seed demo data
npx prisma db push
npm run seed
npm run dev       # Start on port 5000
```

#### Frontend
```bash
npm install
npm run dev       # Start on port 5173
```

**See full setup guide**: [FULL_STACK_SETUP.md](./FULL_STACK_SETUP.md)

---

## 👥 Demo Accounts

### Students (Login & See USS)
| Email | Password | Highlight |
|-------|----------|-----------|
| `student2@example.com` | `password123` | **Best to test**: Lower CGPA (7.5) but HIGH USS (85.4) due to strong portfolio |
| `student1@example.com` | `password123` | High CGPA (9.2) but MEDIUM USS (73.2) due to limited projects |
| `student3@example.com` | `password123` | Balanced profile |

### Recruiters (Adjust Weights & See Re-ranking)
| Email | Password | Approach |
|-------|----------|----------|
| `recruiter1@google.com` | `password123` | **Tech company**: Values Skills (40%) + Projects (30%) |
| `recruiter@startup.com` | `password123` | **Startup**: Balanced approach with Projects emphasis |

---

## 🎯 Demo Walkthrough

### 1. See the Innovation (5 min)
- **Login as Student**: `student2@example.com`
- **View Dashboard**: Notice USS score (85.4) > than her CGPA (7.5)
- **View Breakdown**: See projects and verified skills boosting her score
- **Get Suggestions**: Platform recommends how to further improve

### 2. Test Recruiter Customization (5 min)
- **Login as Google Recruiter**: `recruiter1@google.com`
- **Go to Weight Sliders**: See default weights (Skills 40%, Projects 30%)
- **Adjust Weights**: Increase Skills to 50%, decrease Academics to 10%
- **See Re-ranking**: Candidates instantly re-ranked based on preferences
- **View Details**: Click on a candidate to see full profile breakdown

### 3. Compare Both Recruiters (5 min)
- **Switch to Startup Recruiter**: More balanced weights
- **See Different Rankings**: Startup values different factors
- **Verify Matching Logic**: Some candidates rank higher/lower depending on preferences

---

## 🔐 Security Features

✅ **JWT Authentication** - Secure token-based login
✅ **Password Hashing** - bcryptjs with salt rounds
✅ **Role-based Access** - Student/Recruiter restricted endpoints
✅ **CORS Protection** - Origin-based access control
✅ **Environment Variables** - Secrets not in code

---

## 📈 Platform Metrics

### Student Data
- **Academics**: CGPA (0-10 → normalized to score)
- **Skills**: 5+ skills with proficiency ratings (0-100%)
- **Projects**: Portfolio with GitHub links (self-hosting bonus)
- **Experience**: Internships with company verification
- **Achievements**: Certificates, awards, recognitions
- **Verification %**: How much data is externally verified

### Recruiter Customization
- **6 Adjustable Weights**: Real-time re-scoring engine
- **4 Filters**: Minimum score, CGPA, skills, verification status
- **Instant Ranking**: Candidates re-ranked in real-time
- **Application Pipeline**: Status tracking (Applied → Offer)

---

## 🔄 API Overview

### Core Endpoints

**Authentication**
```
POST   /api/auth/register    - Create account
POST   /api/auth/login       - Get JWT token
GET    /api/auth/profile     - Get current user
PUT    /api/auth/profile     - Update user info
```

**Student**
```
GET    /api/student/profile          - Get profile & USS
PUT    /api/student/profile          - Update CGPA, links, about
POST   /api/student/skills           - Add skill
POST   /api/student/projects         - Add project
POST   /api/student/internships      - Add internship
GET    /api/student/uss-suggestions  - Get improvement tips
```

**Recruiter**
```
GET    /api/recruiter/profile        - Get company info
PUT    /api/recruiter/weights        - Update scoring weights
PUT    /api/recruiter/filters        - Update thresholds
GET    /api/recruiter/candidates     - Get ranked list (custom weights)
GET    /api/recruiter/candidates/:id - Single candidate details
```

**Applications**
```
POST   /api/applications                      - Apply to role
GET    /api/applications/student              - Student's applications  
GET    /api/applications/recruiter            - Recruiter's applications
PUT    /api/applications/:id/status           - Update status
```

---

## 📁 Project Structure

```
campus-link-web-app-interface/
├── backend/                              # NEW: Node.js API server
│   ├── src/
│   │   ├── models/                      # MongoDB schemas
│   │   ├── controllers/                 # Business logic
│   │   ├── routes/                      # API endpoints
│   │   ├── middleware/                  # Auth, error handling
│   │   ├── services/                    # Helper functions
│   │   ├── utils/
│   │   │   └── USSCalculator.js        # 🔑 USS computation
│   │   └── server.js                    # Express entry point
│   ├── scripts/
│   │   └── seedData.js                  # Demo data
│   └── package.json
│
├── src/                                  # React Frontend
│   ├── components/
│   │   ├── LandingPage.tsx              # NEW: Marketing page
│   │   ├── StudentEnhancedDashboard.tsx # NEW: USS breakdown
│   │   ├── RecruiterWeightSliders.tsx   # NEW: Weight controls
│   │   ├── Dashboard.tsx                # Existing
│   │   ├── RecruiterDashboard.tsx       # Existing
│   │   └── ... (40+ UI components)
│   ├── services/
│   │   └── api.js                       # NEW: Backend integration
│   ├── App.tsx
│   └── main.tsx
│
├── FULL_STACK_SETUP.md                  # Detailed setup guide
├── README.md                            # This file
├── package.json                         # Frontend deps
└── vite.config.ts
```

---

## 🎨 Design System

- **Color Scheme**: Purple to Pink gradients (modern, trustworthy)
- **Typography**: Bold sans-serif for headings, clean body text
- **Components**: 45+ Radix UI + shadcn/ui components
- **Responsive**: Mobile-first, optimized for all screen sizes
- **Animations**: Smooth transitions, no excessive effects

---

## 🧠 USS Calculation Logic

### Academics Component
```javascript
academicsScore = (CGPA / 10) * 100
// Example: 7.5 CGPA = 75/100
```

### Skills Component
```javascript
// Average skill proficiency with verification boost
skillScore = avg(skillProficiency) * verificationMultiplier
// Verified skills get 1.2x multiplier
```

### Projects Component
```javascript
projectScore = (projectCount * 15) + verificationBonus + githubBonus
// Max 20 points base + 30 verification + 5 per project with links
```

### Experience Component
```javascript
experienceScore = 30 + (internshipCount * 15) + verificationBonus
// Base 30 + 15 per internship + up to 20 verification points
```

### Confidence Calculation
```javascript
confidence = 30 + (verificationPercentage * 0.7)
// Low verification = 30%, High verification = 100%
```

---

## 🔧 Configuration

### Backend .env
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/campus-link
JWT_SECRET=super_secret_key_change_in_production
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

### Frontend .env
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🚀 Production Deployment

### Recommended Stack
- **Frontend**: Vercel, Netlify, or AWS S3 + CloudFront
- **Backend**: Heroku, Railway, DigitalOcean, AWS Elastic Beanstalk
- **Database**: MongoDB Atlas (Cloud MongoDB)
- **CDN**: Cloudflare

### Pre-deployment Checklist
- [ ] Change JWT_SECRET to a strong random value
- [ ] Update CORS_ORIGIN to production domain
- [ ] Switch to production MongoDB URI
- [ ] Update API_URL in frontend env
- [ ] Enable HTTPS/SSL
- [ ] Set up database backups
- [ ] Configure error logging (Sentry)
- [ ] Set up CI/CD pipeline

---

## 📚 Documentation

- **API Docs**: See FULL_STACK_SETUP.md for all endpoints
- **USS Calculation**: Detailed breakdown in this README
- **Component Structure**: See comments in component files
- **Database Schema**: See models in `backend/src/models/`

---

## 🐛 Troubleshooting

### Backend Won't Start
- Check MongoDB is running: `mongod`
- Verify port 5000 is available
- Check .env file exists with MONGODB_URI

### Frontend Can't Connect to Backend
- Check backend is running on port 5000
- Verify VITE_API_URL in .env matches backend
- Check browser console for CORS errors
- Clear browser cache

### Demo Data Not Loading
- Run: `npm run seed` in backend folder
- Check MongoDB connection

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/campus-link`)
3. Commit changes (`git commit -am 'Add feature'`)
4. Push to branch (`git push origin feature/campus-link`)
5. Create Pull Request

---

## 📄 License

MIT License - see LICENSE file for details

---

## 🙌 Acknowledgments

Built with ❤️ to revolutionize campus placements.

**Campus-Link**: Beyond CGPA, Smarter, Fairer Placements 🎓

---

## 📞 Support & Contact

- **Issues**: GitHub Issues
- **Discussions**: GitHub Discussions  
- **Email**: support@campus-link.io

---

## 🗺 Roadmap

- [ ] AI Chatbot for score explanations
- [ ] GitHub profile verification
- [ ] LinkedIn integration
- [ ] Video interview module
- [ ] Email notifications
- [ ] Two-factor authentication
- [ ] Analytics dashboard for institutions
- [ ] Mobile app (React Native)
- [ ] Multilingual support
- [ ] API rate limiting & monitoring

---

**Status**: ✅ Production Ready | **Version**: 2.0.0 (Full-Stack) | **Last Updated**: March 2026

Start your journey to smarter placements: [campus-link.io](http://localhost:5173)
