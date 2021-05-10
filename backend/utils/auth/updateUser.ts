import { db } from '../../models/index';

let fields:any
let id: any

export const updateUser:any  = async function() {
  let User = db.user
  await User.update({fields}, {
    where: {
      id: id,
    }
  })
}