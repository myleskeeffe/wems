import { db } from '../../models/index';
import { dev } from '../../config';
import { Op } from 'sequelize';

async function filterByStudent(Postcode: any, Company: any, Contact: any, Suburb: any, Address: any, Student: any, filter: any, User: any, Placement: any, claimType: any, Visitation: any) {
  if (claimType = "unclaimed") {
    return await Placement.findAll({
      limit: 100,
      include: [
        {
          model: User,
          required: true,
          where: {
            [Op.or]: [
              { fName: { [Op.substring]: filter } },
              { lName: { [Op.substring]: filter } }
            ]
          }
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
        {
          model: Visitation,
          required: false,
          where: { id: null }
        }
      ]
    })
  }
  else if (claimType == "claimed") {
    return await Placement.findAll({
      limit: 100,
      include: [
        {
          model: User,
          required: true,
          where: {
            [Op.or]: [
              { fName: { [Op.substring]: filter } },
              { lName: { [Op.substring]: filter } }
            ]
          }
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
        {
          model: Visitation,
          required: true
        }
      ]
    })
  }
  else {
    return await Placement.findAll({
      limit: 100,
      include: [
        {
          model: User,
          required: true,
          where: {
            [Op.or]: [
              { fName: { [Op.substring]: filter } },
              { lName: { [Op.substring]: filter } }
            ]
          }
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
        {
          model: Visitation,
          required: false
        }
      ]
    })
  }
}

async function filterByStreet(Postcode: any, Company: any, Contact: any, Suburb: any, Address: any, Student: any, filter: any, User: any, Placement: any, claimType: any, Visitation: any) {
  return await Placement.findAll({
    limit: 100,
    include: [
      {
        model: User,
        required: true,
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
            where: {
              [Op.or]: [
                { streetAddress: { [Op.substring]: filter } }
              ]
            },
            include: [{
              model: Suburb,
              required: true
            }]
          }]
        }]
      },
    ]
  })
}
async function filterBySuburb(Postcode: any, Company: any, Contact: any, Suburb: any, Address: any, Student: any, filter: any, User: any, Placement: any, claimType: any, Visitation: any) {
  return await Placement.findAll({
    limit: 100,
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
              model: Suburb,
              required: true,
              where: {
                [Op.or]: [
                  { suburbName: { [Op.substring]: filter } }
                ]
              }
            }]
          }]
        }]
      },
    ]
  })
}
async function filterByCompany(Postcode: any, Company: any, Contact: any, Suburb: any, Address: any, Student: any, filter: any, User: any, Placement: any, claimType: any, Visitation: any) {
  return await Placement.findAll({
    limit: 100,
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
          where: {
            [Op.or]: [
              { name: { [Op.substring]: filter } }
            ]
          },
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
  })
}


export const listPlacements = async function (req: any, res: any) {
  let filter = req.query.filter ?? "";
  let filterType = req.query.filterType ?? "student";
  let claimType = req.query.claimType ?? "all";
  let Placement = db.workplacement
  let Contact = db.contact
  let Company = db.company
  let Address = db.address
  let Suburb = db.addressSuburb
  let Postcode = db.addressPostcode
  let Country = db.addressCountry
  let User = db.user
  let Visitation = db.visitation

  try {
    if (filterType == "student") {
      res.json(await filterByStudent(Postcode, Company, Contact, Suburb, Address, User, filter, User, Placement, claimType, Visitation))
    }
    else if (filterType == "company") {
      res.json(await filterByCompany(Postcode, Company, Contact, Suburb, Address, User, filter, User, Placement, claimType, Visitation))
    }
    else if (filterType == "suburb") {
      res.json(await filterBySuburb(Postcode, Company, Contact, Suburb, Address, User, filter, User, Placement, claimType, Visitation))
    }
    else if (filterType == "street") {
      res.json(await filterByStreet(Postcode, Company, Contact, Suburb, Address, User, filter, User, Placement, claimType, Visitation))
    }
    else {
      res.json(await filterByStudent(Postcode, Company, Contact, Suburb, Address, User, filter, User, Placement, claimType, Visitation))
    }
  }
  catch (err) {
    res.status(400).json({ "error": "There was an error processing your request." })
  }

};