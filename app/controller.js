const model = require("./model.js");
const googleAPI = require("./config/googleAPI.config.js");
const https = require ("https");

// Retrieve all "Residuos" from the database
exports.findAll = (req, res) => {
  model.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving \"residuos\"."
      });

    else res.send(data);
  });
};

// Retrieve a single "Residuo" using its name
exports.findOne = (req, res) => {
  model.findByName(req.params.residuoName, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found "Residuo" with name ${req.params.residuoName}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving \"Residuo\" with name " + req.params.residuoName
        });
      }
    } else res.send(data);
  });
};

// Retrieve all "Contenedores" that fit the "Resisuo" name and the location introduced by the user
exports.find = (req, res) => {
  
  // First we retrieve the "Residuo" with that specific name to find its ID
  model.findByName(req.params.residuoName, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found "Residuo" with name ${req.params.residuoName}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving \"Residuo\" with name " + req.params.residuoName
        });
      }
    } else {
      // Then, using the ID we got, we retrieve the type of "Contenedor" (donde_desechar) used to dispose of that kind of "Residuo"
      model.findById(data.residuoID, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found "Residuo" with id ${data.residuoID}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving \"Residuo\" with id " + data.residuoID
            });
          }
        } else {
          var newData = [];
          var readyToSendCounter = data.length;
          var otherData = [];
          var resultsIndex = 0;
          otherData.push(readyToSendCounter);

          // Finally, we calculate the coordinates of the location introduced by the user 
          coordinates(req.params.address, (coords) => {
            data.forEach(element => { 
              var contenedor = "";
              var type = "";
                    
              if(element.donde_desechar.substring(11).includes("_") || element.donde_desechar.substring(11) == "pilas" || element.donde_desechar.substring(11) == "ropa")  
                contenedor = element.donde_desechar;
              else {
                contenedor = "contenedor";
                type = element.donde_desechar.substring(11);
              }       
              
              // And we and look for the "Contendores" of that type located near that location
              model.findByLocation(contenedor, type, coords.lat, coords.lng, (err, data) => {
                if (err) {
                  if (err.kind === "not_found") {
                    res.status(404).send({
                      message: `Not found "Contenedor" <${contenedor} ${type}> near ${req.params.address}.`
                    });
                  } else {
                    res.status(500).send({
                      message: "Error retrieving \"Contenedor\" <" + contenedor + " " + type + "> near " + req.params.address
                    });
                  }
                } else {
                  var additionalInfo = '{"contenedorType":"' + element.donde_desechar + '", "startIndex":"' + resultsIndex + '", ';
                  data.forEach(element => {     
                    newData.push(element);
                    resultsIndex++;
                  });
                  otherData.push(JSON.parse(additionalInfo + '"endIndex":"' + (resultsIndex - 1) + '"}'));
                  readyToSendCounter--;
                  if (readyToSendCounter == 0) res.send(otherData.concat(newData));
                }
              });
            });
          });
        }
      });
    }
  });
};

//Retrieve coordinates of a location
exports.findCoords = (req, res) => {
  coordinates(req.params.address, (coords) => {
    res.send(coords);
  });
}

// We use the Google Maps geocoding API to convert the address into geocoordinates 
coordinates = (address, result) => {

  var altAddress = JSON.parse('{"lat": "all", "lng": "all"}');
  
  if (address != "all") {

    // To use the API we need an API key 
    url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + ",Madrid&key=" + googleAPI.API_KEY;
    
    https.get(url, (res) => {

      res.setEncoding('utf8');    

      // We might get the result data in chunks so we need to concatenate them
      var info = "";
      res.on('data', (d) => {
        info += d;
      });

      // Once we stop getting chunks of data, we parse the data and turn it to JSON format and send it (only the geolocation related information)
      res.on('end', () => {
        var addressJson = JSON.parse(info);

        //console.log(x.results[0].address_components[2].long_name);

        if(addressJson.status != 'OK' || addressJson.results[0].address_components[2].long_name != "Madrid") result(altAddress);
        else
          result(addressJson.results[0].geometry.location);
          
      });

    }).on('error', (e) => {
      console.error(e);
    });

  } else result(altAddress);
  

};


/****************************************************************************/
/*exports.find = (req, res) => {
  //First we retrieve the "Residuo" with that specific name to find its ID
  model.findByName(req.params.residuoName, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found "Residuo" with name ${req.params.residuoName}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving \"Residuo\" with name " + req.params.residuoName
        });
      }
    } else {
      //Then, using the ID we got, we retrieve the type of "Contenedor" (donde_desechar) used to dispose of that kind of "Residuo"
      model.findById(data.residuoID, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found "Residuo" with id ${data.residuoID}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving \"Residuo\" with id " + data.residuoID
            });
          }
        } else {
          var newData = [];
          var readyToSendCounter = data.length;
          data.forEach(element => { 
            var contenedor = "";
            var type = "";
                   
            if(element.donde_desechar.substring(11).includes("_") || element.donde_desechar.substring(11) == ("pilas" || "ropa")) 
              contenedor = element.donde_desechar;
            else {
              contenedor = "contenedor";
              type = element.donde_desechar.substring(11);
            }
            
            //Finally, we calculate the coordinates of the location introduced by the user and look for the "Contendores" of that type located near
            coordinates(req.params.address, (data) => {
              model.findByLocation(contenedor, type, data.lat, data.lng, (err, data) => {
                if (err) {
                  if (err.kind === "not_found") {
                    res.status(404).send({
                      message: `Not found "Contenedor" <${contenedor} ${type}> near ${req.params.address}.`
                    });
                  } else {
                    res.status(500).send({
                      message: "Error retrieving \"Contenedor\" <" + contenedor + " " + type + "> near " + req.params.address
                    });
                  }
                } else {
                  data.forEach(element => {     
                    newData.push(element);
                  });
                  readyToSendCounter--;
                  if (readyToSendCounter == 0) res.send(newData);
                }
              });
            });
          });
        }
      });
    }
  });
};*/

/*} else {
          var contenedor = "";
          var type = "";

          if(data.donde_desechar.substring(11).includes("_") || data.donde_desechar.substring(11) == ("pilas" || "ropa")) 
            contenedor = data.donde_desechar;
          else {
            contenedor = "contenedor";
            type = data.donde_desechar.substring(11);
          }
          
          //Finally, we calculate the coordinates of the location introduced by the user and look for the "Contendores" of that type located near
          coordinates(req.params.address, (data) => {
            model.findByLocation(contenedor, type, data.lat, data.lng, (err, data) => {
              if (err) {
                if (err.kind === "not_found") {
                  res.status(404).send({
                    message: `Not found "Contenedor" <${contenedor} ${type}> near ${req.params.address}.`
                  });
                } else {
                  res.status(500).send({
                    message: "Error retrieving \"Contenedor\" <" + contenedor + " " + type + "> near " + req.params.address
                  });
                }
              } else {              
                res.send(data);
              }
            });
          });

        }*/
        
/*// Find a single Residuo with a residuoName
exports.findOne = (req, res, next) => {
  Residuo.findByName(req.params.residuoName, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Residuo with name ${req.params.residuoName}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Residuo with name " + req.params.residuoName
        });
      }
    } else res.send(data);
  });
};*/

/*// Find a single Residuo with a residuoId
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
};*/

/*// Create and Save a new Residuo
exports.create = (req, res) => {
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

/*// Update a Residuo identified by the residuoId in the request
exports.update = (req, res) => {
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

/*// Delete a Residuo with the specified residuoID in the request
exports.delete = (req, res) => {
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

/*// Delete all Residuos from the database.
nexports.deleteAll = (req, res) => {
  Residuo.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all residuos."
      });
    else res.send({ message: `All reisiduos were deleted successfully!` });
  });
};*/