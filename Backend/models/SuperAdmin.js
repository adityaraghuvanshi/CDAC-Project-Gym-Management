const { required } = require('joi');
const mongoose = require('mongoose');
const APIError = require('../utils/apiError');

const superAdminSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique : true,
        },
        mobileNumber: {
            type: String,
            unique: true,
          },
        password: {
            type: String,
            required: true,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

//  eslint-disable-next-line
superAdminSchema.post('save', function handleError(error, doc, next) {

    if (error.name === 'MongoServerError' && error.code === 11000) {
      switch (Object.keys(error.keyPattern)[0]) {
        case 'mobileNumber':
          return next(new APIError('Mobile number already exists', 400));
        case 'username':
          return next(new APIError('Username already exists', 400));
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

const SuperAdmin = mongoose.model('superAdmin', superAdminSchema);

module.exports = SuperAdmin;