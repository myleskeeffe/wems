import { db } from '../../models/index';
import { dev } from '../../config';

export const listPlacements = function (req: any, res: any) {
  let Placement = db.workplacement
  let Contact = db.contact
  let Company = db.company
  let Street = db.addressStreet
  let Suburb = db.addressSuburb
  let Postcode = db.addressPostcode
  Placement.findAll({}).then(function(placements: any){
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