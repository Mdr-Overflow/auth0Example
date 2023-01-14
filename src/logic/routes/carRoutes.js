/* eslint-disable prettier/prettier */
const express = require('express');

const carController = require('../controllers/carController');

const router = express.Router();

router.route('/').get(carController.getAllCars).post(carController.createCar);
router
  .route('/:id')
  .get(carController.getCarById)
  .patch(carController.updateCar)
  .delete(carController.deleteCar);


module.exports = router;
