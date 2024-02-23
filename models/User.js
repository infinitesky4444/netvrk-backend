const mongoose = require('mongoose');

//------------ User Schema ------------//
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  resetLink: {
    type: String,
    default: ''
  },
  tiers: {
    type: String,
    deafult: 'Free'
  },
  firstInteraction: {
    type: Date, 
    default: new Date()
  },
  totalInteractions: {
    type: Number,
    default: 0
  },
  interactionsToday: { 
    type: Number, 
    default: 0
  },
  monthlyInteractions:{
    type: Number,
    defailt: 0
  },
  dailyLimit: {
    type: Number, 
    default: 100
  },
  monthlyLimit: {
    type: Number, 
    default: 3000
  },
  overLimit: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;