/* The requests that clients are able to send */

module.exports = app => {
  
  const controller = require("./controller.js");

  // Retrieve all "Residuos"
  app.get("/residuos", controller.findAll);

  // Retrieve an specific "Residuo"
  app.get("/residuos/:residuoName", controller.findOne);

  //Retrieve all "Contenedores" that fit the "Residuo" name and location introduced by the user
  app.get("/residuos/:residuoName/:address", controller.find);

  //Retrieve coordinates of a location
  app.get("/:address", controller.findCoords)

};

/*****************************************************************/

/*//Retrieve a single Residuo with its name
  app.get("/residuos/:residuoName", residuos.findOne);
  
  // Retrieve a single Residuo with residuoId
  app.get("/residuos/:residuoId", residuos.findOne);

  // Create a new Residuo
  app.post("/residuos", residuos.create);

  // Update a Residuo with residuoId
  app.put("/residuos/:residuoId", residuos.update);

  // Delete a Residuo with residuoId
  app.delete("/residuos/:residuoId", residuos.delete);

  // Delete all Residuos in the database
  app.delete("/residuos", residuos.deleteAll);*/
