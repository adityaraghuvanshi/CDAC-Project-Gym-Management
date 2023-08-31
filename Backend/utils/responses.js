const responses = {

    successfulRequest: (res, status, data) =>
    res.status(status).json({
      success: true,
      data,
    }),
    
    successfulRequestWithMessage: (res, status, data, message) =>
    res.status(status).json({
      success: true,
      message,
      data,
    }),

    failedRequest: (res, status, message) =>
    res.status(status).json({
      success: false,
      message,
    }),

    failedRequestWithErrors: (res, status, errors) => {
      res.status(status).json({
        success: false,
        errors,
      });
    },

};

module.exports = responses;