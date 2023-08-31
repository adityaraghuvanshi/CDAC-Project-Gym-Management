const mongoose = require('mongoose');
// const User = require('../../models/User');
const SuperAdmin = require('../../models/SuperAdmin');
const Gym = require('../../models/Gym');
const APIError = require('../../utils/apiError');
const authHelper = require('../../helpers/authHelper');
const { successfulRequest, failedRequest } = require('../../utils/responses');

const authController = {

    addSuperAdmin: async (req, res, next) =>{

        const {name, username, mobileNumber, password} = req.body;

        const session= await mongoose.startSession();
        session.startTransaction();
    
        let superAdmin;
    
        try{

            superAdmin = await SuperAdmin.create(
                [{name, username, mobileNumber, password}],
                {session}
            );

            await session.commitTransaction();

        }catch(error){
            await session.abortTransaction();
            console.error(error);
            return next(new APIError(error.message, error.code));
        }finally{
            session.endSession();
        }
    
        return successfulRequest(res, 201, {
            superAdmin : superAdmin[0]
        });
    
    },

    login : async(req, res, next) => {
        const {username, password} = req.body;

        const superAdmin = await SuperAdmin.findOne({"username" : username});

        if(superAdmin==null){
            return failedRequest(res, 404, "No user found for the entered username.");
        }

        if(superAdmin.password!=password){
            return failedRequest(res, 400, "Incorrect password.");
        }

        var token = await authHelper.createToken(superAdmin);

        return successfulRequest(res, 200, {superAdmin, token});

    }
};

module.exports = authController;