const sql = require("./db.js");

exports.getAll = result => {
  sql.query("SELECT * FROM residuo", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }

    console.log("Residuos: ", res);
    result(null, res);
  });
};

/********************************/

exports.findByName = (residuoName, result) => {
  
  sql.query(`SELECT * FROM residuo WHERE nombre = "${residuoName}"`, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Found residuo: ", res[0]);
      result(null, res[0]);
      return;
    }

    // Not found Residuo with that name
    result({ kind: "not_found" }, null);
  });
};

/********************************/

exports.findById = (residuoId, result) => {
  sql.query(`SELECT * FROM lugar_de_desecho WHERE residuoID = ${residuoId}`, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Found results: ", res[0]);
      result(null, res[0]);
      return;
    }

    // Results not found
    result({ kind: "not_found" }, null);
  });
};

/********************************/

exports.findByLocation = (contenedor, type, latitude, longitude, result) => {
  var query = "";
  if (type == "") query = `SELECT * FROM ${contenedor} WHERE latitud = "${latitude}" AND longitud = "${longitude}"`;
  else query = `SELECT * FROM ${contenedor} WHERE tipo = "${type}" AND latitud = "${latitude}" AND longitud = "${longitude}"`;
  
   sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Found contenedor(es): ", res[0]);
      result(null, res[0]);
      return;
    }

    // Not found contenedor near that location
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
};

*/