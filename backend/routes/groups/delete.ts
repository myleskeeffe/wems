import { db } from '../../models/index';
import { dev } from '../../config';

export const deleteGroup = function (req: any, res: any) {
  if (!req.params.id) {
    return res.status(400).json({error: "No Id."})
  }
  let Group = db.permissionGroups
  Group.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(group: any){
    res.json(group)
  }).catch(function(error:any){
    if (dev) {
      res.status(400).json({error: error})
    }
    else {
      res.status(400).json({error: "There was an error processing your request."})
    }
  })
};