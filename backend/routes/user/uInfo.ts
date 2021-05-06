let findUser = require('../../utils/auth/findUser');

module.exports = (req: any, res: any) => {
    if (!req.params.id) {
      return(res.json({error: 'Please fill all required fields.'}))
    }

    let id = req.params.id

    findUser(id).then(function (userData: any) {
      res.json(userData)
    }).catch(function (error: any) {
      console.log(error)
      res.json({error: 'We encoutered an error processing that request.'})
    })

};