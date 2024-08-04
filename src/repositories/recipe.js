const db = require("../../libs/database");

exports.createRecipe = async (body) => {
  try {
    const { name, image, content, category, created_at } = body;

    const query = `
      INSERT INTO public."Recipes" (name, image, content, category, created_at)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;`;
    const values = [name, image, content, category, created_at];

    const res = await db.query(query, values);
    const recipe = res.rows[0];

    return recipe;
  } catch (err) {
    console.error("Error creating recipe:", err);
    throw new Error("Error creating recipe");
  }
};



exports.findRecipes = async () => {
    try {
      const query = `SELECT id, name, image, content, category, created_at
                            FROM public."Recipes"`;
  
      const res = await db.query(query);
  
      return res.rows;
    } catch (err) {
      throw new Error("Error finding recipes");
    }
  };

  exports.getRecipeById = async (id) => {
    try {
      const query = `SELECT id, name, image, content, category, created_at
                            FROM public."Recipes" WHERE id=${id};`;
  
      const res = await db.query(query);
  
      return res.rows.length > 0 ? res.rows[0] : null;
    } catch (err) {
      throw new Error("Error finding recipes");
    }
  };

  exports.deleteRecipe = async (id) => {
    try {
      const query = `DELETE FROM public."Recipes" WHERE id=${id} RETURNING *;`;
  
      const res = await db.query(query);
  
      return res.rows.length > 0 ? res.rows[0] : null;
    } catch (err) {
      throw new Error("Error delete recipe");
    }
  };

  exports.editRecipeInDatabase = async (id, body) => {
    try {
      const { name, image, content, category, created_at } = body;
  
      const query = `
        UPDATE public."Recipes"
        SET name=$1, image=$2, content=$3, category=$4, created_at=$5
        WHERE id=$6 RETURNING *;
      `;
      const values = [name, image, content, category, created_at, id];
  
      const res = await db.query(query, values);
  
      return res.rows[0];
    } catch (err) {
      console.error("Error editing recipe:", err);
      throw new Error("Error editing recipe");
    }
  };
  
  