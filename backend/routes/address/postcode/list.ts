import { db } from '../../../models/index';
import { dev } from '../../../config';
import { Op } from 'sequelize';

export const listPostcode = function (req: any, res: any) {
  let Country = db.addressCountry
  let State = db.addressState
  let Postcode = db.addressPostcode
  let filter = req.query.filter
  Postcode.findAll({
    where: {
      [Op.or]: [
        {id: {[Op.substring]: filter}},
        {postcode: {[Op.substring]: filter}},
      ]
    },
    limit: 100,
    include: [{
      model: State,
      required: false,
      include: [{
        model: Country,
        required: false
      }]
    }]
  }).then(function(postcodes: any){
    res.json(postcodes)
  }).catch(function(error:any){
    if (dev) {
      res.status(400).json({error: error})
    }
    else {
      res.status(400).json({error: "There was an error processing your request."})
    }
  })
};