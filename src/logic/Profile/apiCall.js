const { response } = require('../../../api/app');


module.exports = {
// move url to dotenv
    // get interests from here
    getUserById: function ( id) {    
        var request = require('request');
        var options = {
            'method': 'GET',
            'url': '127.0.0.1:8000/api/v1/users/' +id,
            'headers': {
            }
        }
        
        request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
        });

        return response.body
    },

    updateUserById: function ( id , params){

     var request = require('request');
      var options = {
        'method': 'PATCH',
        'url': '127.0.0.1:8000/api/v1/users/' + id,
        'headers': {
            'Content-Type': 'application/json'
        },
        

        body: JSON.stringify(params)

        };

        request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
        });
        return response.body
    },

    deleteUserById: function (id){

        var request = require('request');
        var options = {
        'method': 'DELETE',
        'url': '127.0.0.1:8000/api/v1/users/'+ id,
        'headers': {
        }
        };
        request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
        });

        return response.body

        }
        
      



};