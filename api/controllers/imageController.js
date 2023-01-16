const imageModel = require('../models/imageModel');
const catchAsync = require('../utils/catchAsync');

const mongoose = require('mongoose');


exports.getImageByString = catchAsync(async (req, res, next) => {
    const imageGET = await imageModel.findOne( {image_src: req.param.string} )


    if (!imageGET) {
      throw new Error('This auction does not exist');
    }
    res.status(200).json({
      status: 'success',
      data: {
        image: imageGET,
      },
    });
  });