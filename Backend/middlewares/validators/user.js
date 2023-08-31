const Joi = require("joi");
const mongoose = require("mongoose");
const { failedRequestWithErrors } = require("../../utils/responses");
const APIError = require("../../utils/apiError");
const Gym = require("../../models/Gym");
const SuperAdmin = require("../../models/SuperAdmin");
const { successfulRequest, failedRequest } = require("../../utils/responses");
const authHelper = require("../../helpers/authHelper");

const userValidators = {
    addGym: async (req, res, next) => {
        /*  Check if request is coming from Admin    */
        const userId = await authHelper.decodeToken(req.headers);

        if (userId == null || userId == "") {
            return failedRequest(res, 400, "Please Login first.");
        }

        const session = await mongoose.startSession();
        session.startTransaction();

        let user = await SuperAdmin.findById(userId);

        if (!user || user == null) {
            return failedRequest(
                res,
                404,
                "Super Admin not found. Please login again."
            );
        }

        /* Check Completed */

        const schema = Joi.object({
            gymName: Joi.string().error((errors) => {
                errors.forEach((err) => {
                    switch (err.code) {
                        case "any.required":
                            err.message = "Gym name is required";
                            break;
                        default:
                            err.message = "Invalid input for Gym name";
                    }
                });
                return errors;
            }),
            adminName: Joi.string()
                .required()
                .error((errors) => {
                    errors.forEach((err) => {
                        switch (err.code) {
                            case "any.required":
                                err.message = "Admin name is required";
                                break;
                            default:
                                err.message = "Invalid input for admin name";
                        }
                    });
                    return errors;
                }),
            address: Joi.string()
                .required()
                .error((errors) => {
                    errors.forEach((err) => {
                        switch (err.code) {
                            case "any.required":
                                err.message = "Address is required";
                                break;
                            default:
                                err.message = "Invalid input for address";
                        }
                    });
                    return errors;
                }),
            mobileNumber: Joi.string()
                .pattern(new RegExp(/^\+91[0-9]{10}$/i))
                .error((errors) => {
                    errors.forEach((err) => {
                        switch (err.code) {
                            case "any.required":
                                err.message = "Mobile number is required";
                                break;
                            case "string.pattern.base":
                                err.message =
                                    "Please enter a valid mobile number";
                                break;
                            default:
                                err.message = "Invalid input for mobile number";
                        }
                    });
                    return errors;
                }),
            password: Joi.string()
                .required()
                .error((errors) => {
                    errors.forEach((err) => {
                        switch (err.code) {
                            case "any.required":
                                err.message = "Password is required";
                                break;
                            default:
                                err.message = "Invalid input for password";
                        }
                    });
                    return errors;
                }),
        });
        const result = schema.validate(req.body, {
            abortEarly: false,
        });
        if (result?.error?.details?.length > 0) {
            const errors = result.error.details.map((el) => ({
                path: el.path[0],
                message: el.message,
            }));
        }
        return next();
    },

    verifyGymAdmin: async (req, res, next) => {
        const userId = await authHelper.decodeToken(req.headers);

        if (userId == null || userId == "") {
            return failedRequest(res, 400, "Please Login first.");
        }

        const session = await mongoose.startSession();
        session.startTransaction();

        let user = await Gym.findById(userId);

        if (!user || user == null) {
            return failedRequest(
                res,
                404,
                "User not found. Please login again."
            );
        }

        return next();
    },

    verifySuperAdmin: async (req, res, next) => {
        const userId = await authHelper.decodeToken(req.headers);

        if (userId == null || userId == "") {
            return failedRequest(res, 400, "Please Login first.");
        }

        const session = await mongoose.startSession();
        session.startTransaction();

        let user = await SuperAdmin.findById(userId);

        if (!user || user == null) {
            return failedRequest(
                res,
                404,
                "User not found. Please login again."
            );
        }

        return next();
    },
};

module.exports = userValidators;
