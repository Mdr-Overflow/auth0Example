/**
 * Required External Modules
 */

const carModel = require('../api/models/carModel');
const userModel = require('../api/models/userModel');
const auctionModel = require('../api/models/auctionModel');
const interestModel = require('../api/models/interestModel');
const offerModel = require('../api/models/offerModel');
const mongoose = require('mongoose');

//const cors = require('cors');

const catchAsync = require('../api/utils/catchAsync');


const express = require("express");
const path = require("path");
const { auth, requiresAuth } = require('express-openid-connect');
const { create } = require("domain");
var bodyParser = require('body-parser')
 
// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


require("dotenv").config();

/**
 * App Variables
 */

const env = process.env.NODE_ENV || "development";
const app = express();
const port =
  env === "development" ? process.env.DEV_PORT : process.env.PROD_PORT;

/**
 *  App Configuration
 */

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, '..', 'public')));

var options = {
  theme: {
      logo: './logo.png'
  }
};

app.use(
  auth({
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    secret: process.env.SESSION_SECRET,
    authRequired: false,
    auth0Logout: true,
  }),
);

console.log(process.env.SESSION_SECRET)

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.oidc.isAuthenticated();
  res.locals.activeRoute = req.originalUrl;
  next();
});


/* Plugin */

///DB

const MONGO_PASSWORD = 'DDcytac9rIpwJ0Xp'
///

//DB CONN

const mongo = require('mongodb');
const bcrypt = require('bcrypt');
const { Console } = require("console");

const { MongoClient } = require("mongodb");
const { connectToServer } = require("../db/conn");
const paramSchema = require("./logic/paramSchema");
const { getAllCars } = require("./logic/BuyPage/apiCall");
const connectionString = process.env.ATLAS_URI;

console.log(connectionString)

const dbclient = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
  //  useCreateIndex: true,
  //  useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Db connection successfully established');
  });


//


//



/*
   dbclient.connect( 'mongodb+srv://Mandrei:'+MONGO_PASSWORD+'@cluster0.xuf1qrn.mongodb.net/?retryWrites=true&w=majority', function (err,client) {
      if (err) return alert(err);

      const db = client.db('db-name');
      const users = db.collection('users');
   })
  
*/

//let dbo = require("../db/conn.js");



 var isAuction = false
 var car_id = "CHANGE_ME" ;
 var car ;
/**
 * Routes Definitions
 */

// > Home

app.get("/", (req, res) => {
  res.render("home3", { activeRoute: req.originalUrl , isAuction, car_id});
});

// > CarStore (buy)

app.get("/buyCar", (req, res) => {

  
  res.render("buyCar2", { activeRoute: req.originalUrl, cars: [{id: "qwasdfgfsdhabu13hu31hu", name: "BMW" , firstRegistr: "123", kilometers:"12", fuelTypes:"BENZINA", originCountry : "Brazilia", price: "1222"    }, 
  { id: "qwasdfgfsdhabASDA", name: "DFSDF" , firstRegistr: "1233", kilometers:"1223", fuelTypes:"DDD", originCountry : "SDF", price: "1231231"    }                            ],
   car_id, isAuction  });
});

// > faq
app.get("/faq", (req, res) => {
  res.render("faq2", { activeRoute: req.originalUrl , isAuction, car_id});
});

//auction

var ObjectId = require('mongoose').Types.ObjectId; 

const getStuffWithPopulate = async function(id) {
  return carModel.findById( new ObjectId(id)).populate("Seller")
                               .populate("Interests");
}

app.get("/auction/get/:car_id", (req, res) => {
  isAuction = true ;
  
  car_id2 = req.params.car_id
  console.log(car_id2)
  console.log(car_id2)
  console.log(car_id2)
  console.log(car_id2)
  const carID =  getStuffWithPopulate( new ObjectId(car_id2))
  if (!carID) {
    throw new Error('This car does not exist');
  }
 




  res.render("auction", { activeRoute: req.originalUrl , car : carID , isAuction });
  car_id = car_id2
// write button middleware from car-card to get here

});

// soon
app.get("/soon", (req, res) => {
  res.render("comingSoon", { });
});

// > CarStore (sell)
app.get("/sellCar", (req, res) => {

  ///
  


  ///
  /*
  const getUser =  userModel.findById(req.params.id);
  const newCar =  carModel.create(req.body);

 userModel.findByIdAndUpdate(
    req.params.id ,
{ $push: { Cars: newCar.id } },
{ new: true, useFindAndModify: false }
);

 carModel.findByIdAndUpdate(
  newCar.id ,
{ $push: { Seller: req.params.id } },
{ new: true, useFindAndModify: false }
);
  */


  res.render("sellCar2", { activeRoute: req.originalUrl, isAuction , car_id});
});

// sell car
app.get("/sellCar/:_params", catchAsync(async (req, res, next) => {

  const JSONModel = paramSchema.getCarParam();

 // Val butoane
  console.log(req.params._params)

  const params = JSON.parse(req.params._params)
  
  console.log(params)

  JSONModel.fuelTypes = params.fuelType
  JSONModel.kilometers = params.kilometers
  //JSONModel.comparator = 'gte'
  JSONModel.transmissionTypes = params.transmissionType
  JSONModel.name = params.model
  JSONModel.bodyType = params.BodyType  //STYLE
  JSONModel.power = params.power
  //JSONModel.comparator2 = 'gte'
  JSONModel.price = params.price
  //JSONModel.comparator3 = 'gte'
  JSONModel.originCountry = params.originCountry
  JSONModel.numbersDoors = params.NumbersDoors
  JSONModel.taxi = params.Taxi
  JSONModel.damage = params.Damage
  JSONModel.summary = params.summary



  console.log(JSONModel)
  const queryObj = JSONModel


  //DB
  userId = req.oidc.user.id

  



  const newCar =  carModel.create({fuelTypes: queryObj.fuelTypes, transmissionTypes: queryObj.transmissionTypes ,
                   name: queryObj.name, bodyType: queryObj.bodyType,
                  price:  queryObj.price , power:  queryObj.power , 
                  firstRegistr :  queryObj.createdAt , originCountry : queryObj.originCountry, 
                  numbersDoors : queryObj.numbersDoors , taxi : queryObj.taxi, damage : queryObj.damage
                  , summary: queryObj.summary, kilometers: queryObj.kilometers  });


 userModel.findByIdAndUpdate(
    userId ,
{ $push: { Cars: newCar.id } },
{ new: true, useFindAndModify: false }
);

 carModel.findByIdAndUpdate(
  newCar.id ,
{ $push: { Seller: userId } },
{ new: true, useFindAndModify: false }
);
  

  // render car page
  
  res.render("auction", { activeRoute: req.originalUrl, isAuction , car: newCar});


}));



// > Profile

app.get('/profile', requiresAuth(),(req, res) => {
  
 // let ver = dbo.checkVerifyUser(req.oidc.user.email) 
  let ver = false;
  console.log(ver)
  let car_Id = "EXAMPLE"
  res.render('profile3',{ user: req.oidc.user, isVerified: ver , car_Id: car_Id, isAuction});
});

// > External API

app.get("/external-api", (req, res) => {
  res.render("external-api", { activeRoute: req.originalUrl });
});

// > Authentication


app.get('/sign-up/:page', (req, res) => {
  const { page } = req.params;

  res.oidc.login({
    returnTo: page,
    authorizationParams: {
      screen_hint: 'signup',
    },
  });
});

app.get('/login/:page', (req, res) => {
  const { page } = req.params;

  res.oidc.login({
    returnTo: page,
  });
});

app.get('/logout/:page', (req, res) => {
  const { page } = req.params;

  res.oidc.logout({
    returnTo: page,
  });
});


app.get('/extend', requiresAuth(), (req,res) =>{
 

 res.render('extend',{}  
  
  );
  
});                                     ///CHANGE THIS


/// MIDDLEWARE API CALLS 


const { param } = require('../api/app');
//const paramSchema  = require('./logic/paramSchema');

//catchAsync(async (req, res, next) => {
app.get("/getAllCars/:_params" , catchAsync(async (req, res, next) => {
  const JSONModel = paramSchema.getAllCarsjsonSchema();

 // Val butoane
  console.log(req.params._params)

  const params = JSON.parse(req.params._params)

  console.log(params)

  JSONModel.fuelTypes = params.fuel
  //JSONModel.kilometers =
  //JSONModel.comparator = 'gte'
  JSONModel.transmissionTypes = params.gearBox
  JSONModel.sort = "price"
  JSONModel.limit = 20  // 20 pe o pagina
  //JSONModel.fields = []
  //JSONModel.page =
  JSONModel.name = params.model
  JSONModel.bodyType = params.style  //STYLE
  JSONModel.power = params.power
  //JSONModel.comparator2 = 'gte'
  JSONModel.price = params.price
  //JSONModel.comparator3 = 'gte'
  JSONModel.createdAt = params.year
  //JSONModel.originCountry =
  //JSONModel.numbersDoors =
  
 /// db acces

   // Filtering
   const queryObj = JSONModel
   console.log(queryObj + "<--------------------------")
   const excludedFields = ['page', 'sort', 'limit', 'fields'];
   excludedFields.forEach((el) => delete queryObj[el]);
 


   // Advance filtering
   let queryStr = JSON.stringify(queryObj);
   queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

   console.log(queryObj)
   console.log(queryObj)
   console.log(queryObj)
   console.log(queryObj)

   // eslint-disable-next-line prefer-const
  

   carModel.find({fuelTypes: queryObj.fuelTypes, transmissionTypes: queryObj.transmissionTypes ,
                  sort: queryObj.sort, name: queryObj.name, bodyType: queryObj.bodyType,
                  price: {"$gte": queryObj.price} , power: {"$gte": queryObj.power} , 
                  firstRegistr : {"$gte": queryObj.createdAt}
                  
  
  }, function (err, data) {
    if (!err) {
      console.log(data + '<============================')
     // res.redirect('/buyCar')
     res.render("buyCar2", {cars : data,  activeRoute :req.originalUrl, isAuction} );
    } else {
        throw err;
    }
   // res.render("buyCar2", {cars : data,  activeRoute :req.originalUrl, isAuction} )
}).clone().catch(function(err){ console.log(err)})

   
  
                        }));










app.post('/updateUser', urlencodedParser, function (req, res) {

  console.log(req.body)
/*
  let age = req.body.age
  let country = req.body.country;
  let city = req.body.city;
  let zip = req.body.zip;
  let emailActual = req.body.email;

  console.log(age,country,city,zip,emailActual)

  dbo.updateDataUser(age,country,city,zip,emailActual)  
  */
 
  
  
  let extra = {age: age,
    country: country,
    city: city,
    zip: zip,
    email : emailActual} 



    res.render('profile3', {
      user : req.oidc.user,
      extra: extra
    });
  });


/**fetch
 * 
 

 * 
 * 
 * 
 * 
 */

 






/**
 * Server Activation
 */

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
