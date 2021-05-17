import { db } from '../../models/index';
import { dev } from '../../config'

export const createGroup = function (req: any, res: any) {
  let Group = db.permissionGroups
  if (!req.body.name) {
    return(res.status(400).json({error: 'Please enter all fields.'}))
  }
  Group.create({
    name: req.body.name
  }).then(function(groups: any){
    res.json(groups)
  }).catch(function(error:any){
    if (dev) {
      res.status(400).json({error: error})
    }
    else {
      res.status(400).json({error: "There was an error processing your request."})
    }
  })
};