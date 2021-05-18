import { db } from '../../models/index';
import { dev } from '../../config';
import { Op } from 'sequelize';

export const listVisitation = function (req: any, res: any) {
  let Visitation = db.visitation
  let filter = req.query.filter ?? ""
  let User = db.user
  let Placement = db.workplacement
  let Company = db.company
  let Address = db.address
  let Contact = db.contact
  let AddressSuburb = db.addressSuburb
  Visitation.findAll({
    include: [
      {
        model: User,
        required: true
      },
      {
        model: Placement,
        required: true,
        include: [
          {
            model: User,
            required: true
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
                model: AddressSuburb,
                required: true
              }
            ]
            }]
          }]
        }]
      }
    ],
    limit: 100,

  }).then(function (contacts: any) {
    res.json(contacts)
  }).catch(function (error: any) {
    if (dev) {
      res.status(400).json({ error: error })
    }
    else {
      res.status(400).json({ error: "There was an error processing your request." })
    }
  })
};