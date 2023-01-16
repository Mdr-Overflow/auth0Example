const { response } = require('../../../api/app');

module.exports = {
    // move url to dotenv
    
        postCarUserId: function ( user_id, params) {    
          
            var request = require('request');
            var options = {
            'method': 'POST',
            'url': '127.0.0.1:8000/api/v1/cars/' +user_id ,
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
    
        updateCarById: function ( car_id , params){
            var request = require('request');
            var options = {
            'method': 'PATCH',
            'url': '127.0.0.1:8000/api/v1/cars/' + car_id,
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
    
        deleteCarById: function (car_id){
            
        var request = require('request');
        var options = {
        'method': 'DELETE',
        'url': '127.0.0.1:8000/api/v1/cars/' + car_id,
        'headers': {
        }
        };
        request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
        });


        return response.body
            
            },
            
        getCarById: function (car_id){
            var request = require('request');
            var options = {
            'method': 'GET',
            'url': '127.0.0.1:8000/api/v1/cars/' + car_id,
            'headers': {
            }
            };
            request(options, function (error, response) {
            if (error) throw new Error(error);
            console.log(response.body);
            });


            return response.body
        },
        // Auction Stuff
        // 
        // 
        getAuctionById: function(id) {
            var request = require('request');
            var options = {
            'method': 'GET',
            'url': '127.0.0.1:8000/api/v1/auctions/' + id,
            'headers': {
            }
            };
            request(options, function (error, response) {
            if (error) throw new Error(error);
            console.log(response.body);
            });
        },

        createAuction: function(car_id,user_id){
          
            var request = require('request');
            var options = {
            'method': 'POST',
            'url': '127.0.0.1:8000/api/v1/auctions/' +car_id + '/' +user_id,
            'headers': {
            }
            };
            request(options, function (error, response) {
            if (error) throw new Error(error);
            console.log(response.body);
            });


        },
        updateAuctionById: function(id) {
            var request = require('request');
            var options = {
            'method': 'PATCH',
            'url': '127.0.0.1:8000/api/v1/auctions/' + id,
            'headers': {
            }
            };
            request(options, function (error, response) {
            if (error) throw new Error(error);
            console.log(response.body);
            });
        },
        deleteAuctionById: function(id) {

        var request = require('request');
        var options = {
        'method': 'DELETE',
        'url': '127.0.0.1:8000/api/v1/auctions/' +id,
        'headers': {
        }
        };
        request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
        });
    },

    // OFFERS
        createOffer: function(user_id, auction_id) {

            var request = require('request');
            var options = {
            'method': 'POST',
            'url': '127.0.0.1:8000/api/v1/offers/' +user_id +'/'+ auction_id,
            'headers': {
            }
            };
            request(options, function (error, response) {
            if (error) throw new Error(error);
            console.log(response.body);
            });
        }

    };