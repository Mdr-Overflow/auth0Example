const mongoose = require('mongoose');
const { Date } = require('mongoose/lib');
const slugify = require('slugify');

const auctionSchema = new mongoose.Schema({
    seller:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"                 //litera mare la inceput - numele tabelei
    },

    car:{
     type: mongoose.Schema.Types.ObjectId,
      ref: "Car"                 //litera mare la inceput - numele tabelei
    },

    bidders:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"                 //litera mare la inceput - numele tabelei
    }],

    offers:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Offer"                 //litera mare la inceput - numele tabelei
    }],

    current_accepted_offer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Offer"                 //litera mare la inceput - numele tabelei
    },
    
    StartDate:{
        type:Date,
        require:[true,"trebe data de inceput bulangiule, StartDate:?"]
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
