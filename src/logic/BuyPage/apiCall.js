const { response, param } = require('../../../api/app');


//

let jsonSchema = '{ "fuelTypes":"X", ' + 
'"kilometers":"X" , '+
'"comparator":"X" , '+
'"transmissionTypes":"X" , '  + 
'"sort":"X" , '  + 
'"limit":"X" , '  + 
'"fields":"X,Y" , '+                  // must be like name,filed2,field3
'"page":"X" , '  + 
'"name":"X" , '  + 
'"bodyType":"X" , '  + 
'"power":"X" , '  + 
'"comparator2":"X" , '  + 
'"price":"X" , '  + 
'"comparator3":"X" , '  + 
'"originCountry":"X" , '  + 
'"numbersDoors":"X" }'; 

JSON.parse(jsonSchema)
//
//

module.exports = {
    // move url to dotenv
            
        getCarById: async function (car_id){
            var request = require('request');
            var options = {
            'method': 'GET',
            'url': 'http://127.0.0.1:8000/api/v1/cars/' + car_id,
            'headers': {
            }
            };
            request(options, function (error, response) {
            if (error) throw new Error(error);
            console.log(response.body);
            });


            return response.body
        },
        
        getAllCars: async function(params){

            

            var request = require('request');
        
            if (!params) {
                var options = {
                'method': 'GET',
                'url': 'http://127.0.0.1:8000/api/v1/cars',
                'headers': {
                }
            };}
            else {
                
                //buci
                // gte|gt|lte|lt args.comparator

                 var args = params
                //&name=nissan&bodyType=suv&power[gte]=123&price[gte]=123&originCountry=Zimbabwe&numbersDoors=4
                var options1 = {
                    'method': 'GET',
                    'url': 'http://127.0.0.1:8000/api/v1/cars?fuelTypes='+ args.fuelTypes + 
                    '&kilometers' + args.comparator  + '=' + args.kilometers +
                    '&transmissionTypes=' +args.transmissionTypes + 
                    '&sort=' +args.sort + 
                    '&limit='+args.limit + 
                    '&fields='+ args.fields +  // must be like name,filed2,field3
                    '&page=' +args.page +
                    '&name=' +args.name +
                    '&bodyType=' +args.bodyType +
                    '&power' + args.comparator2 + '=' +args.power +
                    '&price' + args.comparator3 + '=' +args.price +
                    '&originCountry=' + args.originCountry +
                    '&numbersDoors=' + args.numbersDoors 
                    ,
                    'headers': {
                    }
            }
                 var options =   {
                    'method': 'GET',
                    'url': 'http://127.0.0.1:8000/api/v1/cars?fuelTypes='+ args.fuelTypes + 
                    
                    '&transmissionTypes=' +args.transmissionTypes + 
                    '&sort=' +args.sort + 
                    '&limit='+args.limit + 
                    '&firstRegistr['  + args.comparator + ']=' +args.createdAt +
                    
                    '&name=' +args.name +
                    '&bodyType=' +args.bodyType +
                    '&power[' + args.comparator2 + ']=' +args.power +
                    '&price[' + args.comparator3 + ']=' + args.price 
                     
                    ,
                    'headers': {
                    }
                        

            }

        }
            console.log(options)
            request(options, function (error, request,) {
            if (error) throw new Error(error);
            
            console.log(request.body)
            /////// PIZDA GIGANTICA AICI
            var Jres = JSON.parse(request.body)
            console.log(Jres.data.car)
            return Jres.data.car
            });
            
        }
        

    };