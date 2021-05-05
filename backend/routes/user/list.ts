let listUsers = require('../../utils/auth/listUsers');

module.exports = (req: Request, res: any) => {
    res.json({ user: listUsers() })
};