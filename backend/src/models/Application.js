const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StudentProfile',
    required: true
  },
  recruiterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RecruiterProfile',
    required: true
  },
  roleId: {
    type: String,
    required: true
  },
  roleName: {
    type: String,
    required: true
  },
  coverLetter: {
    type: String,
    default: ''
  },
  matchScore: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  ussScore: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['applied', 'shortlisted', 'rejected', 'in-interview', 'offer-extended', 'accepted', 'rejected-by-student'],
    default: 'applied'
  },
  appliedAt: {
    type: Date,
    default: Date.now
  },
  statusUpdatedAt: {
    type: Date,
    default: Date.now
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

module.exports = mongoose.model('Application', applicationSchema);
