const mongoose = require('mongoose');

const studentProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  university: {
    type: String,
    required: true
  },
  degree: {
    type: String,
    required: true
  },
  branch: {
    type: String,
    required: true
  },
  currentYear: {
    type: Number,
    required: true,
    min: 1,
    max: 4
  },
  cgpa: {
    type: Number,
    required: true,
    min: 0,
    max: 10
  },
  about: {
    type: String,
    default: ''
  },
  skills: [
    {
      name: String,
      proficiency: {
        type: Number,
        min: 0,
        max: 100
      },
      verified: {
        type: Boolean,
        default: false
      },
      assessment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assessment'
      }
    }
  ],
  projects: [
    {
      title: String,
      description: String,
      technologies: [String],
      link: String,
      githubLink: String,
      startDate: Date,
      endDate: Date,
      verified: {
        type: Boolean,
        default: false
      }
    }
  ],
  internships: [
    {
      company: String,
      position: String,
      duration: String,
      description: String,
      startDate: Date,
      endDate: Date,
      verified: {
        type: Boolean,
        default: false
      }
    }
  ],
  achievements: [
    {
      title: String,
      description: String,
      date: Date,
      verified: {
        type: Boolean,
        default: false
      }
    }
  ],
  githubUsername: {
    type: String,
    default: null
  },
  linkedinUrl: {
    type: String,
    default: null
  },
  portfolioUrl: {
    type: String,
    default: null
  },
  uss: {
    score: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    confidence: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    breakdown: {
      academicsScore: Number,
      skillsScore: Number,
      projectsScore: Number,
      experienceScore: Number,
      achievementsScore: Number
    },
    lastCalculated: Date,
    verificationPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('StudentProfile', studentProfileSchema);
