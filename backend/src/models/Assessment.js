const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StudentProfile',
    required: true
  },
  skillName: {
    type: String,
    required: true
  },
  assessmentType: {
    type: String,
    enum: ['mcq', 'coding', 'project-based'],
    required: true
  },
  questions: [
    {
      question: String,
      type: String,
      options: [String],
      correctAnswer: String,
      difficulty: String
    }
  ],
  userAnswers: [
    {
      questionId: mongoose.Schema.Types.ObjectId,
      answer: String,
      isCorrect: Boolean
    }
  ],
  score: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  totalQuestions: Number,
  correctAnswers: Number,
  timeTaken: Number, // in seconds
  status: {
    type: String,
    enum: ['in-progress', 'completed', 'submitted'],
    default: 'in-progress'
  },
  submittedAt: {
    type: Date,
    default: null
  },
  verificationLevel: {
    type: String,
    enum: ['unverified', 'verified', 'high-confidence-verified'],
    default: 'unverified'
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

module.exports = mongoose.model('Assessment', assessmentSchema);
