import { db } from '../../models/index';
import { dev } from '../../config';
import { Op } from 'sequelize';

export const listPlacements = function (req: any, res: any) {
  let filter = req.query.filter;
  let Placement = db.workplacement
  let Contact = db.contact
  let Company = db.company
  let Address = db.address
  let Suburb = db.addressSuburb
  let Postcode = db.addressPostcode
  let Country = db.addressCountry
  let User = db.user
  Placement.findAll({
    where: {
      [Op.or]: [
        { id: { [Op.substring]: filter } },
        { startDate: { [Op.substring]: filter } },
        { endDate: { [Op.substring]: filter } },
        { notes: { [Op.substring]: filter } },
      ]
    },
    limit: 100,
    include: [
      {
        model: User,
        where: {
          [Op.or]: [
            { fName: { [Op.substring]: filter } },
            { lName: { [Op.substring]: filter } },
          ]
        },
      },
      {
        model: Contact,
        required: true,
        include: [{
          model: Company,
          required: true,
          include: [{
            model: Address,
            required: true,
            include: [{
              model: Suburb,
              required: true
            }]
          }]
        }]
      },
    ]
  }).then(function (placements: any) {
    res.json(placements)
  }).catch(function (error: any) {
    if (dev) {
      res.status(400).json({ error: error })
    }
    else {
      res.status(400).json({ error: "There was an error processing your request." })
    }
  })
};