const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  
  price: {
    type: Number,
    required: true,
    min: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  category: {
    type: String,enum:["Food","Snack","Drink","Dessert"],
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Menu', menuSchema); 