import { db } from '../../models/index';
import { dev } from '../../config';
import { Op } from 'sequelize';

export const listGroups = function (req: any, res: any) {
  let Group = db.permissionGroups
  let filter = req.query.filter ?? "";
  Group.findAll({
    where: {
      [Op.or]: [
        { id: { [Op.substring]: filter } },
        { name: { [Op.substring]: filter } }
      ]
    }
  }).then(function (groups: any) {
    res.json(groups)
  }).catch(function (error: any) {
    if (dev) {
      res.status(400).json({ error: error })
    }
    else {
      res.status(400).json({ error: "There was an error processing your request." })
    }
  })
};