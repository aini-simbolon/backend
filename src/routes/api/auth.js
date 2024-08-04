const express = require("express");
const router = express.Router();

const { SignUp, SignIn, checkAuth } = require("../../controllers/auth");
const {
  SignUpValidation,
  SignInValidation,
  tokenValidation,
} = require("../../middlewares/authMiddlewares");

router.post("/SignUp", SignUpValidation, SignUp, );
router.post("/SignIn", SignInValidation, SignIn);
router.get("/check", tokenValidation, checkAuth);

module.exports = router;
