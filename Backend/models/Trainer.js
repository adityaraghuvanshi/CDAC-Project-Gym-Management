const { required } = require('joi');
const mongoose = require('mongoose');
const APIError = require('../utils/apiError');

const trainerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        mobileNumber: {
            type: String,
            unique: true,
            required: true,
        },
        address: {
            type: String,
            required: true
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
trainerSchema.post('save', function handleError(error, doc, next) {

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

const Trainer = mongoose.model('trainer', trainerSchema);

module.exports = Trainer;