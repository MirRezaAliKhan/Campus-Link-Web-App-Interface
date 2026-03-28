const mongoose = require('mongoose');

const recruiterProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  companyName: {
    type: String,
    required: true
  },
  industry: {
    type: String,
    required: true
  },
  companySize: {
    type: String,
    enum: ['startup', 'small', 'medium', 'large', 'enterprise'],
    required: true
  },
  location: {
    type: String,
    required: true
  },
  companyWebsite: {
    type: String,
    default: null
  },
  description: {
    type: String,
    default: ''
  },
  scoringWeights: {
    academics: {
      type: Number,
      default: 20,
      min: 0,
      max: 100
    },
    skills: {
      type: Number,
      default: 30,
      min: 0,
      max: 100
    },
    projects: {
      type: Number,
      default: 25,
      min: 0,
      max: 100
    },
    experience: {
      type: Number,
      default: 15,
      min: 0,
      max: 100
    },
    achievements: {
      type: Number,
      default: 10,
      min: 0,
      max: 100
    },
    verificationBonus: {
      type: Number,
      default: 5,
      min: 0,
      max: 20
    }
  },
  filterPreferences: {
    minimumUssScore: {
      type: Number,
      default: 60,
      min: 0,
      max: 100
    },
    minimumCgpa: {
      type: Number,
      default: 6.0,
      min: 0,
      max: 10
    },
    preferredSkills: [String],
    verifiedOnly: {
      type: Boolean,
      default: false
    },
    preferredBranches: [String],
    preferredYears: [Number]
  },
  hiringRoles: [
    {
      title: String,
      description: String,
      requiredSkills: [String],
      minimumUss: Number,
      salary: String,
      location: String,
      positions: Number,
      active: {
        type: Boolean,
        default: true
      },
      created: {
        type: Date,
        default: Date.now
      }
    }
  ],
  viewedCandidates: [
    {
      studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StudentProfile'
      },
      viewedAt: Date,
      score: Number
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('RecruiterProfile', recruiterProfileSchema);
