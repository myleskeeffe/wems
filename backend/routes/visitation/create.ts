import { db } from '../../models/index';
import { dev } from '../../config'

export const createVisitation = function (req: any, res: any) {
  let Visitation = db.visitation
  if (!req.body.documentName || !req.body.date || !req.body.email || !req.body.workPlacementId || !req.body.userId) {
    return(res.status(400).json({error: 'Please enter all fields.'}))
  }
  Visitation.create({
    documentName: req.body.documentName,
    date: req.body.date,
    WorkPlacementId: req.body.workPlacementId,
    UserId: req.body.userId
  }).then(function(visitation: any){
    res.json(visitation)
  }).catch(function(error:any){
    if (dev) {
      res.status(400).json({error: error})
    }
    else {
      res.status(400).json({error: "There was an error processing your request."})
    }
  })
};