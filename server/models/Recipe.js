const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    ingredients: {
      type: [String],
      required: true,
    },

    instructions: {
      type: [String],
      required: true,
    },

    cuisine: {
      type: String,
      default: "",
    },

    dietaryPreference: {
      type: String,
      default: "",
    },

    mealType: {
      type: String,
      default: "",
    },

    preparationTime: {
      type: String,
      default: "",
    },

    cookingTime: {
      type: String,
      default: "",
    },

    servings: {
      type: Number,
      default: 1,
    },

    nutrition: {
      calories: {
        type: String,
        default: "",
      },
      protein: {
        type: String,
        default: "",
      },
      carbohydrates: {
        type: String,
        default: "",
      },
      fat: {
        type: String,
        default: "",
      },
    },

    tips: {
      type: [String],
      default: [],
    },

    category: {
      type: String,
      default: "Other",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Recipe", recipeSchema);
