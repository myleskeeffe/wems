import { db } from '../../models/index';
import { dev } from '../../config';

export const listStudents = function (req: Request, res: any) {
  let Student = db.student
  Student.findAll({
    // include: db.user
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