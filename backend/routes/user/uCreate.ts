let createUser = require('../../utils/auth/createUser');

module.exports = (req: any, res: any) => {
    let fName = req.params.fName
    let lName = req.params.lName
    let uName = req.params.uName
    let phoneNumber = req.params.phoneNumber
    let email = req.params.email
    let password = req.params.password
    try {
      createUser(fName, lName, uName, email, phoneNumber, password);
      res.json({ success: "User Created: " + uName })
    }
    catch(err) {
      res.json({ error: err })
    }
};