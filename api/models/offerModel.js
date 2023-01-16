const mongoose = require('mongoose');
const { Date } = require('mongoose/lib/schema/index');
const slugify = require('slugify');

const offerSchema = new mongoose.Schema({
  moneySum:{
    type:Number,
    require:[true,"nu-i gratis, MoneySum:?"]
  },
  postDate:{
    type:Date,
    require:[true,"PostData:?"]
  },
  Poster:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },   // -> means if acc is deleted offer is deleted
  isAccepted:{
    type:Boolean,
    require:[false]
  },
  isFinal:{
    type:Boolean,
    require:[false]
  }

}, { collection: 'offers' });

const Offer = mongoose.model('Offer', offerSchema);

module.exports = Offer;