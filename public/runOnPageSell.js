document.getElementById("SAVE").onclick = function () {
    var eModel = document.getElementById("MODEL");
    var eKilometers = document.getElementById("kilometers");
    var eFirstRegistr = document.getElementById("firstRegistr");
    var eValidTo = document.getElementById("validTo");
    var eValidFrom = document.getElementById("validFrom");
    var ePower = document.getElementById("power");
    var eColor = document.getElementById("color");
    var eOriginCountry = document.getElementById("originCountry");
    var ePrice = document.getElementById("price");
    var eEmission = document.getElementById("emission");
    var eSummary = document.getElementById("summary");
    //get IMAGE 
    // hard stuff

    var eFuelType = "Petrol"
    var eTransmissionType = "Manual"
    var eBodyType = "Cabrio"
    var eNumbersDoors = "4"
    var eTaxi = "No"
    var eDamage = "No"

    //
    
    console.log(eModel.options[eModel.selectedIndex].text)

    var obj = new Object();
    obj.model = eModel.options[eModel.selectedIndex].text; // 

    
    obj.kilometers = eKilometers.value
    obj.firstRegistr  = eFirstRegistr.value
    obj.validTo = eValidTo.value
    obj.validFrom = eValidFrom.value
    obj.power = ePower.value
    obj.color = eColor.value
    obj.originCountry = eOriginCountry.value
    obj.price = ePrice.value
    obj.emission = eEmission.value
    obj.summary = eSummary.value /// textarea same as the others
    

    obj.FuelType = eFuelType
    obj.TransmissionType = eTransmissionType
    obj.BodyType = eBodyType
    obj.NumbersDoors = eNumbersDoors
    obj.Taxi = eTaxi
    obj.Damage = eDamage


    var jsonString= JSON.stringify(obj);

    location.href = `/sellCar/${jsonString}`;
};