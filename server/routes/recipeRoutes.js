const express = require("express");

const {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  generateAIRecipe,
  
} = require("../controllers/recipeController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createRecipe);

router.post("/generate", protect, generateAIRecipe);


router.get("/", protect, getRecipes);


router.get("/:id", protect, getRecipeById);

router.put("/:id", protect, updateRecipe);

router.delete("/:id", protect, deleteRecipe);

module.exports = router;
