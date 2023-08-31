const { required } = require('joi');
const mongoose = require('mongoose');
const APIError = require('../utils/apiError');

const customerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: true,
        },
        mobileNumber: {
            type: String,
            unique: true,
            required: true,
          },
        weight: {
            type: Number,
            required: true
          },
        height: {
            type: Number,
            required: true,
        },
        subscribedUpto: {
          type: Date,
          required: true,
        },
        gym:{
          type: mongoose.Types.ObjectId,
          ref: 'Gym',
          required: true,
        }
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

//  eslint-disable-next-line
customerSchema.post('save', function handleError(error, doc, next) {

    if (error.name === 'MongoServerError' && error.code === 11000) {
      switch (Object.keys(error.keyPattern)[0]) {
        case 'mobileNumber':
          return next(new APIError('Mobile number already exists', 400));
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

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;