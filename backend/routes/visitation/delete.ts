import { db } from '../../models/index';
import { dev } from '../../config';

export const deleteVisitation = function (req: any, res: any) {
  if (!req.params.id) {
    return res.status(400).json({error: "No Id."})
  }
  let Visitation = db.visitation
  Visitation.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(visitation: any){
    res.json(visitation)
  }).catch(function(error:any){
    if (dev) {
      res.status(400).json({error: error})
    }
    else {
      res.status(400).json({error: "There was an error processing your request."})
    }
  })
};