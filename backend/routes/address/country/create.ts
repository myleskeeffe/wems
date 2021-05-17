import { db } from '../../../models/index';
import { dev } from '../../../config'

export const createCountry = function (req: any, res: any) {
  let Country = db.addressCountry
  if (!req.body.countryName) {
    return (res.status(400).json({ error: 'Please enter all fields.' }))
  }
  Country.create({
    countryName: req.body.countryName
  }).then(function (country: any) {
    res.json(country)
  }).catch(function (error: any) {
    if (dev) {
      res.status(400).json({ error: error })
    }
    else {
      res.status(400).json({ error: "There was an error processing your request." })
    }
  })
};