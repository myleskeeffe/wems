import { db } from '../../../models/index';
import { dev } from '../../../config'

export const createSuburb = function (req: any, res: any) {
  let Country = db.addressCountry
  let State = db.addressState
  let Postcode = db.addressPostcode
  let Suburb = db.addressSuburb
  if (!req.body.postcodeId || !req.body.suburbName) {
    return(res.status(400).json({error: 'Please enter all fields.'}))
  }
  Suburb.create({
    suburbName: req.body.suburbName,
    AddressPostcodeId: req.body.postcodeId
  }).then(function(suburb: any){
    res.json(suburb)
  }).catch(function(error:any){
    if (dev) {
      res.status(400).json({error: error})
    }
    else {
      res.status(400).json({error: "There was an error processing your request."})
    }
  })
};