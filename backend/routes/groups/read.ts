import { db } from '../../models/index';
import { dev } from '../../config';

export const readGroup = function (req: any, res: any) {
  if (!req.params.id) {
    return(res.json(400, {error: 'Please enter an ID.'}))
  }
  let Group = db.group
  Group.findByPk(req.params.id)
  .then(function(groups: any){
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