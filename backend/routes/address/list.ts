import { db } from '../../models/index';
import { dev } from '../../config';
import { Op } from 'sequelize';

export const listAddress = function (req: any, res: any) {
  let Country = db.addressCountry
  let State = db.addressState
  let Postcode = db.addressPostcode
  let Suburb = db.addressSuburb
  let Address = db.address
  let filter = req.query.filter
  Address.findAll({
    where: {
      [Op.or]: [
        {id: {[Op.substring]: filter}},
        {streetAddress: {[Op.substring]: filter}},
      ]
    },
    limit: 100,
    include: [{
      model: Suburb,
      required: false,
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
    }]
  }).then(function(addresses: any){
    res.json(addresses)
  }).catch(function(error:any){
    if (dev) {
      res.status(400).json({error: error})
    }
    else {
      res.status(400).json({error: "There was an error processing your request."})
    }
  })
};