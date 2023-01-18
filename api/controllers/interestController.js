
const interestModel = require('../models/interestModel');
const userModel = require('../models/userModel');
const carModel = require('../models/carModel');
const catchAsync = require('../utils/catchAsync');

const mongoose = require('mongoose');


var ObjectId = require('mongoose').Types.ObjectId; 

const getCarWithPopulate = function(id) {
    return interestModel.findById(id).populate("Car");
  };


exports.getAllInterests = catchAsync(async (req, res, next) => {
  // Filtering
  const queryObj = { ...req.query };
  const excludedFields = ['page', 'sort', 'limit', 'fields'];
  excludedFields.forEach((el) => delete queryObj[el]);

  // Advanced filtering 
 
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
 
  // eslint-disable-next-line prefer-const

  let query = interestModel.find(JSON.parse(queryStr));

  // Pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 100;
  const skip = (page - 1) * limit;
  // page=2&limit=3, 1-3 on page 1, 4-6 on page 2
  query = query.skip(skip).limit(limit);
  if (req.query.page) {
    const numOfInterests = await interestModel.countDocuments();
    if (skip > numOfInterests) throw new Error('This page does not exist');
  }
  // Execute query
  const allInterests = await query;

  res.status(200).json({
    status: 'success',
    results: allInterests.length,
    data: {
      interest: allInterests,
    },
  });
});
// userID first then  CarID  // this is used when the "watch or bid or sell buttons are pressed"
exports.createInterest = catchAsync(async (req, res, next) => {
   // const getUser = await userModel.findById(req.params.user_id);
   // const getCar = await carModel.findById(req.params.car_id);
    const newInterest = await interestModel.create(req.body);
   
    //add to user
    await userModel.findByIdAndUpdate(
            req.params.user_id ,
        { $push: { Interests: newInterest.id } },
        { new: true, useFindAndModify: false }
      );
    
    //add to car
      await carModel.findByIdAndUpdate(
        req.params.car_id ,
    { $push: { Interests: newInterest.id } },
    { new: true, useFindAndModify: false }
  );  


    console.log(newInterest.id)

    await interestModel.findByIdAndUpdate(
                newInterest.id ,
            { $push: { Car: req.params.car_id } },
            { new: true, useFindAndModify: false }
        );

        

      
    res.status(201).json({
      status: 'success',
      data: {
        interest: newInterest,
      },
    });
  });


exports.getInterestById = catchAsync(async (req, res, next) => {
  const interestID = await getCarWithPopulate(req.params.id);
  if (!interestID) {
    throw new Error('This interest does not exist');
  }
  res.status(200).json({
    status: 'success',
    data: {
      interest: interestID,
    },
  });
});

//  Used to change type of interest instead of remaking it ( x'(user) watch(type) blue_car(car) -> x' bids on blue car )
exports.updateInterest = catchAsync(async (req, res, next) => {
    const updatedInterest = await interestModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidation: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        interest: updatedInterest,
      },
    });
  });
  
// Used when user deselects watch or sells car or car is sold // kills the id in the car and user table as well
exports.deleteInterest = catchAsync(async (req, res, next) => {
    // eslint-disable-next-line no-unused-vars
    //const deletedInterest = await interestModel.findByIdAndDelete(req.params.id);
   
    const thiss =  await interestModel.findByIdAndRemove(req.params.id);
   
    //thiss = deletedComment;
    console.log('this gets printed first');
    
    console.log(thiss)
    console.log(thiss.id)
    console.log(new mongoose.Types.ObjectId(thiss.id))
    
    var query = { Interests: new ObjectId(thiss.id) }; // this works
    
    await userModel.findOneAndUpdate( query, {   // this deletes the specific commentID from the nested obj array
          $pull: { Interests: thiss.id } },
        
     ); 

    
    //2. Car

    query = { Interests: new ObjectId(thiss.id) }; // this works
    
    await carModel.findOneAndUpdate( query, {   // this deletes the specific commentID from the nested obj array
          $pull: { Interests: thiss.id } },);
        
   
    res.status(204).json({
      status: 'success',
    });
  });
  