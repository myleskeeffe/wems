import { db } from '../../models/index';
import { Op } from 'sequelize';

export const listUsers:any = async function(filter: any) {
  let User = db.user
  return(await User.findAll({
    attributes: ['id', 'fName', 'lName', 'email', 'username'],
    where: {
      [Op.or]: [
        {id: {[Op.substring]: filter}},
        {fName: {[Op.substring]: filter}},
        {lName: {[Op.substring]: filter}},
        {username: {[Op.substring]: filter}}
      ]
    },
    limit: 100
  }));
}