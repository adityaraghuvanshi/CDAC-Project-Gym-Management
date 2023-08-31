const authController = require("./authController");
const gymController = require("./gymController");


const controller = {

    addSuperAdmin: authController.addSuperAdmin,
    superAdminLogin: authController.login,
    
    addGym: gymController.addGym,
    getAllGyms: gymController.getAllGyms,
    getGymById: gymController.getGymById,
    updateGym: gymController.updateGym,
    deleteGym: gymController.deleteGym,

};

module.exports = controller;