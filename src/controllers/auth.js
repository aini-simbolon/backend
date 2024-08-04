const { generateToken } = require("../../helpers/token");
const {
  createUser,
  findUserByEmail,
  findUserByFullName,
} = require("../repositories/user");
const bcrypt = require("bcrypt");

exports.SignUp = async (req, res) => {
  try {
    const emailExist = await findUserByEmail(req.body.email);
    const fullnameExist = await findUserByFullName(req.body.fullname);

    if (emailExist && fullnameExist) {
      return res.status(400).send({
        message: "Email and FullName have been used",
      });
    }

    if (emailExist) {
      return res.status(400).send({
        message: "Email has been used",
      });
    } else if (fullnameExist) {
      return res.status(400).send({
        message: "FullName has been used",
      });
    }

    const user = await createUser(req.body);

    res.send({ message: "SignUp success", user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "SignUp failed", error });
  }
};

exports.SignIn = async (req, res) => {
    try {
      const user = await findUserByEmail(req.body.email);
  
      if (!user) {
        return res.status(400).send({
          message: "Invalid SignIn",
        });
      }
  
      const isMatch = await bcrypt.compare(req.body.password, user.password);
  
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid SignIn" });
      }
  
      delete user.password;
  
      const token = generateToken(user);
  
      res.send({ user, token });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Invalid SignIn", error });
    }
  };

  exports.checkAuth = async (req, res) => {
    try {
      const user = await findUserByEmail(req.userEmail);
  
      if (!user) {
        return res.status(400).send({
          message: "Invalid SignIn",
        });
      }
  
      delete user.password;
  
      res.send(user);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Invalid SignIn", error });
    }
  };
  
