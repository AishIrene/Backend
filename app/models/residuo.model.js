const sql = require("./db.js");

// constructor
const Residuo = function(residuo) {
  this.nombre = residuo.nombre;
};

const Contenedor = function(contenedor) {
  this.tipo = contenedor.tipo;
  this.direccion = contenedor.direccion;
  this.centro = contenedor.centro;
  this.horario = contenedor.horario;
  this.observaciones = contenedor.observaciones;
  this.latitud = contenedor.latitud;
  this.longitud = contenedor.longitud;
};

Residuo.getAll = result => {
  sql.query("SELECT * FROM residuos", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("residuos: ", res);
    result(null, res);
  });
};

Residuo.findByName = (residuoName, result) => {
  sql.query(`SELECT * FROM residuos WHERE nombre = "${residuoName}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found residuo: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Residuo with that name
    result({ kind: "not_found" }, null);
  });
};


Residuo.findByNameAndLocation = (residuoName, residuoLocation, result) => {
  sql.query(`SELECT * FROM residuos WHERE nombre = "${residuoName}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found residuo: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Residuo with that name
    result({ kind: "not_found" }, null);
  });
};

/************************************************************************/

/*

Residuo.findById = (residuoId, result) => {
  sql.query(`SELECT * FROM residuos WHERE id = ${residuoId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found residuo: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Residuo with the id
    result({ kind: "not_found" }, null);
  });
};

Residuo.create = (newResiduo, result) => {
  sql.query("INSERT INTO residuos SET ?", newResiduo, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created residuo: ", { id: res.insertId, ...newResiduo });
    result(null, { id: res.insertId, ...newResiduo  });
  });
};*/

/*Residuo.updateById = (id, residuo, result) => {
  sql.query(
    "UPDATE residuos SET nombre = ? WHERE id = ?",
    [residuo.nombre, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Residuo with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated residuo: ", { id: id, ...residuo });
      result(null, { id: id, ...residuo });
    }
  );
};*/

/*Residuo.remove = (id, result) => {
  sql.query("DELETE FROM residuos WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Residuo with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted residuo with id: ", id);
    result(null, res);
  });
};*/

/*Residuo.removeAll = result => {
  sql.query("DELETE FROM residuos", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} residuos`);
    result(null, res);
  });
};*/

module.exports = Residuo;
module.exports = Contenedor;