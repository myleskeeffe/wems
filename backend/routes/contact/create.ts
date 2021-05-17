import { db } from '../../models/index';
import { dev } from '../../config'

export const createContact = function (req: any, res: any) {
  let Contact = db.contact
  if (!req.body.fName || !req.body.phone || !req.body.email || !req.body.title || !req.body.lName || !req.body.companyId) {
    return(res.status(400).json({error: 'Please enter all fields.'}))
  }
  Contact.create({
    firstName: req.body.fName,
    lastName: req.body.lName,
    email: req.body.email,
    title: req.body.title,
    phone: req.body.phone,
    CompanyId: req.body.companyId
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