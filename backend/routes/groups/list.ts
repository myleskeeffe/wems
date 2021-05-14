import { db } from '../../models/index';
import { dev } from '../../config';

export const listGroups = function (req: Request, res: any) {
  let Group = db.group
  Group.findAll({}).then(function(groups: any){
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