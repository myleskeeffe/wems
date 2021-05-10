import { db } from '../../models/index';

export const createUser:any = async function(fname:any, lname:any, username:any, phoneNumber:any, email:any, password:any) {
  let User = db.user;
  return await User.create({fName: fname, lName: lname, username: username, phoneNumber: phoneNumber, email: email, password:password});
}