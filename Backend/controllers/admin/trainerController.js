const mongoose = require('mongoose');
const Gym = require('../../models/Gym');
const Trainer = require('../../models/Trainer');
const APIError = require('../../utils/apiError');
const authHelper = require('../../helpers/authHelper');
const { successfulRequest, failedRequest } = require('../../utils/responses');

const trainerController = {

    addTrainer : async(req, res, next) => {

        const headers = req.headers;
        const gymId = await authHelper.decodeToken(headers);
        

        const {name, address, mobileNumber} = req.body;

        const session= await mongoose.startSession();
        session.startTransaction();
    
        let trainer;
    
        try{
            
            trainer = await Trainer.create(
                [{name, address, mobileNumber, gym:gymId}],
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
    
        return successfulRequest(res, 201, {trainer:trainer[0]});

    },

    getAllTrainers : async(req, res, next) => {
        
        const headers = req.headers;
        const gymId = await authHelper.decodeToken(headers);

        const gym = await Gym.findById(gymId);

        if(!gym){
            return failedRequest(res, 404, "No gym found. Please try loging in again.");
        }

        try{
            
            let trainers = await Trainer.find({"gym" : gymId});

            return successfulRequest(res, 200, {trainers});

        }catch(error){
            console.error(error);
            return next(new APIError(error.message, error.code));
        }

    

    },

    deleteTrainer: async (req, res, next) =>{

        const trainerId = req.query.id;

        let trainer;
    
        try{

            trainer = await Trainer.findByIdAndDelete(trainerId);

            if (!trainer) {
                return next(new APIError("Trainer not found", 404));
            }

        }catch(error){
            console.error(error);
            return next(new APIError(error.message, error.code));
        }
    
        return successfulRequest(res, 200, {trainer});
    
    },

};

module.exports = trainerController;