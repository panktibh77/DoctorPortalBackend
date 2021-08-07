const express = require('express');
const cors = require("cors");
const app = express();
const Users = require("./controllers/UsersController");
const Auth = require("./controllers/AuthController");
const Patient = require("./controllers/PatientController");

app.use(cors());
app.use(express.json());
// route(app);
// app.use(route);
app.use('/user',Users);
app.use('/auth', Auth);
app.use('/patient', Patient);

export default app;
// module.exports = app;