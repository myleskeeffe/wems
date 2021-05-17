import { db } from '../../models/index';
import { dev } from '../../config'

export const createAddress = function (req: any, res: any) {
  let Country = db.addressCountry
  let State = db.addressState
  let Postcode = db.addressPostcode
  let Suburb = db.addressSuburb
  let Address = db.address
  if (!req.body.suburbId || !req.body.streetAddress) {
    return(res.status(400).json({error: 'Please enter all fields.'}))
  }
  Address.create({
    streetAddress: req.body.streetAddress,
    AddressSuburbId: req.body.suburbId
  }).then(function(address: any){
    res.json(address)
  }).catch(function(error:any){
    if (dev) {
      res.status(400).json({error: error})
    }
    else {
      res.status(400).json({error: "There was an error processing your request."})
    }
  })
};