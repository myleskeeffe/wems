let listUsers = require('../../utils/auth/listUsers');

module.exports = function (req: Request, res: any) {
    listUsers().then(function(users: any){
      res.json(users)
    }) 
};