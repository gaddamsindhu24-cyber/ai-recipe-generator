const Recipe = require("../models/Recipe");
const { generateRecipe } = require("../services/geminiService");

// Create a recipe
const createRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.create({
      ...req.body,
      user: req.user,
    });

    res.status(201).json({
      message: "Recipe saved successfully",
      recipe,
    });
  } catch (error) {
    console.error("Create recipe error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Get logged-in user's recipes
const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({
      user: req.user,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      recipes,
    });
  } catch (error) {
    console.error("Get recipes error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Get one recipe
const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findOne({
      _id: req.params.id,
      user: req.user,
    });

    if (!recipe) {
      return res.status(404).json({
        message: "Recipe not found",
      });
    }

    res.status(200).json({
      recipe,
    });
  } catch (error) {
    console.error("Get recipe error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Update recipe
const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!recipe) {
      return res.status(404).json({
        message: "Recipe not found",
      });
    }

    res.status(200).json({
      message: "Recipe updated successfully",
      recipe,
    });
  } catch (error) {
    console.error("Update recipe error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Delete recipe
const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findOneAndDelete({
      _id: req.params.id,
      user: req.user,
    });

    if (!recipe) {
      return res.status(404).json({
        message: "Recipe not found",
      });
    }

    res.status(200).json({
      message: "Recipe deleted successfully",
    });
  } catch (error) {
    console.error("Delete recipe error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};
const generateAIRecipe = async (req, res) => {
  try {
    const {
      ingredients,
      cuisine,
      dietaryPreference,
      mealType,
    } = req.body;

    if (!ingredients) {
      return res.status(400).json({
        message: "Ingredients are required",
      });
    }

    const recipeText = await generateRecipe({
      ingredients,
      cuisine,
      dietaryPreference,
      mealType,
    });

    let recipeData;

    try {
      recipeData = JSON.parse(recipeText);
    } catch (error) {
      console.error("Gemini JSON parsing error:", recipeText);

      return res.status(500).json({
        message: "AI returned an invalid recipe format",
      });
    }

    const recipe = await Recipe.create({
      ...recipeData,
      user: req.user,
    });

    res.status(201).json({
      message: "Recipe generated successfully",
      recipe,
    });
  } catch (error) {
    console.error("Generate recipe error:", error.message);

    res.status(500).json({
      message: "Failed to generate recipe",
      
    });
  }
};

module.exports = {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  generateAIRecipe,
};