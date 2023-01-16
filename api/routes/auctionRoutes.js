/* eslint-disable prettier/prettier */
const express = require('express');

const auctionController = require('../controllers/auctionController');

const router = express.Router();

router.route('/').get(auctionController.getAllAuctions)
router.route('/:car_id/:seller_id').post(auctionController.createAuction);
router
  .route('/:id')
  .get(auctionController.getAuctionById)
  .patch(auctionController.updateAuction)
  .delete(auctionController.deleteAuction)

router.route('/:car_id/:seller_id').get(auctionController.getAuctionByCarId)
router
    .route('/offer/:offer_id/:auction_id')
    .post(auctionController.addOffer)
    .patch(auctionController.acceptOffer)

router.route('/accept/:bidder_id/:auction_id').post(auctionController.acceptBidder)
 

module.exports = router;
