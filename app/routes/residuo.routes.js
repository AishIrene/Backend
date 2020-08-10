module.exports = app => {
  const residuos = require("../controllers/residuo.controller.js");

  // Create a new Residuo
  //app.post("/residuos", residuos.create);

  // Retrieve all Residuos
  app.get("/residuos", residuos.findAll);

  // Retrieve a single Residuo with residuoId
  app.get("/residuos/:residuoId", residuos.findOne);

  // Update a Residuo with residuoId
  //app.put("/residuos/:residuoId", residuos.update);

  // Delete a Residuo with residuoId
  //app.delete("/residuos/:residuoId", residuos.delete);

  // Create a new Residuo
  //app.delete("/residuos", residuos.deleteAll);
};