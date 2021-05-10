import { updateUser } from '../../utils/auth/updateUser';

module.exports = (req: any, res: any) => {
    if (!req.params.id) {
      return(res.json({error: 'Please fill all required fields.'}))
    }

    let id = req.params.id


};