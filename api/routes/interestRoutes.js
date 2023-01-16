/* eslint-disable prettier/prettier */
const express = require('express');

const interestController = require('../controllers/interestController');

const router = express.Router();

router.route('/').get(interestController.getAllInterests)
router.route('/:user_id/:car_id').post(interestController.createInterest);
router
  .route('/:id')
  .get(interestController.getInterestById)
  .patch(interestController.updateInterest)
  .delete(interestController.deleteInterest);


module.exports = router;
