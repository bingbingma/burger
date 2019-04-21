// require orm.js
let orm = require("../config/orm");
// // require burger.js
// let burger = require("burger.js");

// Import the ORM to create functions that will interact with the database.
// var orm = require("../config/orm.js");

var burgers = {
  selectAll: function(cb) {
    orm.selectAll("burgers", function(res) {
      cb(res);
      //the cb "callback" makes sure the the res (response) is received before the
    });
  },
  // The variables cols and vals are arrays.
  insertOne: function(cols, vals, cb) {
    orm.insertOne("burgers", cols, vals, function(res) {
      cb(res);
    });
  },
  updateOne: function(objColVals, condition, cb) {
    orm.updateOne("burgers", objColVals, condition, function(res) {
      cb(res);
    });
  },
  delete: function(condition, cb) {
    orm.delete("burgers", condition, function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller (burgers_controller.js).
module.exports = burgers;

//inside this file i should be calling the ORM functions using burger specific input? what does this mean?

// let Sequelize = require("sequelize");

// const Characters = sequelize.define(
//   "allcharacters",
//   {
//     // attributes
//     routeName: {
//       type: Sequelize.STRING,
//       allowNull: false
//     },
//     name: {
//       type: Sequelize.STRING
//       // allowNull defaults to true
//     },
//     role: {
//       type: Sequelize.STRING
//       // allowNull defaults to true
//     },
//     age: {
//       type: Sequelize.STRING
//       // allowNull defaults to true
//     },
//     forcePoints: {
//       type: Sequelize.INTEGER
//       // allowNull defaults to true
//     }
//   },
//   {
//     // options
//   }
// );

// Characters.sync();

// module.exports = Characters;
