const {
    findRecipes,
    createRecipe,
    getRecipeById,
    deleteRecipe,
    editRecipeInDatabase,
  } = require("../repositories/recipe");

  exports.findRecipes = async (req, res) => {
    try {
      const recipes = await findRecipes();
  
      if (!recipes || recipes.length === 0) {
        return res.status(404).json({
          message: "No recipes found",
        });
      }
  
      const formattedRecipes= recipes.map(recipe => ({
        id: recipe.id,
        name: recipe.name,
        image: recipe.image,
        content: recipe.content,
        category: recipe.category,
        created_at: recipe.created_at
      }));
  
      res.status(200).json(formattedRecipes);
    } catch (error) {
      console.error("Error finding recipes:", error);
      res.status(500).json({ message: "Error finding recipes", error });
    }
  };
  

  exports.createRecipe = async (req, res) => {
    try {
      const recipe = await createRecipe(req.body);
  
      if (!recipe) {
        return res.status(400).send({
          message: "Invalid creating Recipe",
        });
      }
  
      res.send(recipe);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Invalid creating Recipe", error });
    }
  };
  
exports.getRecipeById = async (req, res) => {
    try {
      const { id } = req.params;
  
      const recipe = await getRecipeById(id);
  
      if (!recipe) {
        return res.status(400).send({
          message: "Invalid finding Recipe",
        });
      }
  
      res.send(recipe);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Invalid finding recipe", error });
    }
  };

  exports.deleteRecipe = async (req, res) => {
    try {
      const { id } = req.params;
  
      const recipe = await deleteRecipe(id);
  
      if (!recipe) {
        return res.status(400).send({
          message: "Invalid delete Recipe",
        });
      }
  
      res.send({ message: "Delete Recipe Success", recipe });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Invalid delete Recipe", error });
    }
  };

  exports.editRecipe = async (req, res) => {
    try {
      const { id } = req.params;
  
      const recipe = await editRecipeInDatabase(id, req.body);
      console.log(req.body);
  
      if (!recipe) {
        return res.status(400).send({
          message: "Invalid edit recipe",
        });
      }
  
      res.send({ message: "Edit Recipe Success", recipe });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Invalid edit recipe", error });
    }
  };