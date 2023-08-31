const mongoose = require('mongoose');
// const User = require('../../models/User');
const SuperAdmin = require('../../models/SuperAdmin');
const Gym = require('../../models/Gym');
const APIError = require('../../utils/apiError');
const authHelper = require('../../helpers/authHelper');
const { successfulRequest, failedRequest } = require('../../utils/responses');

const gymController = {

    addGym: async (req, res, next) =>{

        const {gymName, adminName, address, username, mobileNumber, password} = req.body;

        const session= await mongoose.startSession();
        session.startTransaction();
    
        let gym;
    
        try{

            gym = await Gym.create(
                [{gymName, adminName, address, username, mobileNumber, password}],
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
            gym : gym[0]
        });
    
    },

    updateGym: async (req, res, next) =>{

        const gymId = req.query.id;
        const { gymName, adminName, address, username, mobileNumber, password} = req.body;

        let gym;
    
        try{

            gym = await Gym.findByIdAndUpdate(
                gymId,
                {gymName, adminName, address, username, mobileNumber, password},
                {new: true}
            );

            if (!gym) {
                return next(new APIError("Gym not found", 400));
            }

        }catch(error){
            console.error(error);
            return next(new APIError(error.message, error.code));
        }
    
        return successfulRequest(res, 200, {gym});
    
    },

    deleteGym: async (req, res, next) =>{

        const gymId = req.query.id;

        let gym;
    
        try{

            gym = await Gym.findByIdAndDelete(gymId);

            if (!gym) {
                return next(new APIError("Gym not found", 404));
            }

        }catch(error){
            console.error(error);
            return next(new APIError(error.message, error.code));
        }
    
        return successfulRequest(res, 200, {gym});
    
    },

    getAllGyms : async (req, res, next) =>{


        try{
            
            const gyms = await Gym.find();
            return successfulRequest(res, 200, {gyms});

        }catch(error){
            console.error(error);
            return next(new APIError(error.message, error.code));
        }
        
        
        
    },

    getGymById : async (req, res, next) =>{

        const {id} = req.query;

        if(!id){
            return failedRequest(res, 400, "Invalid Gym ID");
        }

        try{
            const gym = await Gym.findOne({_id : id});
    
            if(!gym){
                return failedRequest(res, 404, "Gym not found");
            }

            return successfulRequest(res, 200, {gym});

        }catch(error){
            console.error(error);
            return next(new APIError(error.message, error.code));
        }
        
        
        
    },

};

module.exports = gymController;