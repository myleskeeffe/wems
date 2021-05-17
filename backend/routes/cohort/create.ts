import { db } from '../../models/index';
import { dev } from '../../config'

export const createCohort = function (req: any, res: any) {
  let Cohort = db.cohort
  if (!req.body.name) {
    return(res.status(400).json({error: 'Please enter all fields.'}))
  }
  Cohort.create({
    name: req.body.name
  }).then(function(cohorts: any){
    res.json(cohorts)
  }).catch(function(error:any){
    if (dev) {
      res.status(400).json({error: error})
    }
    else {
      res.status(400).json({error: "There was an error processing your request."})
    }
  })
};