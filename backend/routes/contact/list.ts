import { db } from '../../models/index';
import { dev } from '../../config';
import { Op } from 'sequelize';

export const listContact = function (req: any, res: any) {
  let Contact = db.contact
  let filter = req.query.filter
  Contact.findAll({
    where: {
      [Op.or]: [
        { id: { [Op.substring]: filter } },
        { firstName: { [Op.substring]: filter } },
        { lastName: { [Op.substring]: filter } },
        { email: { [Op.substring]: filter } },
      ]
    },
    limit: 100,
  }).then(function (contacts: any) {
    res.json(contacts)
  }).catch(function (error: any) {
    if (dev) {
      res.status(400).json({ error: error })
    }
    else {
      res.status(400).json({ error: "There was an error processing your request." })
    }
  })
};