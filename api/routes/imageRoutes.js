
const express = require('express');

const imageController = require('../controllers/imageController');
const ImageModel = require('../models/imageModel');

const router = express.Router();
const multer = require('multer');

const multerStorage = multer.memoryStorage();

const upload = multer({ storage: multerStorage, });



router.route('/:string').get(imageController.getImageByString)

// For image upload
router.post('/upload', upload.single('image'), async (req, res, next) => {
    const image = { data: new Buffer.from(req.file.buffer, 'base64'), contentType: req.file.mimetype }
    const savedImage = await ImageModel.create(image);
    res.send(savedImage);
  });
  // For image down
  router.get('/getImage/:id', async (req, res, next) => {
    const { id: _id } = req.params;
    // lean decodes to base64
    const image = await ImageModel.findOne({ _id }).lean().exec();
    res.send(image);
  });

module.exports = router;