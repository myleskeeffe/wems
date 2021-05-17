import { db } from '../../../models/index';
import { dev } from '../../../config'

export const createState = function (req: any, res: any) {
  let Country = db.addressCountry
  let State = db.addressState
  if (!req.body.countryId || !req.body.stateName) {
    return(res.status(400).json({error: 'Please enter all fields.'}))
  }
  State.create({
    stateName: req.body.stateName,
    AddressCountryId: req.body.countryId
  }).then(function(state: any){
    res.json(state)
  }).catch(function(error:any){
    if (dev) {
      res.status(400).json({error: error})
    }
    else {
      res.status(400).json({error: "There was an error processing your request."})
    }
  })
};