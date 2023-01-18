
module.exports = {

    getAllCarsjsonSchema : function(){
        
    let GetAllCarsjsonSchemaO = '{ "fuelTypes":"X", ' + 
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
    ' "createdAt":"X" , ' +
    '"numbersDoors":"X" }'; 

    let GetAllCarsjsonSchema = '{ "fuelTypes":"X", ' + 
    
   
    '"transmissionTypes":"X" , '  + 
    '"sort":"X" , '  + 
    
   
    '"name":"X" , '  + 
    '"bodyType":"X" , '  + 
    '"power":"X" , '  + 
    
    '"price":"X" , '  + 
    
   
    ' "createdAt":"X" ' + ' }'; 

    const vvv= JSON.parse(GetAllCarsjsonSchema)
    return vvv;

   },

   getUserUpdateParam : function(){
   
    let userUpdateParam = '{ "email":"X" , ' +
    ' "email_verified":"X" , ' +
    ' "role":"X" , ' +
    ' "phone_number":"X" , ' +
    ' "age":"X" , ' +
    ' "Balance":"X" , ' +  
    ' "Profile_picture":"X"  ' +
    ' }'

    const vvv= JSON.parse(userUpdateParam)
    return vvv;
   },

   getCarParam : function(){
   
    let carParam = '{ "name":"X" , ' +
    ' "fuelTypes":"X" , ' +
    ' "transmissionTypes":"X" , ' +
    ' "kilometers":"X" , ' +
    ' "firstRegistr":"X" , ' +
    ' "power":"X" , ' +  
    ' "bodyType":"X" , ' +
    ' "color":"X" , ' +
    ' "originCountry":"X" , ' +
    ' "emission":"X" , ' +
    ' "numbersDoors":"X" , ' +
    ' "taxi":"X" , ' +
    ' "damage":"X" , ' +
    ' "summary":"X" , ' +
    ' "price":"X" , ' +
    ' "validFrom":"X" , ' +
    ' "validTo":"X"  ' +
    ' }'


    const vvv= JSON.parse(carParam)
    return vvv;
   },


   getOfferParam : function(){

    let  offerParam = '{ "moneySum":"X" , ' +
    ' "postDate":"X" , ' +
    ' "isAccepted":"X" , ' +
    ' "isFinal":"X" , ' +

    ' }'
    const vvv= JSON.parse(offerParam)
    return vvv;

   },


   getAuctionParam: function() { 
    let auctionParam ='{ "StartDate":"X" , ' +
    ' "EndDate":"X" , ' +
    ' "isOpen":"X" , ' +
    ' }'

    const vvv= JSON.parse(offerParam)
    return vvv;

   }
    

  


   




}