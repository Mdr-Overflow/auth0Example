const mongoose = require('mongoose');
const { Date } = require('mongoose/lib');
const slugify = require('slugify');

const auctionSchema = new mongoose.Schema({
    seller:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"               
    },

    car:{
     type: mongoose.Schema.Types.ObjectId,
      ref: "Car"                 
    },

    bidders:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"                 
    }],

    offers:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Offer"                 
    }],

    current_accepted_offer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Offer"                 
    },
    
    StartDate:{
        type:Date,
        require:[true,"StartDate:?"]
    },

    EndDate:{
        type:Date,
        require:[true,"trebe data de final bulangiule, EndDate:?"]
    }
    ,
    isOpen:{
        type:Boolean,
        require:[true,"isOpen:?"],
        default:false
    }

}, { collection: 'auctions' });

const Auction = mongoose.model('Auction', auctionSchema);

module.exports = Auction;
