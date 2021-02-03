/* Main funtion of the REST API */

//Imports 
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");

//Create the app
const app = express();

//Establish the port where the app will run
const port = process.env.PORT || 3001;

/*Making sure the app uses different Express JS packages for
creating logs (morgan), parsing requests (body-parser) and 
make the resources available to other origins (cors)*/
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("./app/routes.js")(app);

//The app starts listening for requests
app.listen(port, function() {
  console.log("Running on port " + port);
});