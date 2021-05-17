import { db } from '../../models/index';
import { dev } from '../../config'

export const createPlacement = function (req: any, res: any) {
  let Placement = db.workplacement
  if (!req.body.startDate || !req.body.endDate || !req.body.consent || !req.body.approval || !req.body.notes || !req.body.formSubmitted) {
    return(res.status(400).json({error: 'Please enter all fields.'}))
  }
  Placement.create({
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    consent: req.body.consent,
    approval: req.body.approval,
    notes: req.body.notes,
    formSubmitted: req.body.formSubmitted
  }).then(function(placements: any){
    res.json(placements)
  }).catch(function(error:any){
    if (dev) {
      res.status(400).json({error: error})
    }
    else {
      res.status(400).json({error: "There was an error processing your request."})
    }
  })
};