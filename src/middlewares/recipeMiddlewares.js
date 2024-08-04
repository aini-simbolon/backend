const { z } = require("zod");

exports.validateRecipe = (req, res, next) => {
  const createRecipeSchema = z.object({
   name: z.string(),
   image: z.string().url(),
   content: z.string(),
   category: z.string()
  });

  try {
    createRecipeSchema.parse(req.body);

    next();
  } catch (error) {
    res.status(400).json({ message: "Create Recipe failed", error });
  }
};
 