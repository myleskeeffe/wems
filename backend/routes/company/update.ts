import { db } from '../../models/index';
import { dev } from '../../config'

export const updateCompany = function (req: any, res: any) {
  if (!req.params.id) {
    return(res.status(400).json({error: 'Please enter an id.'}))
  }
  if (!req.body.name || !req.body.email || !req.body.phone) {
    return(res.status(400).json({error: 'Please fill all fields.'}))
  }
  let Company = db.company
  Company.update({
name: req.body.name,
email: req.body.email,
phone: req.body.phone
  }, {
    where: {
      id: req.params.id
    }
  }).then(function(companies: any){
    if (companies == null) {
      return(res.status(400).json({error: 'Not found.'}))
    }
    res.json(companies)
  })
  .catch(function(error:any){
    if (dev) {
      res.status(400).json({error: error})
    }
    else {
      res.status(400).json({error: "There was an error processing your request."})
    }
  })
};