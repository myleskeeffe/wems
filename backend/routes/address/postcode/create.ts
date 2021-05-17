import { db } from '../../../models/index';
import { dev } from '../../../config'

export const createPostcode = function (req: any, res: any) {
  let Country = db.addressCountry
  let State = db.addressState
  let Postcode = db.addressPostcode
  if (!req.body.stateId || !req.body.postcode) {
    return(res.status(400).json({error: 'Please enter all fields.'}))
  }
  Postcode.create({
    postcode: req.body.postcode,
    AddressStateId: req.body.stateId
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