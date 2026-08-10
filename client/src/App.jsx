import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
const API_URL = "https://ai-recipe-generator-465f.onrender.com";
function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("token"))
  );
  const [showHistory, setShowHistory] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [selectedDiet, setSelectedDiet] = useState("");
  const [editingRecipe, setEditingRecipe] = useState(null);

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
      ? `${API_URL}/api/auth/login`
      : `${API_URL}/api/auth/register`

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
        `${API_URL}/api/recipes`,
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
        `${API_URL}/api/recipes`,
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
      `${API_URL}/api/recipes/${recipeId}`,
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
const updateRecipe = async (recipeId) => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(
       `${API_URL}/api/recipes/${recipeId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editingRecipe),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.message || "Failed to update recipe");
      return;
    }

    setRecipes((currentRecipes) =>
      currentRecipes.map((item) =>
        item._id === recipeId ? data.recipe : item
      )
    );

    setRecipe(data.recipe);
    setEditingRecipe(null);
    setMessage("Recipe updated successfully 🎉 🧑‍🍳 ✨");
  } catch (error) {
    setMessage("Cannot connect to server");
  }
};

  if (isLoggedIn) {
    return (
      <div>
        <nav className="navbar navbar-dark bg-dark mb-4">
  <div className="container">
    <span className="navbar-brand mb-0 h1">
      🍳 AI Recipe Generator
    </span>

    <div>
      <button
        className="btn me-2"
        style={{ backgroundColor: "#8a66cb", color: "white" }}
        onClick={fetchRecipes}
        
      >
       🍳My Recipes
      </button>

      <button
        className="btn btn-danger"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  </div>
</nav>

        <div className="container  bg-light min-vh-100 p-4">
  <div className="card shadow-sm">
    <div className="card-body">
      <h2 className="card-title mb-4" style={{ color: "#e83e8c" }}>🍽️ Generate a Recipe</h2>

      <form onSubmit={generateRecipe}>
        <div className="mb-3">
          <label className="form-label fw-semibold">
            Available Ingredients
          </label>

          <textarea
            className="form-control"
            rows="4"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Example: chicken, rice, onion, tomato"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Cuisine</label>

          <select
            className="form-select"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
          >
            <option>🍛Indian</option>
            <option>🍝Italian</option>
            <option>🍜Chinese</option>
            <option>🌮Mexican</option>
            <option>🍔American</option>
            <option>🌊Mediterranean</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">
            Dietary Preference
          </label>

          <select
            className="form-select fw-semibold"
            value={dietaryPreference}
            onChange={(e) =>
              setDietaryPreference(e.target.value)
            }
          >
            <option>🍽️None</option>
            <option>🥗Vegetarian</option>
            <option>🌱Vegan</option>
            <option>💪High-Protein</option>
            <option>🥑carbohydratelow</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="form-label fw-semibold">Meal Type</label>

          <select
            className="form-select"
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
          >
            <option>🌅Breakfast</option>
            <option>☀️Lunch</option>
            <option>🌙Dinner</option>
            <option>零食</option>
            <option>🍰Dessert</option>
          </select>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? "Generating..." : "✨ Generate Recipe"}
        </button>
      </form>
    </div>
  </div>
</div>
          

        {message && <div>{message}</div>}
        {showHistory && !editingRecipe &&(
  <div className="mx-auto p-4 mt-4 mb-4"
  style={{
    backgroundColor: "#f3eafa",
    borderRadius: "20px",
    border: "1px solid #d8c4f0"
  }}>
    <hr />

    <h2 className="text-white fw-bold text-center rounded p-3 mb-4"
    style={{ backgroundColor: "#9b59b6"
     }}
    >
    🍳 My Recipes
</h2>

<p>
  <strong>Total Recipes:</strong> {recipes.length}
</p>

<p>
  <strong>Total Cuisines:</strong>{" "}
  {new Set(recipes.map((item) => item.cuisine)).size}
</p>

<p>
  <strong>Total Dietary Types:</strong>{" "}
  {
    new Set(
      recipes
        .map((item) => item.dietaryPreference)
        .filter(Boolean)
    ).size
  }
</p>
    <h3>Cuisine Statistics</h3>

{Object.entries(
  recipes.reduce((acc, item) => {
    acc[item.cuisine] = (acc[item.cuisine] || 0) + 1;
    return acc;
  }, {})
).map(([cuisine, count]) => (
  <p key={cuisine}>
    {cuisine}: {count}
  </p>
))}

<h3>Dietary Statistics</h3>

{Object.entries(
  recipes.reduce((acc, item) => {
    if (item.dietaryPreference) {
      acc[item.dietaryPreference] =
        (acc[item.dietaryPreference] || 0) + 1;
    }
    return acc;
  }, {})
).map(([diet, count]) => (
  <p key={diet}>
    {diet}: {count}
  </p>
))}
    <input
  type="text"
  className="form-control"
  placeholder="Search recipes..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>

<br />

<select
  className="form-select w-75"
  value={selectedCuisine}
  onChange={(e) => setSelectedCuisine(e.target.value)}
>
  <option value="">All Cuisines</option>
  <option value="Indian"> 🍛 Indian</option>
  <option value="Italian"> 🍝 Italian</option>
  <option value="Chinese"> 🍜 Chinese</option>
  <option value="Mexican"> 🌮 Mexican</option>
  <option value="American"> 🍔 American</option>
</select>

<br />


<select
  className="form-select w-75"
  value={selectedDiet}
  onChange={(e) => setSelectedDiet(e.target.value)}
>
  <option value="">All Dietary Preferences</option>
  <option value="Vegetarian">Vegetarian</option>
  <option value="Non-Vegetarian">Non-Vegetarian</option>
  <option value="Vegan">Vegan</option>
</select>
<br/>
<br/>

    {recipes.length === 0 ? (
      <p>No recipes found.</p>
    ) : (
      <ul className="list-group">
        {recipes
        .filter((item) =>
          (item.title || "").toLowerCase().includes(searchTerm.toLowerCase())
  )
        .filter((item) =>
          selectedCuisine === "" || item.cuisine === selectedCuisine
  )
        .filter((item) =>
          selectedDiet === "" || item.dietaryPreference === selectedDiet
)
        .map((item) => (
          <li
           key={item._id}
           className="list-group-item shadow-sm rounded mb-3 p-3"
           >
            <strong>{item.title}</strong>
            <br />
            Cuisine: {item.cuisine}
            <br />
            Meal: {item.mealType}
            <br />
            <button
              className="btn btn-primary me-2"
              onClick={() => {
                setRecipe(item);
                setShowHistory(false);
              }}
            >
              View Recipe
            </button>
            
            <button 
            className="btn btn-warning me-2"
            onClick={() => {
              setEditingRecipe(item)
               setShowHistory(false);
              
             } }>
               Edit
            </button>
            <button 
            
            className="btn btn-danger"onClick={() => deleteRecipe(item._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    )}

    <button 
    className="btn btn-secondary"
  style={{
    backgroundColor: "#52c137",
    borderColor: "#9fcd49",
    color: "white",
  }}
    onClick={() => setShowHistory(false)}>
      Back to Generator
    </button>
    
  </div>
)}
{editingRecipe && (
  <div
  className="mx-auto p-4 mt-4 mb-4"
  style={{
    backgroundColor: "#fff0f6",
    borderRadius: "20px",
    border: "1px solid #f3c1d5"
  }}
>
    <hr />

    <h2 className="text-white fw-bold text-center rounded p-3 mb-4"  
    style={{ backgroundColor: "#e83e8c" }}
    >
      ✏️Edit Recipe
      </h2>
    <div className="card shadow-sm mx-auto mt-4 mb-4" style={{
    maxWidth: "650px",
    backgroundColor: "#f3a6c7",
    border: "1px solid #f3a6c7",
    borderRadius: "15px"
  }}>

    </div>

    <label className="form-label fw-bold">Recipe Title</label>
    <br />
    <input
      type="text"
      className="form-control w-75 mx-auto"
      value={editingRecipe.title || ""}
      onChange={(e) =>
        setEditingRecipe({
          ...editingRecipe,
          title: e.target.value,
        })
      }
    />

    <br />
    <br />

    <label className="form-label fw-bold">Cuisine</label>
    <br />
    <input
      type="text"
      className="form-control w-75 mx-auto"
      value={editingRecipe.cuisine || ""}
      onChange={(e) =>
        setEditingRecipe({
          ...editingRecipe,
          cuisine: e.target.value,
        })
      }
    />

    <br />
    <br />

    <label className="form-label fw-bold">Meal Type</label>
    <br />
    <input
      type="text"
      className="form-control w-75 mx-auto"
      value={editingRecipe.mealType || ""}
      onChange={(e) =>
        setEditingRecipe({
          ...editingRecipe,
          mealType: e.target.value,
        })
      }
    />

    <br />
    <br />

    <button 
     className="btn btn-primary me-2"
    onClick={() => updateRecipe(editingRecipe._id)}>
      Save Changes
    </button>

    <button 
     className="btn btn-outline-secondary"
     onClick={() => setEditingRecipe(null)}>
      Cancel
    </button>
  </div>
)}

        {recipe && (
          <div>
            <hr />

            <h2 className="text-center fw-bold"
  style={{ color: "#063098" }}
>{recipe.title}</h2>

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
    <div style={{
    backgroundColor: "#f8f1ff",
    minHeight: "100vh",
    padding: "40px 20px"
  }}>
      <h1 className="text-center fw-bold mb-2" style={{ color: "#0c4c2a" }}>
        AI Recipe Generator 🍳
        </h1>

      <h2
      className="text-white text-center fw-bold rounded p-3 mb-4"
      style={{ backgroundColor: "#817b7e" }}
      >
        {isLogin ? "Login" : "Create Account"}</h2>

      <form onSubmit={handleAuth}>
        {!isLogin && (
          <div>
            <label className="form-label fw-bold">Name</label>
            <br />
            <input
              type="text"
              className="form-control w-75 mx-auto"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}

        <br />

        <div>
          <label className="form-label fw-bold">Email</label>
          <br />
          <input
            type="email"
            className=" form-control w-75 mx-auto bg-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <br />

        <div className="mb-3">
          <label className="form-label fw-bold">Password</label>
          <br />
          <input
            type="password"
            className="form-control  bg-white w-75 mx-auto"
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