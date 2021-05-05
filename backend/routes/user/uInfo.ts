let findUser = require('../../utils/auth/findUser');

module.exports = (req: any, res: any) => {
    if (!req.params.) {
      return(res.json({error: 'Please fill all required fields.'}))
    }

    let fName = req.body.fName
    let lName = req.body.lName
    let uName = req.body.uName
    let phoneNumber = req.body.phoneNumber
    let email = req.body.email
    let password = req.body.password
    try {
      createUser(fName, lName, uName, phoneNumber, email, password);
      res.json({ success: "User Created: " + uName })
    }
    catch(err) {
      res.json({ error: err })
    }
};