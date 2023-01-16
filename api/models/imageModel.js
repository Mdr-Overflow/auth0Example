
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');

const router = express.Router();

const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage, });

const imageSchema = mongoose.Schema({
    image: { data: Buffer, contentType: String },
    image_src: {
        type : String
    }
}, { timestamps: true });

const ImageModel = mongoose.model('images', imageSchema);

module.exports = ImageModel