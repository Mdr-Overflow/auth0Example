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

app.get("/auction/:car_id", (req, res) => {
  isAuction = true ;
  

  const Auction =
    {
        "_id": "63c5bfb5c35576a87b3e416e",
        "bidders": [
            {
                "_id": "63c4ccffa372b88904e608fa",
                "email_verified": false,
                "role": "viewer",
                "Interests": [],
                "Cars": [],
                "email": "andrei.madaras03@e-uvt.ro",
                "password": "aiaMICA",
                "age": 12,
                "phone_number": 91929310239233440000,
                "__v": 0
            }
        ],
        "offers": [
            {
                "_id": "63c5c2ef66fd3d39598f1b23",
                "moneySum": 112312,
                "isAccepted": false,
                "__v": 0,
                "Poster": "63c4d1c47e0a0e00127a3488"
            }
        ],
        "StartDate": "2012-04-21T23:25:43.000Z",
        "EndDate": "2012-04-23T23:25:43.000Z",
        "isOpen": false,
        "__v": 0,
        "car": {
            "_id": "63c59b0beb7e5d6c7eaa442a",
            "name": "alfa romeo",
            "fuelTypes": "diesel",
            "transmissionTypes": "automatic",
            "kilometers": 230,
            "firstRegistr": 2010,
            "power": 260,
            "bodyType": "Sedan",
            "originCountry": "Italy",
            "numbersDoors": 4,
            "taxi": "No",
            "damage": "No",
            "summary": "The Alfa Romeo Brera was a sports car produced by the Italian automaker Alfa Romeo between 2005 and 2010. It was available as a coupé and a convertible. The Brera was powered by a range of gasoline engines, including a 2.2-liter four-cylinder, a 3.2-liter V6 and a 2.4-liter diesel engine. The top-of-the-line V6 engine produced 260 horsepower and could accelerate the car from 0 to 60 miles per hour in 6.5 seconds. The car had a six-speed manual transmission or optional six-speed automatic transmission. The Brera had a top speed of 250 km/h. The car had a curb weight of 1,527 kg.",
            "price": 40,
            "createdAt": "2023-01-16T18:27:42.040Z",
            "Interests": [],
            "images": [],
            "slug": "alfa-romeo",
            "__v": 0,
            "Seller": "63c4d1c47e0a0e00127a3488"
        },
        "seller": {
            "Interests": [],
            "_id": "63c4d1c47e0a0e00127a3488",
            "tenant": "dev-03zq1t4qmosoc326",
            "connection": "MongoDB",
            "email": "andrei.madaras01@e-uvt.ro",
            "password": "$2b$10$FCwvO.8/dwps4X0AX.GjieyNc5YNJE5bSSR3R9JO1CeXtssebgmZm",
            "debug": true,
            "email_verified": false,
            "role": "viewer",
            "age": 13,
            "phone_number": 9.192931023923345e+22,
            "Cars": [
                "63c4d263eb071b8edcf0d258",
                "63c59737eb7e5d6c7eaa4418",
                "63c59992eb7e5d6c7eaa4420",
                "63c59a26eb7e5d6c7eaa4425",
                "63c59b0beb7e5d6c7eaa442a",
                "63c59bbaeb7e5d6c7eaa442f",
                "63c59c8ceb7e5d6c7eaa4434",
                "63c59d41eb7e5d6c7eaa4439",
                "63c59ed9eb7e5d6c7eaa443e",
                "63c5a084eb7e5d6c7eaa4443",
                "63c5a9c7eb7e5d6c7eaa446c",
                "63c5ad55eb7e5d6c7eaa4477",
                "63c5addfeb7e5d6c7eaa447c",
                "63c5adeceb7e5d6c7eaa4481",
                "63c5ae09eb7e5d6c7eaa4486",
                "63c5ae15eb7e5d6c7eaa448b",
                "63c5ae22eb7e5d6c7eaa4490",
                "63c5ae33eb7e5d6c7eaa4495",
                "63c5ae4ceb7e5d6c7eaa449c",
                "63c5ae56eb7e5d6c7eaa44a1",
                "63c5ae61eb7e5d6c7eaa44a6",
                "63c5ae6deb7e5d6c7eaa44ab",
                "63c5ae77eb7e5d6c7eaa44b0",
                "63c5ae82eb7e5d6c7eaa44b5",
                "63c5ae90eb7e5d6c7eaa44ba",
                "63c5ae9deb7e5d6c7eaa44bf",
                "63c5aea6eb7e5d6c7eaa44c4",
                "63c5af74eb7e5d6c7eaa44cb",
                "63c5af7eeb7e5d6c7eaa44d0",
                "63c5af8aeb7e5d6c7eaa44d5",
                "63c5af94eb7e5d6c7eaa44da",
                "63c5b061eb7e5d6c7eaa44df",
                "63c5b0c9eb7e5d6c7eaa44e4",
                "63c5b121eb7e5d6c7eaa44e9",
                "63c5b1a6eb7e5d6c7eaa44ee",
                "63c5b1eeeb7e5d6c7eaa44f3",
                "63c5b384eb7e5d6c7eaa44f8",
                "63c5b53deb7e5d6c7eaa44fd",
                "63c5b606eb7e5d6c7eaa4502",
                "63c5b6ddeb7e5d6c7eaa4507",
                "63c5b748eb7e5d6c7eaa450c",
                "63c5b7eceb7e5d6c7eaa4511",
                "63c5b82deb7e5d6c7eaa4516",
                "63c5b93beb7e5d6c7eaa451b",
                "63c5ba46eb7e5d6c7eaa4520",
                "63c5bbcaeb7e5d6c7eaa4525",
                "63c5bc2aeb7e5d6c7eaa452a",
                "63c5bc84eb7e5d6c7eaa452f",
                "63c5bcc8eb7e5d6c7eaa4534",
                "63c5bd6beb7e5d6c7eaa4539",
                "63c5bdffeb7e5d6c7eaa453e",
                "63c5be34eb7e5d6c7eaa4543",
                "63c5beabeb7e5d6c7eaa4548",
                "63c5bec7eb7e5d6c7eaa454d",
                "63c5bf3beb7e5d6c7eaa4554",
                "63c5c02aeb7e5d6c7eaa4559",
                "63c5c11feb7e5d6c7eaa455e",
                "63c5c1a5eb7e5d6c7eaa4563",
                "63c5c1d4eb7e5d6c7eaa4568"
            ]
        }
    }


    const Car = {
      "_id": "63c59b0beb7e5d6c7eaa442a",
      "name": "audi",
      "fuelTypes": "diesel",
      "transmissionTypes": "automatic",
      "kilometers": 230,
      "firstRegistr": 2010,
      "power": 260,
      "bodyType": "Sedan",
      "originCountry": "Italy",
      "numbersDoors": 4,
      "taxi": "No",
      "damage": "No",
      "summary": "The Alfa Romeo Brera was a sports car produced by the Italian automaker Alfa Romeo between 2005 and 2010. It was available as a coupé and a convertible. The Brera was powered by a range of gasoline engines, including a 2.2-liter four-cylinder, a 3.2-liter V6 and a 2.4-liter diesel engine. The top-of-the-line V6 engine produced 260 horsepower and could accelerate the car from 0 to 60 miles per hour in 6.5 seconds. The car had a six-speed manual transmission or optional six-speed automatic transmission. The Brera had a top speed of 250 km/h. The car had a curb weight of 1,527 kg.",
      "price": 4000,
      "createdAt": "2023-01-16T18:27:42.040Z",
      "Interests": [],
      "images": [],
      "slug": "alfa-romeo",
      "__v": 0,
      "Seller": "63c4d1c47e0a0e00127a3488"
  }

  // :< (Nu te uita aici) 








  car_id2 = req.params.car_id
  console.log(car_id2)
  console.log(car_id2)
  console.log(car_id2)
  console.log(car_id2)
  //const carID =  getStuffWithPopulate( new ObjectId(car_id2))
    





  res.render("auction", { activeRoute: req.originalUrl , car : Car , isAuction });
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
