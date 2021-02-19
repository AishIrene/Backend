const sql = require("./db.js");

/*Retrieve all "Residuos"*/

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

/*Retrieve one "Residuo" by its name*/

exports.findByName = (residuoName, result) => {
  
  sql.query(`SELECT * FROM residuo WHERE nombre = "${residuoName}"`, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Found \"Residuo\": ", res[0]);
      result(null, res[0]);
      return;
    }

    // If "Residuo" with that name is not found
    result({ kind: "not_found" }, null);
  });
};

/*Retrieve all entries of one "Residuo" by its ID */

exports.findById = (residuoId, result) => {
  sql.query(`SELECT * FROM lugar_de_desecho WHERE residuoID = ${residuoId}`, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Found results: ", res);
      result(null, res);
      return;
    }

    // If results are not found
    result({ kind: "not_found" }, null);
  });
};

/*Retrieve all "Contenedores" by their name and their location (aproximated within an specific radius)*/

exports.findByLocation = (contenedor, type, latitude, longitude, result) => {
  var query = "";
  var querySection = "";

  if (type == "") querySection = "";
  else querySection = "tipo = \"" + type + "\" AND";

  query = `SELECT * FROM (
            SELECT *, 
                (
                    (
                      (
                        acos(
                            sin(( ${latitude} * pi() / 180)) * sin(( latitud * pi() / 180)) 
                            + 
                            cos(( ${latitude} * pi() / 180 )) * cos(( latitud * pi() / 180)) 
                            * 
                            cos((( ${longitude} - longitud) * pi() / 180)))
                        ) * 180 / pi()
                      ) * 60 * 1.1515 * 1.609344
                    ) as distance FROM ${contenedor}
                ) ${contenedor}
          WHERE ${querySection} distance <= 60
          LIMIT 15;`;
  
   sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Found \"contenedor(es)\": ", res);
      result(null, res);
      return;
    }

    // If a "Contenedor" near that location is not found
    result({ kind: "not_found" }, null);
  });
};

/************************************************************************/
/*if (type == "") query = `SELECT * FROM ${contenedor} WHERE latitud = "${latitude}" AND longitud = "${longitude}"`;
else query = `SELECT * FROM ${contenedor} WHERE tipo = "${type}" AND latitud = "${latitude}" AND longitud = "${longitude}"`;*/

/*  if (type == "") {
    query = `SELECT * FROM (
              SELECT *, 
                  (
                      (
                        (
                          acos(
                              sin(( ${latitude} * pi() / 180)) * sin(( latitud * pi() / 180)) 
                              + 
                              cos(( ${latitude} * pi() / 180 )) * cos(( latitud * pi() / 180)) 
                              * 
                              cos((( ${longitude} - longitud) * pi() / 180)))
                          ) * 180 / pi()
                        ) * 60 * 1.1515 * 1.609344
                      ) as distance FROM ${contenedor}
                  ) ${contenedor}
            WHERE distance <= 60
            LIMIT 15;`;
  } else {
    query = `SELECT * FROM (
              SELECT *, 
                  (
                      (
                        (
                          acos(
                              sin(( ${latitude} * pi() / 180)) * sin(( latitud * pi() / 180)) 
                              + 
                              cos(( ${latitude} * pi() / 180 )) * cos(( latitud * pi() / 180)) 
                              * 
                              cos((( ${longitude} - longitud) * pi() / 180)))
                          ) * 180 / pi()
                        ) * 60 * 1.1515 * 1.609344
                      ) as distance FROM ${contenedor}
                  ) ${contenedor}
            WHERE tipo = "${type}" AND distance <= 60
            LIMIT 15;`;
  }*/

/*Residuo.findById = (residuoId, result) => {
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
};*/

/*Residuo.create = (newResiduo, result) => {
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
