var connection = require("../config/connection.js");

// Function that prints appropriate number of question marks for query
function printQuestionMarks(num) {
  var arr = [];
  for (var i = 0; i < num; i++) {
    arr.push("?");
  }
  return arr.toString();
}

// Function that converts object to array for Sql
function objToSql(ob) {
  var arr = [];

  for (var key in ob) {
    var value = ob[key];

    if (Object.hasOwnProperty.call(ob, key)) {
   
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
  
      arr.push(key + "=" + value);
    }
  }
  return arr.toString();
}

// ORM
var orm = {
  // selectAll method that will select all burgers from the sql table
  selectAll: function(tableInput, cb) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function(err, result) {
      if (err) {
      	throw err;
      }
      cb(result);
    });
  },
  // InsertOne is a method that will add a new burger
  insertOne: function(table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table;
    
    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  // updateOne is a method that will set the burger devoured column to one (devoured)
  updateOne: function(table, objColVals, condition, cb) {
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    connection.query(queryString, function(err,result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  }
};

module.exports = orm;