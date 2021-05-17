import { db } from '../../models/index';
import { dev } from '../../config';
import { Op } from 'sequelize';

async function searchByStreet(Address: any, Suburb: any, Postcode: any, State: any, Country: any, filter: any) {
  return Address.findAll({
    where: {
      streetAddress: { [Op.substring]: filter },
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
  })
}

async function searchBySuburb(Address: any, Suburb: any, Postcode: any, State: any, Country: any, filter: any) {
  return Address.findAll({
    limit: 100,
    include: [{
      model: Suburb,
      required: true,
      where: {
        suburbName: { [Op.substring]: filter },
      },
      include: [{
        model: Postcode,
        required: true,
        include: [{
          model: State,
          required: true,
          include: [{
            model: Country,
            required: true
          }]
        }]
      }]
    }]
  })
}

async function searchByPostcode(Address: any, Suburb: any, Postcode: any, State: any, Country: any, filter: any) {
  return Address.findAll({
    limit: 100,
    include: [{
      model: Suburb,
      required: true,
      include: [{
        model: Postcode,
        required: true,
        where: {
          postcode: { [Op.substring]: filter },
        },
        include: [{
          model: State,
          required: true,
          include: [{
            model: Country,
            required: true
          }]
        }]
      }]
    }]
  })
}

export const listAddress = async function (req: any, res: any) {
  let Country = db.addressCountry
  let State = db.addressState
  let Postcode = db.addressPostcode
  let Suburb = db.addressSuburb
  let Address = db.address
  let filter = req.query.filter
  let filterType = req.query.filterType

  try {
    if (filterType == "suburb") {
      let byStreet: any = await searchBySuburb(Address, Suburb, Postcode, State, Country, filter)
      res.json(byStreet)
    }
    else if (filterType == "postcode") {
      let byStreet: any = await searchByPostcode(Address, Suburb, Postcode, State, Country, filter)
      res.json(byStreet)
    }
    else {
      let byStreet: any = await searchByStreet(Address, Suburb, Postcode, State, Country, filter)
      res.json(byStreet)
    }
  }
  catch (err) {
    res.status(400).json({ error: "There was an error processing your request." })
  }


  // Address.findAll().then(function (addresses: any) {
  //   res.json(addresses)
  // }).catch(function (error: any) {
  //   if (dev) {
  //     res.status(400).json({ error: error })
  //   }
  //   else {
  //     res.status(400).json({ error: "There was an error processing your request." })
  //   }
  // })
};