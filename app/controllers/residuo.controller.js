const Residuo = require("../models/residuo.model.js");

// Create and Save a new Residuo
/*exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Residuo
  const residuo = new Residuo({
    nombre: req.body.nombre
  });

  // Save Residuo in the database
  Residuo.create(residuo, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Residuo."
      });
    else res.send(data);
  });
};*/

// Retrieve all Residuos from the database.
exports.findAll = (req, res) => {
  Residuo.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving residuos."
      });
    else res.send(data);
  });
};

// Find a single Residuo with a residuoId
exports.findOne = (req, res) => {
  Residuo.findById(req.params.residuoId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Residuo with id ${req.params.residuoId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Residuo with id " + req.params.residuoId
        });
      }
    } else res.send(data);
  });
};

// Update a Residuo identified by the residuoId in the request
/*exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Residuo.updateById(
    req.params.residuoId,
    new Residuo(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Residuo with id ${req.params.residuoId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Residuo with id " + req.params.residuoId
          });
        }
      } else res.send(data);
    }
  );
};*/

// Delete a Residuo with the specified residuoID in the request
/*exports.delete = (req, res) => {
  Residuo.remove(req.params.residuoId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Residuo with id ${req.params.residuoId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Residuo with id " + req.params.residuoId
        });
      }
    } else res.send({ message: `Residuo was deleted successfully!` });
  });
};*/

// Delete all Residuos from the database.
/*exports.deleteAll = (req, res) => {
  Residuo.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all residuos."
      });
    else res.send({ message: `All reisiduos were deleted successfully!` });
  });
};*/