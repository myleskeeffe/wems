import { db } from '../../models/index';
import { dev } from '../../config'

export const updateVisitation = function (req: any, res: any) {
  if (!req.params.id) {
    return (res.status(400).json({ error: 'Please enter an id.' }))
  }
  if (!req.body.documentName || !req.body.date || !req.body.email || !req.body.workPlacementId || !req.body.userId) {
    return (res.status(400).json({ error: 'Please fill all fields.' }))
  }
  let Visitation = db.visitation
  Visitation.update({
    documentName: req.body.documentName,
    date: req.body.date,
    WorkPlacementId: req.body.workPlacementId,
    UserId: req.body.userId
  }, {
    where: {
      id: req.params.id
    }
  }).then(function (contacts: any) {
    if (contacts == null) {
      return (res.status(400).json({ error: 'Not found.' }))
    }
    res.json(contacts)
  })
    .catch(function (error: any) {
      if (dev) {
        res.status(400).json({ error: error })
      }
      else {
        res.status(400).json({ error: "There was an error processing your request." })
      }
    })
};