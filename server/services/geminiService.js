require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateRecipe = async ({
  ingredients,
  cuisine,
  dietaryPreference,
  mealType,
}) => {
  const prompt = `
You are an expert recipe assistant.

Create a complete recipe using the following preferences:

Available ingredients:
${ingredients}

Cuisine:
${cuisine || "Any"}

Dietary preference:
${dietaryPreference || "None"}

Meal type:
${mealType || "Any"}

Return ONLY valid JSON in this exact structure:

{
  "title": "Recipe name",
  "ingredients": ["ingredient 1", "ingredient 2"],
  "instructions": ["step 1", "step 2"],
  "cuisine": "Cuisine",
  "dietaryPreference": "Dietary preference",
  "mealType": "Meal type",
  "preparationTime": "10 minutes",
  "cookingTime": "20 minutes",
  "servings": 2,
  "nutrition": {
    "calories": "400 kcal",
    "protein": "20 g",
    "carbohydrates": "45 g",
    "fat": "12 g"
  },
  "tips": ["Tip 1", "Tip 2"],
  "category": "Dinner"
}

Do not include Markdown or code fences.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
  });

  return response.text;
};

module.exports = {
  generateRecipe,
};
