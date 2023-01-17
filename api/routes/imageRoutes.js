
const mongoose = require('mongoose');

const GridFsStorage = require('multer-gridfs-storage').GridFsStorage;;

const fs = require("fs");
const router = require('express').Router();
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');

var ObjectId = require('mongoose').Types.ObjectId;

const userModel = require("../models/userModel")
const carModel = require("../models/carModel")

require('dotenv').config();


const Image = require('../models/imageModel');

const mongoURI = process.env.ATLAS_URI;
console.log(mongoURI)

const conn = mongoose.createConnection(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //useCreateIndex: true,
});

let gfs;
conn.once('open', () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'images',
  });
});

const storage = new GridFsStorage({
  url: mongoURI,
  options: { useUnifiedTopology: true },
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'images',
        };
        resolve(fileInfo);
      });
    });
  },
});

const store = multer({
  storage,
  limits: { fileSize: 20000000 },  // 20 mb
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) return cb(null, true);
  cb('filetype');
}

const uploadMiddleware = (req, res, next) => {
  const upload = store.single('image');
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).send('File too large');
    } else if (err) {
      if (err === 'filetype') return res.status(400).send('Image files only');
      return res.sendStatus(500);
    }
    next();
  });
};

router.post('/upload/', uploadMiddleware, async (req, res) => {
  const { file } = req;
  const { id } = file;
  if (file.size > 5000000) { //5 mb
    deleteImage(id);
    return res.status(400).send('file may not exceed 5mb');
  }
  console.log('uploaded file: ', file);
  return res.send(file.id);
});

router.post('/user/:user_id', uploadMiddleware, async (req, res) => {
  const { file } = req;
  const { id } = file;
  const  userId  = req.params.user_id

  if (file.size > 5000000) {
    deleteImage(id);
    return res.status(400).send('file may not exceed 5mb');
  }

  const foundUser = await userModel.findById(userId);
  console.log(userId)
  console.log(req.params.user_id)

  if (!foundUser) return res.status(400).send('user not found');
  

  const newPic = await Image.create({
    owner: userId,
    fileId: id,
  });
  userModel.findByIdAndUpdate(
    userId,
    {
      Profile_picture: newPic._id,
    },
    { new: true, useFindAndUpdate: false }
  )
    .then((updatedUser) => res.send(updatedUser))
    .catch(() => res.sendStatus(500));
});

router.post('/car/:car_id', uploadMiddleware, async (req, res) => {
  const { file } = req;
  const { id } = file;
  const  carId  = req.params.car_id

  if (file.size > 5000000) {
    deleteImage(id);
    return res.status(400).send('file may not exceed 5mb');
  }

  const foundCar = await carModel.findById(carId);

  if (!foundCar) return res.status(400).send('car not found');
 

  const newPic = await Image.create({
    car: carId,
    fileId: id,
  });
  carModel.findByIdAndUpdate(
    carId,
    {
      $push: { images: newPic.id } ,
    },
    { new: true, useFindAndUpdate: false }
  )
    .then((updatedUser) => res.send(updatedUser))
    .catch(() => res.sendStatus(500));
});



const deleteImage = (id) => {
  if (!id || id === 'undefined') return res.status(400).send('no image id');
  const _id = new mongoose.Types.ObjectId(id);
  gfs.delete(_id, (err) => {
    if (err) return res.status(500).send('image deletion error');
  });
};

// id is fileId here
router.get('/:id', ({ params: { id } }, res) => {
  if (!id || id === 'undefined') return res.status(400).send('no image id');
  
  const bucket = new mongoose.mongo.GridFSBucket(conn.db, {
    chunkSizeBytes: 1024,
    bucketName: 'images',
  });

  const _id = ObjectId(id)
  gfs.find({ _id }).toArray((err, files) => {
    console.log(files)
    if (!files || files.length === 0)
      return res.status(400).send('no files exist');
      
      const stream = fs.createWriteStream(__dirname + "/image.png");
    bucket.openDownloadStream(_id).pipe(fs.createWriteStream('./outputFile'));  /// works TOOOOOO BIIIG DOE
  });
});

module.exports = router;