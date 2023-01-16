/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//
 // MOVE TO SEPARATE FILE
const PORT=8000
const BASE_URL='http://localhost:8000'
const SESSION_SECRET='23ab6f023ecaed901df27aed3cb4c2f9161dcff55104a869db9afad9a307a40c'
const ATLAS_URI='mongodb+srv://Mandrei:DDcytac9rIpwJ0Xp@cluster0.xuf1qrn.mongodb.net/?retryWrites=true&w=majority'

//

//dotenv.config({ path: 'configAPI.env' });
const app = require('./app');

const DB = ATLAS_URI;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  //  useCreateIndex: true,
  //  useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Db connection successfully established');
  });

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
