const Gym = require('../../models/Gym');
const Customer = require('../../models/Customer');
const APIError = require('../../utils/apiError');
const authHelper = require('../../helpers/authHelper');
const { successfulRequest, failedRequest } = require('../../utils/responses');

const subscriptionController = {

    updateSubscription : async(req, res, next) => {
        const headers = req.headers;
        const id = await authHelper.decodeToken(headers);

        const {silverMonthly, silverAnnual, goldMonthly, goldAnnual, platinumMonthly, platinumAnnual} = req.body;
    
        let gym = await Gym.findById(id);

        if(!gym){
            return next(new APIError("Gym not found. Please try logging in again.", 400));
        }
    
        try{

            gym = await Gym.findByIdAndUpdate(
                id,
                {silverMonthly, silverAnnual, goldMonthly, goldAnnual, platinumMonthly, platinumAnnual},
                {new:true}
            );

            if (!gym) {
                return next(new APIError("Gym not found", 400));
            }

            return successfulRequest(res, 200, {gym});

        }catch(error){
            console.error(error);
            return next(new APIError(error.message, error.code));
        }
    
        

    },

    applySubscription : async(req, res, next) => {
        const headers = req.headers;
        const id = await authHelper.decodeToken(headers);

        const {days, customerId} = req.body;
    
        let gym = await Gym.findById(id);

        if(!gym){
            return next(new APIError("Gym not found. Please try logging in again.", 400));
        }

        let customer = await Customer.findById(customerId);

        if(!customer){
            return next(new APIError("Customer not found. Please try again.", 400));
        }
    
        try{

            const subscriptionDate = customer.subscribedUpto;
            subscriptionDate.setDate(subscriptionDate.getDate() + days);
            
            customer = await Customer.findByIdAndUpdate(
                customerId,
                {subscribedUpto:subscriptionDate},
                {new:true}
            );

            if(!gym){
                return failedRequest(res, 400, "Unable to update subscription");
            }

            return successfulRequest(res, 200, {customer});

        }catch(error){
            console.error(error);
            return next(new APIError(error.message, error.code));
        }
    
        

    },

};

module.exports = subscriptionController;