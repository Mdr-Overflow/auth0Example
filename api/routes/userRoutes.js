/* eslint-disable prettier/prettier */
const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();

router.route('/').get(userController.getAllUsers).post(userController.createUser);
router.route('/:user_id').get(userController.getUserById)
router
  .route('/:id')
  .patch(userController.updateUser)
  .delete(userController.deleteUser);


module.exports = router;
