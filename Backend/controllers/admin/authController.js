const mongoose = require('mongoose');
const Gym = require('../../models/Gym');
const APIError = require('../../utils/apiError');
const authHelper = require('../../helpers/authHelper');
const { successfulRequest, failedRequest } = require('../../utils/responses');

const authController = {

    login : async(req, res, next) => {
        const {username, password} = req.body;

        const admin = await Gym.findOne({"username" : username});

        if(admin==null){
            return failedRequest(res, 404, "No user found for the entered username.");
        }

        if(admin.password!=password){
            return failedRequest(res, 400, "Incorrect password.");
        }

        var token = await authHelper.createToken(admin);

        return successfulRequest(res, 200, {admin, token});

    },

    getGymDetails : async(req, res, next) => {
        
        const headers = req.headers;

        const adminId = await authHelper.decodeToken(headers);

        try{
            
            const gym = await Gym.findById(adminId);

            if(!gym){
                return failedRequest(res, 404, "No gym found. Please try loging in again.");
            }

            return successfulRequest(res, 200, {gym});

        }catch(error){
            console.error(error);
            return next(new APIError(error.message, error.code));
        }

    

    }

};

module.exports = authController;