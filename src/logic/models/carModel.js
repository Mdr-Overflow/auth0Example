/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const slugify = require('slugify');

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
  seller: {
    type: String,
    required: [true, 'Must contains a seller name'],
    enums: ['private', 'company'],
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
  validTo: {
    type: Date,
  },
  images: [String],
});

carSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
