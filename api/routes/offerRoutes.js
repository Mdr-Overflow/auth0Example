/* eslint-disable prettier/prettier */
const express = require('express');

const OfferController = require('../controllers/OfferController');

const router = express.Router();

router.route('/').get(OfferController.getAllOffers)
router.route('/:user_id').post(OfferController.createOffer);
router
  .route('/:id')
  .get(OfferController.getOfferById)
  .patch(OfferController.updateOffer)
  .delete(OfferController.deleteOffer);


module.exports = router;
