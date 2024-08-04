const {z} = require ("zod");
const {verifyToken} = require ("../../helpers/token")
const {findUserByEmail} = require ("../repositories/user")

exports.SignUpValidation = (req, res, next) => {
    const SignUpSchema = z.object({
      fullName: z.string().min(4, "Minimal 4 karakter"),
      email: z.string().email("Format email tidak valid"),
      password: z.string().min(5, "Minimal 5 karakter"),
    });
  
    try {
      SignUpSchema.parse(req.body);
  
      next();
    } catch (error) {
      res.status(400).json({ message: "SignUp failed", error });
    }
  };

  exports.SignInValidation = (req, res, next) => {
    const SignInSchema = z.object({
      email: z.string().email("Format email tidak valid"),
      password: z.string().min(5, "Minimal 5 karakter"),
    });
  
    try {
      SignInSchema.parse(req.body);
  
      next();
    } catch (error) {
      res.status(400).json({ message: "Invalid SignIn", error });
    }
  };


  exports.tokenValidation = async (req, res, next) => {
    const bearerToken = req.headers["authorization"];
  
    if (!bearerToken) {
      return res.status(401).json({ message: "unauthorized" });
    }
  
    const token = bearerToken.split(" ")[1];
  
    if (!token) {
      return res.status(401).json({ message: "unauthorized" });
    }
  
    try {
      const payload = verifyToken(token);
  
      if (!payload.id) {
        return res.status(401).json({ message: "unauthorized" });
      }
  
      const user = await findUserByEmail(payload.email);
  
      if (!user) {
        return res.status(401).json({ message: "unauthorized" });
      }
  
      delete user.password;
  
      req.userId = user.id;
      req.userEmail = user.email;
  
      next();
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Invalid SignIn", error });
    }
  };
  