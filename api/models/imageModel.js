
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');

const router = express.Router();

const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage, });

const imageSchema = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
    
    car :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car'
    }  ,
    fileId: {
        type: String,
        required: true,
      }


}, { timestamps: true });

const ImageModel = mongoose.model('images', imageSchema);
    // nu le mai sterg aia e
module.exports = ImageModel