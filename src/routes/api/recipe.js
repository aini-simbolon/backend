const express = require("express");
const {
  findRecipes,
  createRecipe,
  getRecipeById,
  deleteRecipe,
  editRecipe,
} = require("../../controllers/recipe");
const { validateRecipe } = require("../../middlewares/recipeMiddlewares");
const { tokenValidation } = require("../../middlewares/authMiddlewares");
const router = express.Router();

router.get("/", findRecipes);
router.get("/:id", getRecipeById);
router.post("/", tokenValidation, validateRecipe, createRecipe);
router.delete("/:id", tokenValidation, deleteRecipe);
router.patch("/:id", tokenValidation, validateRecipe, editRecipe);

module.exports = router;
