let ludbModel = require('../../models/index');
let luuserModel = ludbModel.user;

module.exports = async function() {
  return await luuserModel.findAll();
}