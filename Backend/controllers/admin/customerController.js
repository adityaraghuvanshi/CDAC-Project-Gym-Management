const mongoose = require('mongoose');
const Gym = require('../../models/Gym');
const Customer = require('../../models/Customer');
const APIError = require('../../utils/apiError');
const authHelper = require('../../helpers/authHelper');
const { successfulRequest, failedRequest } = require('../../utils/responses');

const authController = {

    addCustomer : async(req, res, next) => {

        const headers = req.headers;

        const adminId = await authHelper.decodeToken(headers);
        

        const {name, address, age, mobileNumber, weight, height} = req.body;

        const session= await mongoose.startSession();
        session.startTransaction();
    
        let customer;
    
        try{
            let date = Date();
            const subscribedUpto = new Date(date);
            console.log(subscribedUpto);

            customer = await Customer.create(
                [{name, address, age, mobileNumber, weight, height, subscribedUpto, gym:adminId}],
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
    
        return successfulRequest(res, 201, {customer:customer[0]});

    },

    getAllCustomers : async (req, res, next) =>{

        const headers = req.headers;

        const adminId = await authHelper.decodeToken(headers);
        

        try{
            
            const customers = await Customer.find({"gym" : adminId});
            return successfulRequest(res, 200, {customers});

        }catch(error){
            console.error(error);
            return next(new APIError(error.message, error.code));
        }
        
        
        
    },

    getCustomerById : async (req, res, next) =>{

        const {id} = req.query;

        const headers = req.headers;

        const adminId = await authHelper.decodeToken(headers);
        

        if(!id){
            return failedRequest(res, 400, "Invalid Customer ID");
        }

        try{
            const customer = await Customer.findById(id);
    
            if(!customer){
                return failedRequest(res, 404, "Customer not found");
            }

            if(customer.gym.toString() !== adminId){
                return failedRequest(res, 404, "This customer is not registered in your Gym");
            }

            return successfulRequest(res, 200, {customer});

        }catch(error){
            console.error(error);
            return next(new APIError(error.message, error.code));
        }
        
        
        
    },

    updateCustomer : async(req, res, next) => {
        const id = req.query.id;
        const {name, address, age, mobileNumber, weight, height} = req.body;
    
        let customer = await Customer.findById(id);

        if(!customer){
            return next(new APIError("Customer not found", 400));
        }

        if(customer.mobileNumber!==mobileNumber){
            let cust = await Customer.find({mobileNumber});
            if(cust.length>0){
                return failedRequest(res, 400, "This mobile number is already used");
            }
        }


    
        try{

            customer = await Customer.findByIdAndUpdate(
                id,
                {name, address, age, mobileNumber, weight, height},
                {new:true}
            );

            if (!customer) {
                return next(new APIError("Customer not found", 400));
            }

        }catch(error){
            console.error(error);
            return next(new APIError(error.message, error.code));
        }
    
        return successfulRequest(res, 200, {customer});

    },

    deleteCustomer: async (req, res, next) =>{

        const customerId = req.query.id;

        let customer;
    
        try{

            customer = await Customer.findByIdAndDelete(customerId);

            if (!customer) {
                return next(new APIError("Customer not found", 404));
            }

        }catch(error){
            console.error(error);
            return next(new APIError(error.message, error.code));
        }
    
        return successfulRequest(res, 200, {customer});
    
    },

};

module.exports = authController;