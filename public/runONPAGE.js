
document.getElementById("SUBMIT").onclick = function () {
    var eModel = document.getElementById("MODEL");
    var eYear = document.getElementById("YEAR");
    var ePrice = document.getElementById("PRICE");
    var eStyle = document.getElementById("STYLE");
    var ePower = document.getElementById("POWER");
    var eGearBox = document.getElementById("GEARBOX");
    var eFuel = document.getElementById("FUEL");
    
    console.log(eModel.options[eModel.selectedIndex].text)

    var obj = new Object();
    obj.model = eModel.options[eModel.selectedIndex].text;
    obj.year  = eYear.options[eYear.selectedIndex].text;
    obj.price = ePrice.options[ePrice.selectedIndex].text;
    obj.style = eStyle.options[eStyle.selectedIndex].text;
    obj.power = ePower.options[ePower.selectedIndex].text;
    obj.gearBox =eGearBox.options[eGearBox.selectedIndex].text
    obj.fuel = eFuel.options[eFuel.selectedIndex].text
    var jsonString= JSON.stringify(obj);

    location.href = `/getter/getAllCars/${jsonString}`;
};