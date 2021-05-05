let cudbModel = require('../../models/index');
let cuuserModel = cudbModel.user;

module.exports = async function(fname:any, lname:any, username:any, phoneNumber:any, email:any, password:any) {
  return await cuuserModel.create({fname: fname, lname: lname, username: username, phoneNumber: phoneNumber, email: email, password:password});
}