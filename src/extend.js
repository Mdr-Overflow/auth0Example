///
const MONGO_PASSWORD = 'DDcytac9rIpwJ0Xp'
///

function create(callback) {
    const bcrypt = require('bcrypt');
    const MongoClient = require('mongodb@3.1.4').MongoClient;
    const client = new MongoClient('mongodb+srv://Mandrei:'+MONGO_PASSWORD+'@cluster0.xuf1qrn.mongodb.net/?retryWrites=true&w=majority');
  

    client.connect(function (err) {
        if (err) return callback(err);
    
        const db = client.db('db-name');
        const users = db.collection('users');
    
        let age = document.getElementById("age").value
        let country = document.getElementById("country").value
        let city = document.getElementById("city").value
        let zip = document.getElementById("zip").value
        let email = document.getElementById("email").value
        let newPassword = document.getElementById("password").value

        bcrypt.hash(newPassword, 10, function (err, hash) {
          if (err) {
            client.close();
            return callback(err);
          }
    
          users.update({ email: email.toLowerCase() }, { $set: { password: hash }, $set: {role: 'user'}, 
          $set: { age: age } ,
          $set: { country: country },
          $set: { city: city }, 
          $set: { zip: zip },
          $set: { ballance: 0 }
        }, function (err, result) {
            client.close();
            if (err) return callback(err);
            callback(null, result.result.n > 0);
          });
        });
      });
    }