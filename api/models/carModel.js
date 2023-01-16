/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const slugify = require('slugify');



const interestModel = require('../models/interestModel');

var ObjectId = require('mongoose').Types.ObjectId; 

const carSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Must contains a name'],
    enum: [
      'abarth',
      'acura',
      'aixam',
      'alfa romeo',
      'aston martin',
      'audi',
      'bentley',
      'bmw',
      'bugatti',
      'cadillac',
      'chevrolet',
      'citroen',
      'citroën',
      'cupra',
      'dacia',
      'daewoo',
      'dodge',
      'ds automobiles',
      'ferrari',
      'fiat',
      'ford',
      'gmc',
      'honda',
      'hummer',
      'hyundai',
      'infiniti',
      'izuzu',
      'iveco',
      'jaguar',
      'jeep',
      'kia',
      'land rover',
      'lexus',
      'lotus',
      'maserati',
      'maybach',
      'mazda',
      'mclaren',
      'mercedes-benz',
      'mini',
      'mitsubishi',
      'nissan',
      'opel',
      'peugeot',
      'pontiac',
      'porsche',
      'renault',
      'rolls-royce',
      'rover',
      'saab',
      'seat',
      'skoda',
      'smart',
      'ssangyong',
      'subaru',
      'suzuki',
      'tesla',
      'toyota',
      'volkswagen',
      'volvo',
    ],
  },
  slug: String,
  fuelTypes: {
    type: String,
    required: [true, 'Must contains a fuel type'],
    enums: ['petrol', 'electric', 'lpg', 'hybrid', 'diesel'],
    default: 'petrol',
  },
  transmissionTypes: {
    type: String,
    required: [true, 'Must contains a transmission type'],
    enums: ['automatic', 'manual'],
    default: 'automatic',
  },
  kilometers: {
    type: Number,
    required: [true, 'Must contains a kilometer number'],
  },
  firstRegistr: {
    type: Number,
    required: [true, 'Must contains a register data'],
  },
  power: {
    type: Number,
    required: [true, 'Must contains a power number'],
  },
  bodyType: {
    type: String,
    required: [true, 'Must contains a body type'],
    enums: ['cabrio', 'combi', 'compact', 'coupe', 'suv'],
  },
  color: {
    type: String,
  },
  originCountry: {
    type: String,
    required: [true, 'Must contains a country name'],
  },
  Seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
   
  },
  emission: {
    type: String,
  }, 
  numbersDoors: {
    type: Number,
    required: [true, 'Must contains a number of doors'],
  },
  taxi: {
    type: String,
    required: [true, 'Must contains if it was a taxi or not'],
    default: 'No',
  },
  damage: {
    type: String,
    required: [true, 'Must contains if it had a damage'],
    default: 'No',
  },
  summary: {
    type: String,
    required: [true, 'Must contains a summary'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Must contains a price'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  validFrom: {
    type: Date,
  },
  Interests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Interest"                 //litera mare la inceput - numele tabelei
    }
  ],
  validTo: {
    type: Date,
  },
  images: [String],
  views: {
    type: Number,
  }
}, { collection: 'cars' });

carSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

//must delete images on delete

// PRE-HOOK FOR DELETING "CASCADE-STYLE"
carSchema.pre('remove',  async function(next) {
  console.log('this gets printed first');
  
  //Interests
  console.log(this)
  console.log(this.id)
  console.log(new mongoose.Types.ObjectId(this.id))
  
  var query = { Car: new ObjectId(this.id) };
  
  console.log(this.Interests.length)
  var size = this.Interests.length

  if (size != 0){
      do {
      const rez = await interestModel.findOneAndRemove( query )
      console.log(rez)
      size= size-1;
      } while (size != 0)
  }

  // auction 
  


    //in CAR, USER controllers - delete image, update image , upload image -> changes the string there , la User ii ez , la Car ii mai greu
    // stuff close to the $pull thingy , or $push
    
    // for image deletion on car deletion
    // stuff like :  this.images , query = ( image_src : this.images ) , imageModel.findOneAndRemove( query )  in while loop

  next();
});


const Car = mongoose.model('Car', carSchema);

module.exports = Car;
