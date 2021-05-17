import { db } from '../../models/index';
import { dev } from '../../config';
import { Op } from 'sequelize';

export const listCohorts = function (req: any, res: any) {
  let Cohort = db.cohort
  let filter = req.query.filter ?? ""
  Cohort.findAll({
    where: {
      [Op.or]: [
        { id: { [Op.substring]: filter } },
        { name: { [Op.substring]: filter } },
      ]
    },
    limit: 100,
  }).then(function (cohorts: any) {
    res.json(cohorts)
  }).catch(function (error: any) {
    if (dev) {
      res.status(400).json({ error: error })
    }
    else {
      res.status(400).json({ error: "There was an error processing your request." })
    }
  })
};