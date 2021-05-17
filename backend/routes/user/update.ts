import { db } from "../../models/index";
import { dev } from "../../config";

export const updateUser = function (req: any, res: any) {
  if (!req.params.id) {
    return res.status(400).json({ error: "Please enter an id." });
  }
  if (
    !req.body.fName ||
    !req.body.lName ||
    !req.body.uName ||
    !req.body.email
  ) {
    return res.status(400).json({ error: "Please fill all fields." });
  }
  let User = db.user;
  User.update(
    {
      fName: req.body.fName,
      lName: req.body.lName,
      username: req.body.uName,
      email: req.body.email,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then(function (user: any) {
      if (user == null) {
        return res.status(400).json({ error: "Not found." });
      }
      res.json(user);
    })
    .catch(function (error: any) {
      if (dev) {
        res.status(400).json({ error: error });
      } else {
        res
          .status(400)
          .json({ error: "There was an error processing your request." });
      }
    });
};
