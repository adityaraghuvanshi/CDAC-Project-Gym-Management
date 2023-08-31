const express = require('express');
const router = express.Router();
const userController = require('../controllers/admin');
const userValidators = require('../middlewares/validators/user');



// admin/
router.post("/login", userController.adminLogin);   //Admin login

router.get("/gym", userValidators.verifyGymAdmin, userController.getGymDetails);   //Get gym details

router.post("/customer/add", userValidators.verifyGymAdmin, userController.addCustomer);  //Add new customer
router.patch("/customer", userValidators.verifyGymAdmin, userController.updateCustomer);  //Update Customer
router.delete("/customer", userValidators.verifyGymAdmin, userController.deleteCustomer);  //Delete Customer
router.get("/customer", userValidators.verifyGymAdmin, userController.getCustomerById);  //Get Customer by ID
router.post("/customer/subscribe", userValidators.verifyGymAdmin, userController.applySubscription);  //apply subscription to a customer

router.get("/customers/all", userValidators.verifyGymAdmin, userController.getAllCustomers);  //Get all customers

router.patch("/subscription", userValidators.verifyGymAdmin, userController.updateSubscription);  //update subscription


router.delete("/trainer", userValidators.verifyGymAdmin, userController.deleteTrainer);  //delete trainer
router.post("/trainer/add", userValidators.verifyGymAdmin, userController.addTrainer);  //Add new trainer
router.get("/trainers/all", userValidators.verifyGymAdmin, userController.getAllTrainers);  //get all trainers



module.exports = router;