'use strict';
const ImageFile = require('../models/imageModel');
const userModel = require("../models/userModel")
const carModel = require("../models/carModel")


// userID
const imageFileUploadUser = async (req, res, next) => {
    try{
        console.log(req.params.user_id)
        const file = new ImageFile({
            owner: req.params.user_id,
            fileName: req.file.originalname,
            filePath: req.file.path,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2) // 0.00
        });

      await  userModel.findByIdAndUpdate(
           req.params.user_id,
          {
            Profile_picture: file._id,
          },
          { new: true, useFindAndUpdate: false }
        )

        await file.save();



        res.status(201).send('File Uploaded Successfully');
    }catch(error) {
        res.status(400).send(error.message);
    }
}

// carID
const imageFileUploadCar = async (req, res, next) => {
  try{
      
      const file = new ImageFile({
          car: req.params.car_id,
          fileName: req.file.originalname,
          filePath: req.file.path,
          fileType: req.file.mimetype,
          fileSize: fileSizeFormatter(req.file.size, 2) // 0.00
      });

     await carModel.findByIdAndUpdate(
      req.params.car_id,
        {
          $push: { images: file.id } ,
        },
        { new: true, useFindAndUpdate: false }
      )
      
      await file.save();



      res.status(201).send('File Uploaded Successfully');
  }catch(error) {
      res.status(400).send(error.message);
  }
}



const getallImageFiles = async (req, res, next) => {
    try{
        const files = await ImageFile.find();
        res.status(200).send(files);
    }catch(error) {
        res.status(400).send(error.message);
    }
}

const fileSizeFormatter = (bytes, decimal) => {
    if(bytes === 0){
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];

}

module.exports = {
    imageFileUploadUser,
    imageFileUploadCar,
    getallImageFiles
}