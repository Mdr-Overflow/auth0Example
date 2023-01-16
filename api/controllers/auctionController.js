
const interestModel = require('../models/interestModel');
const userModel = require('../models/userModel');
const carModel = require('../models/carModel');
const offerModel = require('../models/offerModel');
const auctionModel = require('../models/auctionModel');
const catchAsync = require('../utils/catchAsync');

const SuperPopulate = function(id) {
    return auctionModel.findById(id).populate("car")
                                    .populate("seller")
                                    .populate("bidders")
                                    .populate("offers")
                                    .populate("current_accepted_offer")
  };


exports.getAllAuctions = catchAsync(async (req, res, next) => {
  // Filtering
  const queryObj = { ...req.query };
  const excludedFields = ['page', 'sort', 'limit', 'fields'];
  excludedFields.forEach((el) => delete queryObj[el]);

  // Advanced filtering 
 
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
 
  // eslint-disable-next-line prefer-const

  let query = auctionModel.find(JSON.parse(queryStr));

  // Pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 100;
  const skip = (page - 1) * limit;
  // page=2&limit=3, 1-3 on page 1, 4-6 on page 2
  query = query.skip(skip).limit(limit);
  if (req.query.page) {
    const numOfAuctions = await auctionModel.countDocuments();
    if (skip > numOfAuctions) throw new Error('This page does not exist');
  }
  // Execute query
  const allAuctions = await query;

  res.status(200).json({
    status: 'success',
    results: allAuctions.length,
    data: {
      auction: allAuctions,
    },
  });
});

   
// needs car_id, seller_id
exports.createAuction = catchAsync(async (req, res, next) => {
    const getCar = await carModel.findById(req.params.car_id);
    const newAuction = await auctionModel.create(req.body);

    console.log(newAuction.id)

    await auctionModel.findByIdAndUpdate(
                newAuction.id ,
            { $push: { car: req.params.car_id } },
            { new: true, useFindAndModify: false }
        );

    await auctionModel.findByIdAndUpdate(
                  newAuction.id ,
        { $set: { seller: req.params.seller_id } },
        { new: true, useFindAndModify: false }
      );
        
      
    res.status(201).json({
      status: 'success',
      data: {
        auction: newAuction,
      },
    });
  });


  exports.getAuctionByCarId = catchAsync(async (req, res, next) => {
    const auctionID = await SuperPopulate(req.params.car_id);
    if (!auctionID) {
      throw new Error('This auction does not exist');
    }
    res.status(200).json({
      status: 'success',
      data: {
        auction: auctionID,
      },
    });
  });


exports.getAuctionById = catchAsync(async (req, res, next) => {
  const auctionID = await SuperPopulate(req.params.id);
  if (!auctionID) {
    throw new Error('This auction does not exist');
  }
  res.status(200).json({
    status: 'success',
    data: {
      auction: auctionID,
    },
  });
});


// offer id, auction id // adds it to the list
exports.addOffer = catchAsync(async (req, res, next) => {
    const AccOffer = await offerModel.findById(req.params.offer_id);

    await auctionModel.findByIdAndUpdate(
        req.params.auction_id ,
    { $push: { offers: req.params.offer_id } },
    { new: true, useFindAndModify: false }
);

    res.status(200).json({
      status: 'success',
      data: {
        auction: updatedAuction,
      },
    });
  });

  
// get auction.offers
//exports.getOffersAuction



//when user click on bid
// bidder_id , auction_id
exports.acceptBidder =  catchAsync(async (req, res, next) => {
    const AccBidder = await userModel.findById(req.params.bidder_id);
   

   

    await auctionModel.findByIdAndUpdate(
        req.params.auction_id ,
    { $push: { bidders: AccBidder.id} },
    { new: true, useFindAndModify: false }
);
        
        //interest
        // when u do this in the button logic also do : - create interest 
        //                                                with bidder id and auction car
        //                                                type = bid


    res.status(200).json({
      status: 'success',
      data: {
      
      },
    });
  });



// offer id, auction id -> isAcc = true
exports.acceptOffer = catchAsync(async (req, res, next) => {
    const AccOffer = await offerModel.findById(req.params.offer_id);
    const updatedAuction = await auctionModel.findByIdAndUpdate(req.params.auction_id, req.body, {
      new: true,
      runValidation: true,
    });

   

    await auctionModel.findByIdAndUpdate(
        newAuction.id ,
    { $push: { current_accepted_offer: req.params.offer_id } },
    { new: true, useFindAndModify: false }
);

    await offerModel.findByIdAndUpdate(
        req.params.offer_id ,
    { $push: { isAccepted: true } },
    { new: true, useFindAndModify: false }
    );

    res.status(200).json({
      status: 'success',
      data: {
        auction: updatedAuction,
      },
    });
  });

// offer id
exports.makeOfferFinal = catchAsync(async (req, res, next) =>{
   await offerModel.findByIdAndUpdate(
    req.params.id ,
{ $push: { isFinal: true } },
{ new: true, useFindAndModify: false }
);
    //close auction

      res.status(200).json({
        status: 'success',
        data: {
          auction: updatedAuction,
        },
      });
    } ); 


//close auction = update with isOpen = false


exports.updateAuction = catchAsync(async (req, res, next) => {
    const updatedAuction = await auctionModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidation: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        auction: updatedAuction,
      },
    });
  });

  //I'll keep offers for history
// Used when user deselects watch or sells car or car is sold
exports.deleteAuction = catchAsync(async (req, res, next) => {
    // eslint-disable-next-line no-unused-vars
    const deletedAuction = await auctionModel.findByIdAndDelete(req.params.id);


    res.status(204).json({
      status: 'success',
    });
  });
  