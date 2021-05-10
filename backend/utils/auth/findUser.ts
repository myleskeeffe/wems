import { db } from '../../models/index';

export const findUser:any  = async function() {
  let User = db.user;
  let userByPk = await User.findByPk(1, {
    attributes: ['fName', 'lName', 'email', 'username']
  })
  return(userByPk);
}