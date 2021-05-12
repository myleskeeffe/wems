import { db } from '../../models/index';

export const listCohorts = function (req: Request, res: any) {
  let Cohort = db.cohort
  Cohort.findAll({}).then(function(cohorts: any){
    res.json(cohorts)
  })
};