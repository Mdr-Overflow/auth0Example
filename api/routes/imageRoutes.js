
const mongoose = require('mongoose');

const GridFsStorage = require('multer-gridfs-storage').GridFsStorage;;

const fs = require("fs");
const router = require('express').Router();
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');


const imageController = require('../controllers/imageController');

var ObjectId = require('mongoose').Types.ObjectId;

const userModel = require("../models/userModel")
const carModel = require("../models/carModel")

require('dotenv').config();


const Image = require('../models/imageModel');

const {upload} = require('../helpers/filehelper');


const mongoURI = process.env.ATLAS_URI;
console.log(mongoURI)

router.post('/upload/user/:user_id', upload.single('image'), imageController.imageFileUploadUser);
router.post('/upload/car/:car_id', upload.single('image'), imageController.imageFileUploadCar);
router.get('/getImageFiles', imageController.getallImageFiles);


module.exports = router;