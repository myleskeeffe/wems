import { db } from '../../models/index';
import { dev } from '../../config'

export const updateGroup = function (req: any, res: any) {
  if (!req.params.id) {
    return(res.status(400).json({error: 'Please enter an id.'}))
  }
  if (!req.body.name) {
    return(res.status(400).json({error: 'Please fill all fields.'}))
  }
  let Groups = db.group
  Groups.update({
name: req.body.name
  }, {
    where: {
      id: req.params.id
    }
  }).then(function(groups: any){
    if (groups == null) {
      return(res.status(400).json({error: 'Not found.'}))
    }
    res.json(groups)
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