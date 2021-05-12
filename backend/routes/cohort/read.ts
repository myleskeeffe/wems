import { db } from '../../models/index';
import { dev } from '../../config';

export const readCohort = function (req: any, res: any) {
  if (!req.params.id) {
    return(res.json(400, {error: 'Please enter an ID.'}))
  }
  let Cohort = db.cohort
  Cohort.findByPk(req.params.id)
  .then(function(cohorts: any){
    if (cohorts == null) {
      return(res.status(400).json({error: 'Not found.'}))
    }
    res.json(cohorts)
  })
  .catch(function(error:any){
    if (dev) {
      res.status(400).json({error: error})
    }
    else {
      res.status(400).json({error: "There was an error processing your request."})
    }
  })
};