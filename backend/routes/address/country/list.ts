import { db } from '../../../models/index';
import { dev } from '../../../config';
import { Op } from 'sequelize';

export const listCountry = function (req: any, res: any) {
  let Country = db.addressCountry
  let filter = req.query.filter ?? ""
  Country.findAll({
    where: {
      [Op.or]: [
        {id: {[Op.substring]: filter}},
        {countryName: {[Op.substring]: filter}}
      ]
    },
    limit: 100
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