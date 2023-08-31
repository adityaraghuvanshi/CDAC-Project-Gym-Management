const { required } = require('joi');
const mongoose = require('mongoose');
const APIError = require('../utils/apiError');

const gymSchema = new mongoose.Schema(
    {
        gymName: {
            type: String,
            required: true,
        },
        adminName: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true
        },
        mobileNumber: {
            type: String,
            required: true,
            unique: true,
          },
        username: {
            type: String,
            required: true,
            unique: true,
          },
        password: {
            type: String,
            required: true,
        },
        silverMonthly: {
            type: Number,
            required: true,
            default: 0,
        },
        silverAnnual: {
            type: Number,
            required: true,
            default: 0,
        },
        goldMonthly: {
            type: Number,
            required: true,
            default: 0,
        },
        goldAnnual: {
            type: Number,
            required: true,
            default: 0,
        },
        platinumMonthly: {
            type: Number,
            required: true,
            default: 0,
        },
        platinumAnnual: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

//  eslint-disable-next-line
gymSchema.post('save', function handleError(error, doc, next) {

    if (error.name === 'MongoServerError' && error.code === 11000) {
      switch (Object.keys(error.keyPattern)[0]) {
        case 'mobileNumber':
          return next(new APIError('Mobile number already exists', 400));
        case 'username':
          return next(new APIError('Username number already exists', 400));
        default:
          return next(new APIError('Something went wrong', 500));
      }
    } else {
      const vals = Object.values(error.errors);
      if (vals.length > 0) {
        return next(
          new APIError(
            vals[0]?.properties?.message || 'Something went wrong',
            400
          )
        );
      }
      return next();
    }
  });

const Gym = mongoose.model('Gym', gymSchema);

module.exports = Gym;