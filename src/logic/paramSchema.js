
module.exports = {

   getSchemas: function() { 


    let GetAllCarsjsonSchema = '{ "fuelTypes":"X", ' + 
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

    const vvv= JSON.parse(GetAllCarsjsonSchema)
    console.log(vvv.price)
    
    //let  /// --->< Aici
    // PARSEAZA-MA GREU SI EFECTIV NU STIU
    /*
    
      */


    let userUpdateParam = '{ "email":"X" , ' +
    '{ "email_verified":"X" , ' +
    '{ "role":"X" , ' +
    '{ "phone_number":"X" , ' +
    '{ "age":"X" , ' +
    '{ "Balance":"X" , ' +  
    '{ "Profile_picture":"X"  ' +
    ' }'

    JSON.parse(userUpdateParam)

    let carParam = '{ "name":"X" , ' +
    '{ "fuelTypes":"X" , ' +
    '{ "transmissionTypes":"X" , ' +
    '{ "kilometers":"X" , ' +
    '{ "firstRegistr":"X" , ' +
    '{ "power":"X" , ' +  
    '{ "bodyType":"X" , ' +
    '{ "color":"X" , ' +
    '{ "originCountry":"X" , ' +
    '{ "emission":"X" , ' +
    '{ "numbersDoors":"X" , ' +
    '{ "taxi":"X" , ' +
    '{ "damage":"X" , ' +
    '{ "summary":"X" , ' +
    '{ "price":"X" , ' +
    '{ "createdAt":"X" , ' +
    '{ "validFrom":"X" , ' +
    '{ "validTo":"X" , ' +
    '{ "images": [ "X" ] , ' +
    ' }'

    JSON.parse(carParam)

    let  offerParam = '{ "moneySum":"X" , ' +
    '{ "postDate":"X" , ' +
    '{ "isAccepted":"X" , ' +
    '{ "isFinal":"X" , ' +

    ' }'

    JSON.parse(offerParam)

    let auctionParam ='{ "StartDate":"X" , ' +
    '{ "EndDate":"X" , ' +
    '{ "isOpen":"X" , ' +
    ' }'

    JSON.parse(auctionParam)
    

   }



}