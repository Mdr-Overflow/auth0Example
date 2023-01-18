/* eslint-disable prettier/prettier */

const carModel = require('../models/carModel');
const userModel = require('../models/userModel');
const auctionModel = require('../models/auctionModel');

const catchAsync = require('../utils/catchAsync');

const getStuffWithPopulate = async function(id) {
  return carModel.findById( id).populate("Seller")
                               .populate("Interests");
}


exports.getAllCars = catchAsync(async (req, res, next) => {
  // Filtering
  const queryObj = { ...req.query };
  const excludedFields = ['page', 'sort', 'limit', 'fields'];
  excludedFields.forEach((el) => delete queryObj[el]);

  // Advance filtering
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

  console.log(queryStr + "OOOOOOOOOOOOOOOOOOOOOOOO")
  console.log(queryStr + "OOOOOOOOOOOOOOOOOOOOOOOO")
  console.log(queryStr + "OOOOOOOOOOOOOOOOOOOOOOOO")
  // eslint-disable-next-line prefer-const
  let query = carModel.find(JSON.parse(queryStr));

  // Pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 100;
  const skip = (page - 1) * limit;
  // page=2&limit=3, 1-3 on page 1, 4-6 on page 2
  query = query.skip(skip).limit(limit);
  if (req.query.page) {
    const numOfCars = await carModel.countDocuments();
    if (skip > numOfCars) throw new Error('This page does not exist');
  }
  // Execute query
  const allCars = await query;

  res.status(200).json({
    status: 'success',
    results: allCars.length,
    data: {
      car: allCars,
    },
  });
});

exports.getCarById = catchAsync(async (req, res, next) => {

  
  const carID = await getStuffWithPopulate(req.params.id);
  if (!carID) {
    throw new Error('This car does not exist');
  }
  res.status(200).json({
    status: 'success',
    data: {
      car: carID,
    },
  });
});
  //needs user id first
exports.createCar = catchAsync(async (req, res, next) => {
  const getUser = await userModel.findById(req.params.id);
  const newCar = await carModel.create(req.body);

  await userModel.findByIdAndUpdate(
    req.params.id ,
{ $push: { Cars: newCar.id } },
{ new: true, useFindAndModify: false }
);

await carModel.findByIdAndUpdate(
  newCar.id ,
{ $push: { Seller: req.params.id } },
{ new: true, useFindAndModify: false }
);  

  res.status(201).json({
    status: 'success',
    data: {
      car: newCar,
    },
  });
});

exports.updateCar = catchAsync(async (req, res, next) => {
  const updatedCar = await carModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidation: true,
  });
  res.status(200).json({
    status: 'success',
    data: {
      car: updatedCar,
    },
  });
});

exports.deleteCar = catchAsync(async (req, res, next) => {
  // eslint-disable-next-line no-unused-vars
  const deletedCar = await carModel.findByIdAndRemove(req.params.id);
  
  //we must cancel auction if car is deleted

  
  var query = { Car: new ObjectId(deletedCar.id) };

  const remAuction = await auctionModel.findOneAndRemove(query);
  console.log(remAuction)

  deletedCar.remove()
  res.status(204).json({
    status: 'success',
  });
});
