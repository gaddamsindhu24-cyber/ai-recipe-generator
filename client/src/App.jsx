import { useState } from "react";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("token"))
  );
  const [showHistory, setShowHistory] = useState(false);
  const [recipes, setRecipes] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  const [ingredients, setIngredients] = useState("");
  const [cuisine, setCuisine] = useState("Indian");
  const [dietaryPreference, setDietaryPreference] = useState("None");
  const [mealType, setMealType] = useState("Dinner");

  const handleAuth = async (e) => {
    e.preventDefault();
    setMessage("");

    const url = isLogin
      ? "http://localhost:5000/api/auth/login"
      : "http://localhost:5000/api/auth/register";

    const body = isLogin
      ? { email, password }
      : { name, email, password };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Something went wrong");
        return;
      }

      if (isLogin) {
        localStorage.setItem("token", data.token);
        setIsLoggedIn(true);
        setMessage("");
      } else {
        setMessage("Registration successful! 🎉");
        setIsLogin(true);
      }

      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setMessage("Cannot connect to server");
    }
  };

  const generateRecipe = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Please login first");
      return;
    }

    if (!ingredients.trim()) {
      setMessage("Please enter some ingredients");
      return;
    }

    setLoading(true);
    setMessage("");
    setRecipe(null);

    try {
      const response = await fetch(
        "http://localhost:5000/api/recipes/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ingredients,
            cuisine,
            dietaryPreference,
            mealType,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to generate recipe");
        return;
      }

      setRecipe(data.recipe);
    } catch (error) {
      setMessage("Cannot connect to server");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setRecipe(null);
    setMessage("");
  };
    const fetchRecipes = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "http://localhost:5000/api/recipes",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to load recipes");
        return;
      }

      setRecipes(data.recipes);
      setShowHistory(true);
      setMessage("");
    } catch (error) {
      setMessage("Cannot connect to server");
    }
  };
  const deleteRecipe = async (recipeId) => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(
      `http://localhost:5000/api/recipes/${recipeId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.message || "Failed to delete recipe");
      return;
    }

    setRecipes((currentRecipes) =>
      currentRecipes.filter((item) => item._id !== recipeId)
    );

    setMessage("Recipe deleted successfully");
  } catch (error) {
    setMessage("Cannot connect to server");
  }
};

  if (isLoggedIn) {
    return (
      <div>
        <h1>AI Recipe Generator 🍳</h1>
        <button onClick={fetchRecipes}>My Recipes</button>

        <button onClick={logout}>Logout</button>

        <hr />

        <h2>Generate a Recipe</h2>

        <form onSubmit={generateRecipe}>
          <div>
            <label>Available Ingredients</label>
            <br />
            <textarea
              rows="4"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="Example: chicken, rice, onion, tomato"
              required
            />
          </div>

          <br />

          <div>
            <label>Cuisine</label>
            <br />
            <select
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
            >
              <option>Indian</option>
              <option>Italian</option>
              <option>Chinese</option>
              <option>Mexican</option>
              <option>American</option>
              <option>Mediterranean</option>
            </select>
          </div>

          <br />

          <div>
            <label>Dietary Preference</label>
            <br />
            <select
              value={dietaryPreference}
              onChange={(e) => setDietaryPreference(e.target.value)}
            >
              <option>None</option>
              <option>Vegetarian</option>
              <option>Vegan</option>
              <option>High-Protein</option>
              <option>Low-Carb</option>
            </select>
          </div>

          <br />

          <div>
            <label>Meal Type</label>
            <br />
            <select
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
            >
              <option>Breakfast</option>
              <option>Lunch</option>
              <option>Dinner</option>
              <option>Snack</option>
              <option>Dessert</option>
            </select>
          </div>

          <br />

          <button type="submit" disabled={loading}>
            {loading ? "Generating..." : "Generate Recipe"}
          </button>
        </form>

        {message && <p>{message}</p>}
        {showHistory && (
  <div>
    <hr />

    <h2>My Recipes</h2>

    {recipes.length === 0 ? (
      <p>No recipes found.</p>
    ) : (
      <ul>
        {recipes.map((item) => (
          <li key={item._id}>
            <strong>{item.title}</strong>
            <br />
            Cuisine: {item.cuisine}
            <br />
            Meal: {item.mealType}
            <br />
            <button
              onClick={() => {
                setRecipe(item);
                setShowHistory(false);
              }}
            >
              View Recipe
            </button>
            <button onClick={() => deleteRecipe(item._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    )}

    <button onClick={() => setShowHistory(false)}>
      Back to Generator
    </button>
  </div>
)}

        {recipe && (
          <div>
            <hr />

            <h2>{recipe.title}</h2>

            <p>
              <strong>Cuisine:</strong> {recipe.cuisine}
            </p>

            <p>
              <strong>Meal:</strong> {recipe.mealType}
            </p>

            <p>
              <strong>Preparation Time:</strong> {recipe.preparationTime}
            </p>

            <p>
              <strong>Cooking Time:</strong> {recipe.cookingTime}
            </p>

            <p>
              <strong>Servings:</strong> {recipe.servings}
            </p>

            <h3>Ingredients</h3>

            <ul>
              {recipe.ingredients?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <h3>Instructions</h3>

            <ol>
              {recipe.instructions?.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>

            {recipe.nutrition && (
              <>
                <h3>Nutrition</h3>

                <p>Calories: {recipe.nutrition.calories}</p>
                <p>Protein: {recipe.nutrition.protein}</p>
                <p>Carbohydrates: {recipe.nutrition.carbohydrates}</p>
                <p>Fat: {recipe.nutrition.fat}</p>
              </>
            )}

            {recipe.tips && (
              <>
                <h3>Cooking Tips</h3>

                <ul>
                  {recipe.tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <h1>AI Recipe Generator 🍳</h1>

      <h2>{isLogin ? "Login" : "Create Account"}</h2>

      <form onSubmit={handleAuth}>
        {!isLogin && (
          <div>
            <label>Name</label>
            <br />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}

        <br />

        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Password</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <br />

        <button type="submit">
          {isLogin ? "Login" : "Register"}
        </button>
      </form>

      {message && <p>{message}</p>}

      <hr />

      <button
        onClick={() => {
          setIsLogin(!isLogin);
          setMessage("");
        }}
      >
        {isLogin
          ? "Don't have an account? Register"
          : "Already have an account? Login"}
      </button>
    </div>
  );
}

export default App;
