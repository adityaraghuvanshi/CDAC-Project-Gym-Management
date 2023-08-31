const express = require('express');
const cors = require('cors');
const app = express();
const superAdminRoutes = require('./routes/superAdminRoutes');
const adminRoutes = require('./routes/adminRoutes');
const errorController = require('./controllers/errorController');

app.use(cors());

app.use(
    express.json({
      inflate: true,
      limit: '10kb',
      strict: true,
    })
);

app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/superadmin", superAdminRoutes);

app.use('*', errorController);


module.exports = app;