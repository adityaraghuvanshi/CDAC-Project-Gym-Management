const express = require('express');
const router = express.Router();
const superAdminController = require('../controllers/super_admin');
const userValidators = require('../middlewares/validators/user');



// superadmin/
router.post("/addnew", superAdminController.addSuperAdmin);   //Register new User
router.post("/login", superAdminController.superAdminLogin);    //Super Admin Login

// gyms
router.post("/gyms/add", userValidators.verifySuperAdmin, superAdminController.addGym);    //add new gym
router.get("/gyms/all", userValidators.verifySuperAdmin, superAdminController.getAllGyms);    //get all gyms
router.get("/gym", userValidators.verifySuperAdmin, superAdminController.getGymById);    //get single gym by ID
router.patch("/gym", userValidators.verifySuperAdmin, superAdminController.updateGym);    //update gym by ID
router.delete("/gym", userValidators.verifySuperAdmin, superAdminController.deleteGym);    //delete gym by ID

// router.get("/", superAdminController.getUser);    //Get users
// router.delete("/", userValidators.verifyAdmin,  superAdminController.deleteUser);  //Delete user

// users/login
// router.post("/login", superAdminController.userLogin);    //Login a user



module.exports = router;