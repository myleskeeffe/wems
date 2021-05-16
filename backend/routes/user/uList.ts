import { listUsers } from '../../utils/auth/listUsers';

module.exports = function (req: any, res: any) {
    listUsers(req.query.filter).then(function(users: any){
      res.json(users)
    }) 
};