// *********************************************************************************
// orm.js - This file offers a set of easier-to-use methods for interacting with the MySQL db.
// *********************************************************************************

// Dependencies
// =============================================================
var connection = require("./connection");

//cats app example
// ORM
// =============================================================
// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}

// Object for all our SQL statement functions.
var orm = {
  // selectAll()

  selectAll: function(tableInput, cb) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },

  // insertOne()

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
  // An example of objColVals would be {name: panther, sleepy: true}

  // updateOne()

  updateOne: function(table, objColVals, condition, cb) {
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  delete: function(table, condition, cb) {
    var queryString = "DELETE FROM " + table;
    queryString += " WHERE ";
    queryString += condition;

    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  }
};

// Export the orm object for the model (cat.js).
module.exports = orm;

// // Import MySQL connection.
// var connection = require("../config/connection.js");

// // Helper function for SQL syntax.
// // Let's say we want to pass 3 values into the mySQL query.
// // In order to write the query, we need 3 question marks.
// // The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// // ["?", "?", "?"].toString() => "?,?,?";
// function printQuestionMarks(num) {
//   var arr = [];

//   for (var i = 0; i < num; i++) {
//     arr.push("?");
//   }

//   return arr.toString();
// }

// // Helper function to convert object key/value pairs to SQL syntax
// function objToSql(ob) {
//   var arr = [];

//   // loop through the keys and push the key/value as a string int arr
//   for (var key in ob) {
//     var value = ob[key];
//     // check to skip hidden properties
//     if (Object.hasOwnProperty.call(ob, key)) {
//       // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
//       if (typeof value === "string" && value.indexOf(" ") >= 0) {
//         value = "'" + value + "'";
//       }
//       // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
//       // e.g. {sleepy: true} => ["sleepy=true"]
//       arr.push(key + "=" + value);
//     }
//   }

//   // translate array of strings to a single comma-separated string
//   return arr.toString();
// }

// //EXAMPLE FROM SWAPI
// var tableName = "allcharacters";

// var orm = {
//   // Here our ORM is creating a simple method for performing a query of the entire table.
//   // We make use of the callback to ensure that data is returned only once the query is done.
//   allCharacters: function(callback) {
//     var s = "SELECT * FROM " + tableName;

//     connection.query(s, function(err, result) {
//       callback(result);
//     });
//   },

//   // Here our ORM is creating a simple method for performing a query of a single character in the table.
//   // Again, we make use of the callback to grab a specific character from the database.
//   searchCharacter: function(name, callback) {
//     var s = "select * from " + tableName + " where routeName=?";

//     connection.query(s, [name], function(err, result) {
//       callback(result);
//     });
//   },

//   // Here our ORM is creating a simple method for adding characters to the database
//   // Effectively, the ORM's simple addCharacter method translates into a more complex SQL INSERT statement.
//   addCharacter: function(character, callback) {
//     // Creating a routeName so its easy to search.

//     // Using a RegEx Pattern to remove spaces from character.name
//     // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
//     var routeName = character.name.replace(/\s+/g, "").toLowerCase();
//     console.log(routeName);

//     var s =
//       "INSERT INTO " +
//       tableName +
//       " (routeName, name, role, age, forcePoints) VALUES (?,?,?,?,?)";

//     connection.query(
//       s,
//       [
//         routeName,
//         character.name,
//         character.role,
//         character.age,
//         character.forcePoints
//       ],
//       function(err, result) {
//         callback(result);
//       }
//     );
//   }
// };
