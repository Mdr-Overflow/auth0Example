
const userModel = require('../models/userModel');
const offerModel = require('../models/offerModel');
const catchAsync = require('../utils/catchAsync');


const getOfferWithPopulate = function(id) {
    return offerModel.findById(id).populate("Poster");
  }; // populates the interest field in offer with the actual interest object not only the id to it


exports.getAllOffers = catchAsync(async (req, res, next) => {
  // Filtering
  const queryObj = { ...req.query };
  const excludedFields = ['page', 'sort', 'limit', 'fields'];
  excludedFields.forEach((el) => delete queryObj[el]);

  // Advanced filtering 
 
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
 
  // eslint-disable-next-line prefer-const
  let query = offerModel.find(JSON.parse(queryStr));

  // Pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 100;
  const skip = (page - 1) * limit;
  // page=2&limit=3, 1-3 on page 1, 4-6 on page 2
  query = query.skip(skip).limit(limit);
  if (req.query.page) {
    const numOfOffers = await offerModel.countDocuments();
    if (skip > numOfOffers) throw new Error('This page does not exist');
  }
  // Execute query
  const allOffers = await query;

  res.status(200).json({
    status: 'success',
    results: allOffers.length,
    data: {
      offer: allOffers,
    },
  });
});
// needs userID, auctionID
exports.createOffer = catchAsync(async (req, res, next) => {
    const user = await userModel.findById(req.params.user_id)
    const auction = await userModel.findById(req.params.auction_id)

    const newOffer = await offerModel.create(req.body);
    
    //uncomment later
  //  if(req.body.moneySum > user.balance ) throw {name : "Money Ballance Error", message : "User used more money on offer then they have"}; 


    await offerModel.findByIdAndUpdate(
        newOffer.id ,
    { $push: { Poster: req.params.id } },
    { new: true, useFindAndModify: false }
);

    await offerModel.findByIdAndUpdate(
        auction.id ,
    { $push: { offers: newOffer.id } },
    { new: true, useFindAndModify: false }
    );
//  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  
    res.status(201).json({
      status: 'success',
      data: {
        offer: newOffer,
      },
})
    });


exports.getOfferById = catchAsync(async (req, res, next) => {
  //const offerID = await offerModel.findById(req.params.id);
  const offerID= await getOfferWithPopulate(req.params.id);  // changes from (ids to interest obj) to (interst obj)

  if (!offerID) {
    throw new Error('This offer does not exist');
  }
  res.status(200).json({
    status: 'success',
    data: {
      offer: offerID,
    },
  });
});

// 
exports.updateOffer = catchAsync(async (req, res, next) => {
    const updatedOffer = await offerModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidation: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        offer: updatedOffer,
      },
    });
  });
  

exports.deleteOffer = catchAsync(async (req, res, next) => {
    // eslint-disable-next-line no-unused-vars
    
    // must delete interest list as well
    

    const deletedOffer = await offerModel.findByIdAndRemove(req.params.id);
    
    deletedOffer.remove();
    res.status(204).json({
      status: 'success',
    });
  });