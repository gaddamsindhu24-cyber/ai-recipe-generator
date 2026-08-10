
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div
      className="min-vh-100"
      style={{
        backgroundColor: "#fffaf7",
        color: "#333",
      }}
    >
      {/* ================= NAVBAR ================= */}
      <nav
        className="navbar navbar-expand-lg bg-white shadow-sm sticky-top"
        style={{ padding: "15px 0" }}
      >
        <div className="container">
          <span
            className="navbar-brand fw-bold"
            style={{
              color: "#6f42c1",
              fontSize: "24px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            🍳 AI Recipe Generator
          </span>

          <div className="d-flex gap-2">
            <button
              className="btn btn-outline-primary px-4"
              style={{ borderRadius: "25px" }}
              onClick={() => navigate("/app")}
            >
              My Recipes
            </button>

            <button
              className="btn btn-primary px-4"
              style={{ borderRadius: "25px" }}
              onClick={() => navigate("/app")}
            >
              Generate Recipe ✨
            </button>
          </div>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section
        style={{
          background:
            "linear-gradient(135deg, #fff4ed 0%, #f3eaff 100%)",
          padding: "70px 0",
        }}
      >
        <div className="container">
          <div className="row align-items-center g-5">

            {/* LEFT */}
            <div className="col-lg-6">
              <span
                className="badge px-3 py-2 mb-3"
                style={{
                  backgroundColor: "#eadcff",
                  color: "#6f42c1",
                  borderRadius: "20px",
                  fontSize: "14px",
                }}
              >
                ✨ AI-Powered Cooking Assistant
              </span>

              <h1
                className="fw-bold"
                style={{
                  fontSize: "clamp(42px, 6vw, 65px)",
                  lineHeight: "1.1",
                  color: "#3f2a56",
                }}
              >
                Turn Your Ingredients
                <br />
                Into <span style={{ color: "#6f42c1" }}>Delicious</span>
                <br />
                Recipes 🍽️
              </h1>

              <p
                className="mt-4 text-muted"
                style={{
                  fontSize: "19px",
                  maxWidth: "570px",
                  lineHeight: "1.7",
                }}
              >
                Don't know what to cook? Tell our AI what ingredients
                you have and get a personalized recipe in seconds.
              </p>

              <div className="d-flex flex-wrap gap-3 mt-4">
                <button
                  className="btn btn-primary btn-lg px-4 shadow"
                  style={{
                    borderRadius: "30px",
                    backgroundColor: "#6f42c1",
                    border: "none",
                  }}
                  onClick={() => navigate("/app")}
                >
                  🍽️ Generate Recipe
                </button>

                <button
                  className="btn btn-light btn-lg px-4 shadow-sm"
                  style={{
                    borderRadius: "30px",
                    color: "#6f42c1",
                  }}
                  onClick={() => navigate("/app")}
                >
                  📖 My Recipes
                </button>
              </div>

              
            </div>

            {/* RIGHT - FOOD IMAGE */}
            <div className="col-lg-6">
              <div
                className="position-relative mx-auto"
                style={{
                  maxWidth: "520px",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=85"
                  alt="Healthy food"
                  className="img-fluid shadow-lg"
                  style={{
                    width: "100%",
                    height: "480px",
                    objectFit: "cover",
                    borderRadius: "35px",
                  }}
                />

                

                
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= POPULAR FOOD IMAGES ================= */}
      <section className="container py-5">
        <div className="text-center mb-5">
          <span
            style={{
              color: "#6f42c1",
              fontWeight: "600",
            }}
          >
            EXPLORE YOUR OPTIONS
          </span>

          <h2
            className="fw-bold mt-2"
            style={{ color: "#3f2a56" }}
          >
            What Are You Craving?
          </h2>

          <p className="text-muted">
            Let AI help you discover your next favorite meal.
          </p>
        </div>

        <div className="row g-4">

          {/* Italian */}
          <div className="col-md-4">
            <div
              className="card border-0 shadow-sm overflow-hidden"
              style={{ borderRadius: "22px" }}
            >
              <img
                src="https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=85"
                alt="Italian pasta"
                style={{
                  height: "230px",
                  width: "100%",
                  objectFit: "cover",
                }}
              />

              <div className="card-body p-4">
                <h5 className="fw-bold">🍝 Italian</h5>
                <p className="text-muted mb-0">
                  Pasta, pizza and delicious Italian flavors.
                </p>
              </div>
            </div>
          </div>

          {/* Indian */}
          <div className="col-md-4">
            <div
              className="card border-0 shadow-sm overflow-hidden"
              style={{ borderRadius: "22px" }}
            >
              <img
                src="https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=85"
                alt="Indian food"
                style={{
                  height: "230px",
                  width: "100%",
                  objectFit: "cover",
                }}
              />

              <div className="card-body p-4">
                <h5 className="fw-bold">🍛 Indian</h5>
                <p className="text-muted mb-0">
                  Rich spices and traditional Indian dishes.
                </p>
              </div>
            </div>
          </div>

          {/* Healthy */}
          <div className="col-md-4">
            <div
              className="card border-0 shadow-sm overflow-hidden"
              style={{ borderRadius: "22px" }}
            >
              <img
                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=85"
                alt="Healthy food"
                style={{
                  height: "230px",
                  width: "100%",
                  objectFit: "cover",
                }}
              />

              <div className="card-body p-4">
                <h5 className="fw-bold">🥗 Healthy</h5>
                <p className="text-muted mb-0">
                  Fresh, healthy and nutritious meal ideas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      
{/* ================= FEATURES ================= */}
<section
  style={{
    backgroundColor: "#f8f1ff",
    padding: "70px 0",
  }}
>
  <div className="container">

    <div className="text-center mb-5">
      <span
        style={{
          color: "#6f42c1",
          fontWeight: "600",
          letterSpacing: "1px",
        }}
      >
        WHY CHOOSE US
      </span>

      <h2
        className="fw-bold mt-2"
        style={{
          color: "#3f2a56",
          fontSize: "36px",
        }}
      >
        Everything You Need
      </h2>

      <p className="text-muted">
        A smarter and easier way to create and manage your meals.
      </p>
    </div>

    <div className="row g-4">

      {/* AI POWERED */}
      <div className="col-md-6 col-lg-3">
        <div
          className="card border-0 shadow-sm h-100 overflow-hidden"
          style={{
            borderRadius: "22px",
            transition: "transform 0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-8px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=85"
            alt="AI cooking"
            style={{
              width: "100%",
              height: "190px",
              objectFit: "cover",
            }}
          />

          <div className="card-body text-center p-4">
            <div
              className="mx-auto mb-3"
              style={{
                width: "55px",
                height: "55px",
                borderRadius: "50%",
                backgroundColor: "#f3eaff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "28px",
              }}
            >
              🤖
            </div>

            <h5 className="fw-bold">
              AI Powered
            </h5>

            <p className="text-muted mb-0">
              Generate creative recipes using artificial
              intelligence.
            </p>
          </div>
        </div>
      </div>

      {/* PERSONALIZED */}
      <div className="col-md-6 col-lg-3">
        <div
          className="card border-0 shadow-sm h-100 overflow-hidden"
          style={{
            borderRadius: "22px",
            transition: "transform 0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-8px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=800&q=85"
            alt="Personalized healthy meal"
            style={{
              width: "100%",
              height: "190px",
              objectFit: "cover",
            }}
          />

          <div className="card-body text-center p-4">
            <div
              className="mx-auto mb-3"
              style={{
                width: "55px",
                height: "55px",
                borderRadius: "50%",
                backgroundColor: "#f3eaff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "28px",
              }}
            >
              🥗
            </div>

            <h5 className="fw-bold">
              Personalized
            </h5>

            <p className="text-muted mb-0">
              Choose cuisine, meal type and dietary
              preferences.
            </p>
          </div>
        </div>
      </div>

      {/* SAVE RECIPES */}
      <div className="col-md-6 col-lg-3">
        <div
          className="card border-0 shadow-sm h-100 overflow-hidden"
          style={{
            borderRadius: "22px",
            transition: "transform 0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-8px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=85"
            alt="Recipe ingredients"
            style={{
              width: "100%",
              height: "190px",
              objectFit: "cover",
            }}
          />

          <div className="card-body text-center p-4">
            <div
              className="mx-auto mb-3"
              style={{
                width: "55px",
                height: "55px",
                borderRadius: "50%",
                backgroundColor: "#f3eaff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "28px",
              }}
            >
              📖
            </div>

            <h5 className="fw-bold">
              Save Recipes
            </h5>

            <p className="text-muted mb-0">
              Keep all your favorite generated recipes
              in one place.
            </p>
          </div>
        </div>
      </div>

      {/* EASY SEARCH */}
      <div className="col-md-6 col-lg-3">
        <div
          className="card border-0 shadow-sm h-100 overflow-hidden"
          style={{
            borderRadius: "22px",
            transition: "transform 0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-8px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=85"
            alt="Cooking ingredients"
            style={{
              width: "100%",
              height: "190px",
              objectFit: "cover",
            }}
          />

          <div className="card-body text-center p-4">
            <div
              className="mx-auto mb-3"
              style={{
                width: "55px",
                height: "55px",
                borderRadius: "50%",
                backgroundColor: "#f3eaff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "28px",
              }}
            >
              🔎
            </div>

            <h5 className="fw-bold">
              Easy Search
            </h5>

            <p className="text-muted mb-0">
              Quickly find, edit and manage your recipes.
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>



      
{/* ================= HOW IT WORKS ================= */}
<section
  className="py-5"
  style={{
    backgroundImage:
      "linear-gradient(rgba(40, 25, 55, 0.72), rgba(40, 25, 55, 0.72)), url('https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=85')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
  }}
>
  <div className="container py-4">

    <div
      className="text-center text-white"
    >
      <span
        style={{
          color: "#e5c7ff",
          fontWeight: "600",
          letterSpacing: "2px",
        }}
      >
        SIMPLE & FAST
      </span>

      <h2
        className="fw-bold mt-2"
        style={{
          fontSize: "38px",
        }}
      >
        How It Works
      </h2>

      <p
        className="mt-3"
        style={{
          color: "#eeeeee",
          fontSize: "17px",
        }}
      >
        Create delicious recipes in just three simple steps.
      </p>
    </div>

    <div className="row mt-5 g-4">

      {/* STEP 1 */}
      <div className="col-md-4">
        <div
          className="text-center text-white h-100 p-4"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.12)",
            borderRadius: "25px",
            border: "1px solid rgba(255,255,255,0.25)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div
            className="mx-auto mb-4"
            style={{
              width: "85px",
              height: "85px",
              borderRadius: "50%",
              backgroundColor: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "40px",
              boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
            }}
          >
            🥕
          </div>

          <h5 className="fw-bold">
            1. Enter Ingredients
          </h5>

          <p
            className="mb-0"
            style={{ color: "#eeeeee" }}
          >
            Tell us what ingredients you already have.
          </p>
        </div>
      </div>

      {/* STEP 2 */}
      <div className="col-md-4">
        <div
          className="text-center text-white h-100 p-4"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.12)",
            borderRadius: "25px",
            border: "1px solid rgba(255,255,255,0.25)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div
            className="mx-auto mb-4"
            style={{
              width: "85px",
              height: "85px",
              borderRadius: "50%",
              backgroundColor: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "40px",
              boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
            }}
          >
            ✨
          </div>

          <h5 className="fw-bold">
            2. Let AI Create
          </h5>

          <p
            className="mb-0"
            style={{ color: "#eeeeee" }}
          >
            Our AI generates a personalized recipe for you.
          </p>
        </div>
      </div>

      {/* STEP 3 */}
      <div className="col-md-4">
        <div
          className="text-center text-white h-100 p-4"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.12)",
            borderRadius: "25px",
            border: "1px solid rgba(255,255,255,0.25)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div
            className="mx-auto mb-4"
            style={{
              width: "85px",
              height: "85px",
              borderRadius: "50%",
              backgroundColor: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "40px",
              boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
            }}
          >
            🍽️
          </div>

          <h5 className="fw-bold">
            3. Start Cooking
          </h5>

          <p
            className="mb-0"
            style={{ color: "#eeeeee" }}
          >
            Follow the recipe and enjoy your meal.
          </p>
        </div>
      </div>

    </div>

    <div className="text-center mt-5">
      <button
        className="btn btn-light btn-lg px-5 shadow"
        style={{
          borderRadius: "30px",
          color: "#6f42c1",
          fontWeight: "600",
        }}
        onClick={() => navigate("/app")}
      >
        ✨ Create My Recipe
      </button>
    </div>

  </div>
</section>


      {/* ================= CTA ================= */}
      <section className="container pb-5">
        <div
          className="text-center p-5"
          style={{
            background:
              "linear-gradient(135deg, #6f42c1, #9b6de3)",
            borderRadius: "30px",
            color: "white",
          }}
        >
          <div style={{ fontSize: "50px" }}>🍳</div>

          <h2 className="fw-bold mt-2">
            Ready to Cook Something Amazing?
          </h2>

          <p className="mb-4">
            Turn your everyday ingredients into something special.
          </p>

          <button
            className="btn btn-light btn-lg px-5"
            style={{
              borderRadius: "30px",
              color: "#6f42c1",
              fontWeight: "600",
            }}
            onClick={() => navigate("/app")}
          >
            Start Cooking 🚀
          </button>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer
        className="text-center py-4"
        style={{
          backgroundColor: "#f8f1ff",
        }}
      >
        <h5
          className="fw-bold"
          style={{ color: "#6f42c1" }}
        >
          🍳 AI Recipe Generator
        </h5>

        <p className="text-muted mb-1">
          Create delicious recipes with the power of AI ✨
        </p>

        <small className="text-muted">
          © 2026 AI Recipe Generator
        </small>
      </footer>
    </div>
  );
}

export default Home;

