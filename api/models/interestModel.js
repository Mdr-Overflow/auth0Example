const mongoose = require('mongoose');
const slugify = require('slugify');

const interestSchema = new mongoose.Schema({
  
  interestType: {
    type: String,
    required: [true, 'interestType:?'],
    enum:[
      'watch',
      'bid',
      'sell'
    ]
  },
  
  Car: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car"                 //litera mare la inceput - numele tabelei
    }
  ,
  User:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User" 
    }

}, { collection: 'interests' });

const Interest = mongoose.model('Interest', interestSchema);

module.exports = Interest;
