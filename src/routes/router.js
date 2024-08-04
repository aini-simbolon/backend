const express = require("express");
const router = express.Router();

const authRoutes = require("./api/auth");
const recipeRoutes = require("./api/recipe");
const uploadRoutes = require("./api/upload");

router.get("/", (req, res) => {
  res.send({
    message: "alive /api",
  });
});

router.use("/auth", authRoutes);
router.use("/recipes", recipeRoutes);
router.use("/upload", uploadRoutes);

module.exports = router;
