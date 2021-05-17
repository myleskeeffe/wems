import { db } from '../../models/index';
import { dev } from '../../config'

export const updateContact = function (req: any, res: any) {
  if (!req.params.id) {
    return (res.status(400).json({ error: 'Please enter an id.' }))
  }
  if (!req.body.fName ||!req.body.lName || !req.body.email || !req.body.companyId) {
    return (res.status(400).json({ error: 'Please fill all fields.' }))
  }
  let Contact = db.contact
  Contact.update({
    firstName: req.body.fName,
    email: req.body.email,
    phone: req.body.phone,
    lastName: req.body.lName,
    title: req.body.title,
    CompanyId: req.body.companyId
  }, {
    where: {
      id: req.params.id
    }
  }).then(function (contacts: any) {
    if (contacts == null) {
      return (res.status(400).json({ error: 'Not found.' }))
    }
    res.json(contacts)
  })
    .catch(function (error: any) {
      if (dev) {
        res.status(400).json({ error: error })
      }
      else {
        res.status(400).json({ error: "There was an error processing your request." })
      }
    })
};