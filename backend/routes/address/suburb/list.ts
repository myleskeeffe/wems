import { db } from '../../../models/index';
import { dev } from '../../../config';
import { Op } from 'sequelize';

export const listSuburb = function (req: any, res: any) {
  let Country = db.addressCountry
  let State = db.addressState
  let Postcode = db.addressPostcode
  let Suburb = db.addressSuburb
  let filter = req.query.filter ?? ""
  Suburb.findAll({
    where: {
      [Op.or]: [
        {id: {[Op.substring]: filter}},
        {suburbName: {[Op.substring]: filter}},
      ]
    },
    limit: 100,
    include: [{
      model: Postcode,
      required: false,
      include: [{
        model: State,
        required: false,
        include: [{
          model: Country,
          required: false
        }]
      }]
    }]
  }).then(function(suburbs: any){
    res.json(suburbs)
  }).catch(function(error:any){
    if (dev) {
      res.status(400).json({error: error})
    }
    else {
      res.status(400).json({error: "There was an error processing your request."})
    }
  })
};