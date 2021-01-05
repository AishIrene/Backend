/* The requests that clients are able to send */

module.exports = app => {
  
  const residuos = require("../controllers/residuo.controller.js");

  // Retrieve all Residuos
  app.get("/residuos", residuos.findAll);

  // Retrieve a single Residuo with residuoId
  app.get("/residuos/:residuoId", residuos.findOne);

  /*****************************************************************/

  // Create a new Residuo
  //app.post("/residuos", residuos.create);

  // Update a Residuo with residuoId
  //app.put("/residuos/:residuoId", residuos.update);

  // Delete a Residuo with residuoId
  //app.delete("/residuos/:residuoId", residuos.delete);

  // Delete all Residuos in the database
  //app.delete("/residuos", residuos.deleteAll);
};