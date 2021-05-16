import { db } from '../../models/index';
import { dev } from '../../config'

export const createStudent = function (req: any, res: any) {
  let Student = db.student
  if (!req.body.name || !req.body.formid) {
    return(res.status(400).json({error: 'Please enter all fields.'}))
  }
  Student.create({
    name: req.body.name,
    UserId: req.body.formid
  }).then(function(students: any){
    res.json(students)
  }).catch(function(error:any){
    if (dev) {
      res.status(400).json({error: error})
    }
    else {
      res.status(400).json({error: "There was an error processing your request."})
    }
  })
};