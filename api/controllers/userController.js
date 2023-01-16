
const userModel = require('../models/userModel');
const interestModel = require('../models/interestModel');
const auctionModel = require('../models/auctionModel');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcrypt');

var populateQuery = { path: "Interests Cars", options: { _recursed: true } } 
                                                        // recursed is there so it doens't loop inf.

const getUserWithPopulate = function(id) {
    return userModel.findById(id).populate(populateQuery);
  }; // populates the interest field in user with the actual interest object not only the id to it


exports.getAllUsers = catchAsync(async (req, res, next) => {
  // Filtering
  const queryObj = { ...req.query };
  const excludedFields = ['page', 'sort', 'limit', 'fields'];
  excludedFields.forEach((el) => delete queryObj[el]);

  // Advanced filtering 
 
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
 
  // eslint-disable-next-line prefer-const
  let query = userModel.find(JSON.parse(queryStr));

  // Pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 100;
  const skip = (page - 1) * limit;
  // page=2&limit=3, 1-3 on page 1, 4-6 on page 2
  query = query.skip(skip).limit(limit);
  if (req.query.page) {
    const numOfUsers = await userModel.countDocuments();
    if (skip > numOfUsers) throw new Error('This page does not exist');
  }
  // Execute query
  const allUsers = await query;

  res.status(200).json({
    status: 'success',
    results: allUsers.length,
    data: {
      user: allUsers,
    },
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
    const newUser = await userModel.create(req.body);

    bcrypt.hash(newUser.password, 10, function (err, hash) {
        if (err) {
          client.close();
          return alert(err);
    }
    console.log(hash)
    console.log(newUser.password)
     userModel.findByIdAndUpdate(
        req.params.id ,
        { $push: { password: hash } },
     { new: true, useFindAndModify: false }
   );
})

        
        
  
    res.status(201).json({
      status: 'success',
      data: {
        user: newUser,
      },
})
    });


exports.getUserById = catchAsync(async (req, res, next) => {
  //const userID = await userModel.findById(req.params.id);
  const userID= await getUserWithPopulate(req.params.id);  // changes from (ids to interest obj) to (interst obj)

  if (!userID) {
    throw new Error('This user does not exist');
  }
  res.status(200).json({
    status: 'success',
    data: {
      user: userID,
    },
  });
});

// 
exports.updateUser = catchAsync(async (req, res, next) => {
    const updatedUser = await userModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidation: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    });
  });
  

exports.deleteUser = catchAsync(async (req, res, next) => {
    // eslint-disable-next-line no-unused-vars
    
    // must delete interest list as well
   

    const deletedUser = await userModel.findByIdAndRemove(req.params.id);
    
    deletedUser.remove();
    res.status(204).json({
      status: 'success',
    });
  });
  