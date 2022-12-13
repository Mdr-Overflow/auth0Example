const { MongoClient } = require("mongodb");
const connectionString = process.env.ATLAS_URI;
const mclient = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var dbConnection;

module.exports = {
  connectToServer: function () {
    mclient.connect(function (err, client) {
      if (err || !client) {
        throw err
      }

      dbConnection = client.db("db-name");
      console.log("Successfully connected to MongoDB.");
      
      dbConnection.collection("users")
      .find({}).limit(50)
      .toArray(function (err, result) {
        if (err) {
         console.log(err)
       } else {
          console.log(result)
        }
      });
  })},

  updateData: function (age, country, city, zip, emailActual)
   {
    mclient.connect(function (err, client) {
      if (err || !client) {
        throw err
      }

      dbConnection = client.db("db-name");
      console.log("Successfully connected to MongoDB.");
      

    

     
    
    
        var updates = { $set: { role: 'user', 
        age: age  ,
        country: country ,
        city: city, 
        zip: zip ,
        ballance: 0 } };
      
      
        console.log(age,country,city,zip,emailActual)
    
      
      
      let users = dbConnection.collection('users');
      users.updateOne({email: emailActual}, updates, function (err, _result) {
            if (err) throw (err);
            console.log(_result)
            client.close()
          });
  
  });
  },

  getDb: function () {
    return dbConnection;
  },

  close: function() {
   mclient.close();
  }
  
};