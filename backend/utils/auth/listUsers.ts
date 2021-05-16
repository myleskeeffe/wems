import { db } from '../../models/index';


export const listUsers:any  = async function() {
  let User = db.user
  return(await User.findAll({
    attributes: ['id', 'fName', 'lName', 'email', 'username']
  }));
}