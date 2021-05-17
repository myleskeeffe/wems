import { db } from '../../models/index';
import { dev } from '../../config';
import { Op } from 'sequelize';

export const listCompany = function (req: any, res: any) {
  let Company = db.company
  let filter = req.query.filter
  Company.findAll({
    where: {
      [Op.or]: [
        { id: { [Op.substring]: filter } },
        { name: { [Op.substring]: filter } },
        { email: { [Op.substring]: filter } },
        { phone: { [Op.substring]: filter } },
      ]
    },
    limit: 100,
  }).then(function (companies: any) {
    res.json(companies)
  }).catch(function (error: any) {
    if (dev) {
      res.status(400).json({ error: error })
    }
    else {
      res.status(400).json({ error: "There was an error processing your request." })
    }
  })
};