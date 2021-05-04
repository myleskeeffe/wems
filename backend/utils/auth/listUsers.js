let 
let User = require("../../models/User")(sequelize, DataTypes).User;

module.exports = async function() {
  console.log(User)
  return await User.findAll();
}