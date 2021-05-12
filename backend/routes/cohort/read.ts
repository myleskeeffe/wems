import { db } from '../../models/index';

export const readCohort = function (req: any, res: any) {
  if (!req.params.id) {
    return(res.json(400, {error: 'Please enter an ID.'}))
  }
  let Cohort = db.cohort
  Cohort.findByPk(req.params.id).then(function(cohorts: any){
    if (cohorts == null) {
      return(res.status(400).json({error: 'Not found.'}))
    }
    res.json(cohorts)
  })
};