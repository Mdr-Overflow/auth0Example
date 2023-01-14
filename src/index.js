/**
 * Required External Modules
 */

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
const connectionString = process.env.ATLAS_URI;

console.log(connectionString)

const dbclient = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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

let dbo = require("../db/conn.js");



 

/**
 * Routes Definitions
 */

// > Home

app.get("/", (req, res) => {
  res.render("home3", { activeRoute: req.originalUrl });
});

// > CarStore (buy)

app.get("/buyCar", (req, res) => {
  res.render("buyCar2", { activeRoute: req.originalUrl });
});

// > faq
app.get("/faq", (req, res) => {
  res.render("faq2", { activeRoute: req.originalUrl });
});

// > Coming Soon

app.get("/soon", (req, res) => {
  res.render("comingSoon", { });
});

// > CarStore (sell)
app.get("/sellCar", (req, res) => {
  res.render("sellCar2", { activeRoute: req.originalUrl });
});

// > Profile

app.get('/profile', requiresAuth(),(req, res) => {
  
  let ver = dbo.checkVerifyUser(req.oidc.user.email) 
  console.log(ver)
  res.render('profile3',{ user: req.oidc.user, isVerified: ver });
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



app.post('/updateUser', urlencodedParser, function (req, res) {

  console.log(req.body)

  let age = req.body.age
  let country = req.body.country;
  let city = req.body.city;
  let zip = req.body.zip;
  let emailActual = req.body.email;

  console.log(age,country,city,zip,emailActual)

  dbo.updateDataUser(age,country,city,zip,emailActual)  
  
  
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
