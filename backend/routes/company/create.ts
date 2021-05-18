import { db } from '../../models/index';
import { dev } from '../../config'

export const createCompany = function (req: any, res: any) {
  let Company = db.company
  if (!req.body.name || !req.body.phone || !req.body.email || !req.body.addressId) {
    return(res.status(400).json({error: 'Please enter all fields.'}))
  }
  Company.create({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    AddressId: req.body.addressId
  }).then(function(company: any){
    res.json(company)
  }).catch(function(error:any){
    if (dev) {
      res.status(400).json({error: error})
    }
    else {
      res.status(400).json({error: "There was an error processing your request."})
    }
  })
};