import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { categoriesList } from "../data/foodData";
import { useCart } from "../context/CartContext";

const Menu = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialCategory = searchParams.get("category") || "All";

  // API se aane wala data
  const [foods, setFoods] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [dietFilter, setDietFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const [selectedDish, setSelectedDish] = useState(null);
  const [modalQty, setModalQty] = useState(1);
  const [addedItemMap, setAddedItemMap] = useState({});

  const { addToCart } = useCart();

  // ==========================================
  // API SE MENU DATA FETCH KARNA
  // ==========================================

  useEffect(() => {
    fetch("http://localhost:5000/api/menu")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Menu API failed");
        }

        return response.json();
      })
      .then((data) => {
        console.log("API DATA:", data);

        // API data ko hamare existing card format me convert karna
        const formattedData = data.map((food) => ({
          id: food.id,
          name: food.name,
          price: food.price,

          // Tumhari existing categories me API food ko Indian rakhenge
          category: "Indian",

          // Existing design ke liye extra information
          image:
            "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",

          description: `Delicious ${food.name} prepared with fresh ingredients and traditional spices.`,

          isVeg: true,

          rating: 4.5,

          reviewsCount: 100,

          prepTime: "20 min",

          calories: "350 kcal",

          spicyLevel: "Medium",

          ingredients: [
            "Fresh Ingredients",
            "Indian Spices",
            "Special Masala",
          ],

          tag: "Popular",
        }));

        setFoods(formattedData);
        setLoading(false);
      })
      .catch((error) => {
        console.log("API ERROR:", error);
        setError("Menu load nahi ho pa raha hai.");
        setLoading(false);
      });
  }, []);

  // ==========================================
  // URL CATEGORY
  // ==========================================

  useEffect(() => {
    const cat = searchParams.get("category");

    if (cat && categoriesList.includes(cat)) {
      setActiveCategory(cat);
    }
  }, [searchParams]);

  // ==========================================
  // CATEGORY CHANGE
  // ==========================================

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);

    if (cat === "All") {
      searchParams.delete("category");
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: cat });
    }
  };

  // ==========================================
  // ADD TO CART
  // ==========================================

  const handleQuickAdd = (food, e) => {
    e?.stopPropagation();

    addToCart(food, 1);

    setAddedItemMap((prev) => ({
      ...prev,
      [food.id]: true,
    }));

    setTimeout(() => {
      setAddedItemMap((prev) => ({
        ...prev,
        [food.id]: false,
      }));
    }, 1200);
  };

  // ==========================================
  // OPEN MODAL
  // ==========================================

  const openDishModal = (food) => {
    setSelectedDish(food);
    setModalQty(1);
  };

  // ==========================================
  // MODAL ADD TO CART
  // ==========================================

  const handleModalAdd = () => {
    if (selectedDish) {
      addToCart(selectedDish, modalQty);
      setSelectedDish(null);
    }
  };

  // ==========================================
  // FILTER + SORT
  // ==========================================

  const filteredAndSortedFoods = useMemo(() => {
    return foods
      .filter((food) => {
        // Category
        const matchCategory =
          activeCategory === "All" || food.category === activeCategory;

        // Veg / Non Veg
        const matchDiet =
          dietFilter === "all" ||
          (dietFilter === "veg" && food.isVeg) ||
          (dietFilter === "non-veg" && !food.isVeg);

        // Search
        const q = searchQuery.toLowerCase().trim();

        const matchSearch =
          !q ||
          food.name.toLowerCase().includes(q) ||
          food.category.toLowerCase().includes(q) ||
          food.description.toLowerCase().includes(q);

        return matchCategory && matchDiet && matchSearch;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") {
          return a.price - b.price;
        }

        if (sortBy === "price-high") {
          return b.price - a.price;
        }

        if (sortBy === "rating") {
          return b.rating - a.rating;
        }

        return a.id - b.id;
      });
  }, [foods, activeCategory, dietFilter, searchQuery, sortBy]);

  // ==========================================
  // RESET FILTER
  // ==========================================

  const resetFilters = () => {
    setActiveCategory("All");
    setDietFilter("all");
    setSearchQuery("");
    setSortBy("default");

    searchParams.delete("category");
    setSearchParams(searchParams);
  };

  return (
    <div className="menu-page">

      {/* ==========================================
          HERO SECTION
      ========================================== */}

      <section className="menu-hero">
        <div className="menu-hero-content">

          <p className="menu-hero-badge">
            🍽️ ROYAL CULINARY REPERTOIRE
          </p>

          <h1>
            Explore Our <span>Gourmet Dishes</span>
          </h1>

          <p className="menu-hero-text">
            From regal Indian gravies and aromatic clay-pot biryanis to
            artisan pizzas and decadent desserts. Prepared fresh with
            top-shelf ingredients and culinary mastery.
          </p>

          {/* SEARCH */}

          <div className="menu-search-wrapper">

            <span className="search-icon">🔍</span>

            <input
              type="text"
              className="menu-search-input"
              placeholder="Search for Paneer, Biryani, Pizza, Burger, Desserts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {searchQuery && (
              <button
                className="clear-search-btn"
                onClick={() => setSearchQuery("")}
                title="Clear Search"
              >
                ✕
              </button>
            )}

          </div>
        </div>
      </section>

      {/* ==========================================
          MENU CONTENT
      ========================================== */}

      <section className="menu-content">

        <div className="menu-filters-bar">

          {/* CATEGORY BUTTONS */}

          <div className="category-buttons">

            {categoriesList.map((category) => (
              <button
                key={category}
                className={`category-pill-btn ${
                  activeCategory === category
                    ? "active-category"
                    : ""
                }`}
                onClick={() => handleCategoryChange(category)}
              >
                <span>
                  {category === "All" && "🍴 "}
                  {category === "Indian" && "🍛 "}
                  {category === "Pizza" && "🍕 "}
                  {category === "Burger" && "🍔 "}
                  {category === "Chinese" && "🍜 "}
                  {category === "Desserts" && "🍰 "}
                  {category === "Drinks" && "🥤 "}
                  {category}
                </span>
              </button>
            ))}

          </div>

          {/* DIET + SORT */}

          <div className="secondary-controls">

            <div className="diet-toggles">

              <button
                className={`diet-btn ${
                  dietFilter === "all" ? "active" : ""
                }`}
                onClick={() => setDietFilter("all")}
              >
                All
              </button>

              <button
                className={`diet-btn veg ${
                  dietFilter === "veg" ? "active" : ""
                }`}
                onClick={() => setDietFilter("veg")}
              >
                🌱 Veg Only
              </button>

              <button
                className={`diet-btn non-veg ${
                  dietFilter === "non-veg" ? "active" : ""
                }`}
                onClick={() => setDietFilter("non-veg")}
              >
                🍗 Non-Veg
              </button>

            </div>

            {/* SORT */}

            <div className="sort-dropdown-container">

              <label
                htmlFor="menu-sort"
                className="sort-label"
              >
                Sort:
              </label>

              <select
                id="menu-sort"
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">
                  Featured
                </option>

                <option value="price-low">
                  Price: Low to High
                </option>

                <option value="price-high">
                  Price: High to Low
                </option>

                <option value="rating">
                  Top Rated
                </option>
              </select>

            </div>

          </div>
        </div>

        {/* ==========================================
            LOADING
        ========================================== */}

        {loading && (
          <div
            style={{
              textAlign: "center",
              padding: "60px",
            }}
          >
            <h2>🍽️ Loading Menu...</h2>
            <p>Please wait...</p>
          </div>
        )}

        {/* ==========================================
            ERROR
        ========================================== */}

        {error && (
          <div
            style={{
              textAlign: "center",
              padding: "60px",
              color: "red",
            }}
          >
            <h2>❌ {error}</h2>

            <p>
              Make sure backend server is running on
              port 5000.
            </p>
          </div>
        )}

        {/* ==========================================
            RESULTS
        ========================================== */}

        {!loading && !error && (
          <>
            <div className="menu-results-info">

              <span>
                Showing{" "}
                <strong>
                  {filteredAndSortedFoods.length}
                </strong>{" "}
                delicious dishes
              </span>

              {(searchQuery ||
                activeCategory !== "All" ||
                dietFilter !== "all") && (
                <button
                  className="reset-filters-btn"
                  onClick={resetFilters}
                >
                  Reset All Filters ↺
                </button>
              )}

            </div>

            {/* ==========================================
                FOOD GRID
            ========================================== */}

            {filteredAndSortedFoods.length > 0 ? (

              <div className="menu-grid">

                {filteredAndSortedFoods.map((food) => (

                  <div
                    className="menu-card"
                    key={food.id}
                    onClick={() => openDishModal(food)}
                  >

                    {/* IMAGE */}

                    <div className="menu-card-image-box">

                      <img
                        src={food.image}
                        alt={food.name}
                        className="menu-food-img"
                        loading="lazy"
                      />

                      <div className="card-top-tags">

                        <span
                          className={`diet-icon-pill ${
                            food.isVeg
                              ? "veg"
                              : "non-veg"
                          }`}
                        >
                          <span className="dot"></span>

                          {food.isVeg
                            ? "Pure Veg"
                            : "Non-Veg"}
                        </span>

                        {food.tag && (
                          <span className="menu-tag-label">
                            {food.tag}
                          </span>
                        )}

                      </div>

                      <div className="menu-rating-badge">
                        ⭐ {food.rating}
                      </div>

                    </div>

                    {/* CONTENT */}

                    <div className="menu-card-content">

                      <div className="menu-card-meta-line">

                        <span className="food-cat-tag">
                          {food.category}
                        </span>

                        <span className="prep-time-text">
                          ⏱️ {food.prepTime}
                        </span>

                      </div>

                      <h3 className="food-item-name">
                        {food.name}
                      </h3>

                      <p className="food-item-desc">
                        {food.description}
                      </p>

                      <div className="menu-card-bottom">

                        <div className="menu-price-container">

                          <span className="currency">
                            ₹
                          </span>

                          <strong className="amount">
                            {food.price}
                          </strong>

                        </div>

                        <div className="menu-card-actions">

                          <button
                            className="view-details-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              openDishModal(food);
                            }}
                          >
                            Info
                          </button>

                          <button
                            className={`add-cart-btn ${
                              addedItemMap[food.id]
                                ? "added-success"
                                : ""
                            }`}
                            onClick={(e) =>
                              handleQuickAdd(food, e)
                            }
                          >
                            {addedItemMap[food.id]
                              ? "✓ Added"
                              : "+ Add"}
                          </button>

                        </div>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            ) : (

              <div className="empty-results-box">

                <span className="empty-results-icon">
                  🍲
                </span>

                <h3>
                  No culinary matches found
                </h3>

                <p>
                  We couldn't find any dishes matching
                  your search.
                </p>

                <button
                  className="browse-all-btn"
                  onClick={resetFilters}
                >
                  Browse Complete Menu
                </button>

              </div>

            )}

          </>
        )}

      </section>

      {/* ==========================================
          DISH DETAIL MODAL
      ========================================== */}

      {selectedDish && (

        <div
          className="dish-modal-overlay"
          onClick={() => setSelectedDish(null)}
        >

          <div
            className="dish-modal-container"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="modal-close-btn"
              onClick={() => setSelectedDish(null)}
              aria-label="Close dialog"
            >
              ✕
            </button>

            <div className="modal-content-grid">

              {/* IMAGE */}

              <div className="modal-img-col">

                <img
                  src={selectedDish.image}
                  alt={selectedDish.name}
                  className="modal-large-img"
                />

                <div className="modal-img-badges">

                  <span
                    className={`diet-icon-pill ${
                      selectedDish.isVeg
                        ? "veg"
                        : "non-veg"
                    }`}
                  >
                    <span className="dot"></span>

                    {selectedDish.isVeg
                      ? "Pure Veg"
                      : "Non-Veg"}
                  </span>

                  {selectedDish.tag && (
                    <span className="menu-tag-label">
                      {selectedDish.tag}
                    </span>
                  )}

                </div>

              </div>

              {/* INFO */}

              <div className="modal-info-col">

                <div className="modal-meta-row">

                  <span className="modal-category-name">
                    {selectedDish.category}
                  </span>

                  <div className="modal-rating-pill">
                    ⭐ {selectedDish.rating} (
                    {selectedDish.reviewsCount} reviews)
                  </div>

                </div>

                <h2 className="modal-dish-title">
                  {selectedDish.name}
                </h2>

                <p className="modal-dish-desc">
                  {selectedDish.description}
                </p>

                {/* SPECS */}

                <div className="dish-specs-grid">

                  <div className="spec-card">

                    <span className="spec-icon">
                      ⏱️
                    </span>

                    <div>
                      <small>Prep Time</small>

                      <strong>
                        {selectedDish.prepTime}
                      </strong>
                    </div>

                  </div>

                  <div className="spec-card">

                    <span className="spec-icon">
                      🔥
                    </span>

                    <div>
                      <small>Calories</small>

                      <strong>
                        {selectedDish.calories}
                      </strong>
                    </div>

                  </div>

                  <div className="spec-card">

                    <span className="spec-icon">
                      🌶️
                    </span>

                    <div>
                      <small>Spice Level</small>

                      <strong>
                        {selectedDish.spicyLevel}
                      </strong>
                    </div>

                  </div>

                </div>

                {/* INGREDIENTS */}

                {selectedDish.ingredients && (

                  <div className="modal-ingredients-section">

                    <h4>
                      Key Ingredients:
                    </h4>

                    <div className="ingredients-tags-wrap">

                      {selectedDish.ingredients.map(
                        (ing, idx) => (
                          <span
                            key={idx}
                            className="ingredient-tag"
                          >
                            {ing}
                          </span>
                        )
                      )}

                    </div>

                  </div>

                )}

                {/* FOOTER */}

                <div className="modal-footer-action">

                  <div className="modal-price-calc">

                    <span className="modal-total-label">
                      Total Price:
                    </span>

                    <strong className="modal-price-val">
                      ₹
                      {selectedDish.price *
                        modalQty}
                    </strong>

                  </div>

                  {/* QUANTITY */}

                  <div className="modal-qty-selector">

                    <button
                      onClick={() =>
                        setModalQty(
                          Math.max(
                            1,
                            modalQty - 1
                          )
                        )
                      }
                    >
                      -
                    </button>

                    <span>{modalQty}</span>

                    <button
                      onClick={() =>
                        setModalQty(
                          modalQty + 1
                        )
                      }
                    >
                      +
                    </button>

                  </div>

                  <button
                    className="modal-add-cart-btn"
                    onClick={handleModalAdd}
                  >
                    Add {modalQty} to Cart 🛒
                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default Menu;