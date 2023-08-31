const authController = require("./authController");
const trainerController = require("./trainerController");
const customerController = require("./customerController");
const subscriptionController = require("./subscriptionController");


const controller = {

    adminLogin: authController.login,
    getGymDetails: authController.getGymDetails,


    updateSubscription: subscriptionController.updateSubscription,
    applySubscription: subscriptionController.applySubscription,
    

    addCustomer : customerController.addCustomer,
    updateCustomer : customerController.updateCustomer,
    deleteCustomer : customerController.deleteCustomer,

    getAllCustomers : customerController.getAllCustomers,
    getCustomerById : customerController.getCustomerById,


    addTrainer : trainerController.addTrainer,
    getAllTrainers : trainerController.getAllTrainers,
    deleteTrainer : trainerController.deleteTrainer,

};

module.exports = controller;