
import { useEffect, useState } from "react";
import "./App.css";

import Products from "./pages/Products";

import {
  getProducts,
  createProducts,
  deleteProducts,
  updateProducts
} from "./services/productServices";

function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sort, setSort] = useState("default");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [category, setCategory] = useState("");
  const [editid, seteditid] = useState(null);
  const [Loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");

  const [cart, setCart] = useState([]);

  // Get all products
  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to load products");
        setLoading(false);
      });
  }, []);

  // Add Product
  const addProducts = () => {
    if (name.trim() === "") {
      setFormError("Product name is required.");
      return;
    }

    if (price === "") {
      setFormError("Product price is required.");
      return;
    }

    if (Number(price) <= 0) {
      setFormError("Price must be greater than 0.");
      return;
    }

    if (category === "") {
      setFormError("Product category is required.");
      return;
    }

    setFormError("");

    const product = {
      name: name,
      price: Number(price),
      category: category
    };

    createProducts(product)
      .then((data) => {
        setProducts([...products, data]);
        setname("");
        setprice("");
        setCategory("");
      });
  };

  // Add product to cart
  const addToCart = (product) => {
    const existingProduct = cart.find(
      (item) => item._id === product._id
    );

    if (existingProduct) {
      if (existingProduct.quantity >= 25) {
        return;
      }

      setCart(
        cart.map((item) =>
          item._id === product._id
            ? {
              ...item,
              quantity: item.quantity + 1
            }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1
        }
      ]);
    }
  };

  // Remove product from cart
  const removeFromCart = (id) => {
    setCart(
      cart.filter((product) => product._id !== id)
    );
  };

  // Clear complete cart
  const clearCart = () => {
    setCart([]);
  };

  // Increase quantity
  const increaseQuantity = (id) => {
    setCart(
      cart.map((product) =>
        product._id === id
          ? {
            ...product,
            quantity:
              product.quantity < 25
                ? product.quantity + 1
                : 25
          }
          : product
      )
    );
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    setCart(
      cart
        .map((product) =>
          product._id === id
            ? {
              ...product,
              quantity: product.quantity - 1
            }
            : product
        )
        .filter((product) => product.quantity > 0)
    );
  };

  // Delete Product
  const handleDeleteProducts = (id) => {
    deleteProducts(id)
      .then(() => {
        setProducts(
          products.filter((product) => product._id !== id)
        );
      });
  };

  // Update Product
  const handleUpdateProducts = (id, updatedProduct) => {
    if (updatedProduct.name.trim() === "") {
      setFormError("Product name is required.");
      return;
    }

    if (updatedProduct.price <= 0) {
      setFormError("Price must be greater than 0.");
      return;
    }

    if (updatedProduct.category === "") {
      setFormError("Product category is required.");
      return;
    }

    setFormError("");

    updateProducts(id, updatedProduct)
      .then((data) => {
        setProducts(
          products.map((product) =>
            product._id === id
              ? { ...product, ...data }
              : product
          )
        );
      });
  };

  // Search + Category Filter
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      const matchesPrice =
        (minPrice === "" || product.price >= Number(minPrice)) &&
        (maxPrice === "" || product.price <= Number(maxPrice));

      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      if (sort === "lowToHigh") {
        return a.price - b.price;
      }

      if (sort === "highToLow") {
        return b.price - a.price;
      }

      return 0;
    });

  return (
    <div className="app">

      <h1>EC</h1>

      {/* Search */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search Products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Category Filter */}
      <div className="category-filter">
        <label>Filter by Category</label>

        <select
          value={selectedCategory}
          onChange={(e) =>
            setSelectedCategory(e.target.value)
          }
        >
          <option value="All">All</option>
          <option value="Mobile">Mobile</option>
          <option value="Laptop">Laptop</option>
          <option value="TV">TV</option>
        </select>
      </div>

      <div className="sort-filter">
        <label>Sort By</label>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="default">Default</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      </div>

      <div className="price-filter">
        <label>Price Range</label>

        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>

      {/* Cart */}
      <div className="cart-section">

        <h2>🛒 Cart: {cart.length}</h2>

        {cart.length > 0 ? (
          cart.map((product) => (
            <div
              className="cart-item"
              key={product._id}
            >

              <p>
                {product.name} - ₹{product.price}
              </p>

              <p>
                Quantity: {product.quantity}
              </p>

              <button
                onClick={() =>
                  decreaseQuantity(product._id)
                }
              >
                -
              </button>

              <button
                onClick={() =>
                  increaseQuantity(product._id)
                }
              >
                +
              </button>

              <button
                onClick={() =>
                  removeFromCart(product._id)
                }
              >
                Remove
              </button>

            </div>
          ))
        ) : (
          <p>Cart is empty</p>
        )}

        {/* Cart Total */}
        {cart.length > 0 && (
          <h3>
            Total: ₹
            {cart.reduce(
              (total, product) =>
                total +
                product.price * product.quantity,
              0
            )}
          </h3>
        )}

        {/* Clear Cart */}
        {cart.length > 0 && (
          <button onClick={clearCart}>
            Clear Cart
          </button>
        )}

      </div>

      {/* Product Form */}
      <div className="product-form">

        <label>Product Name</label>

        <input
          type="text"
          placeholder="Enter product name"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />

        <label>Product Price</label>

        <input
          type="number"
          placeholder="Enter product price"
          value={price}
          onChange={(e) => setprice(e.target.value)}
        />

        <label>Product Category</label>

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >
          <option value="">
            Select Category
          </option>

          <option value="Mobile">
            Mobile
          </option>

          <option value="Laptop">
            Laptop
          </option>

          <option value="TV">
            TV
          </option>
        </select>

        {formError && (
          <p className="form-error">
            {formError}
          </p>
        )}

        {/* Add Button */}
        {editid == null && (
          <button onClick={addProducts}>
            Add Product
          </button>
        )}

        {/* Update Mode */}
        {editid != null && (
          <>
            <button
              onClick={() => {
                handleUpdateProducts(editid, {
                  name: name,
                  price: Number(price),
                  category: category
                });

                setname("");
                setprice("");
                setCategory("");
                seteditid(null);
              }}
            >
              Save
            </button>

            <button
              onClick={() => {
                setname("");
                setprice("");
                setCategory("");
                seteditid(null);
                setFormError("");
              }}
            >
              Cancel
            </button>
          </>
        )}

      </div>

      {/* Products */}
      {Loading ? (
        <p>Product Loading...</p>

      ) : error ? (
        <p>{error}</p>

      ) : products.length === 0 ? (
        <p>No Products Available</p>

      ) : (
        <Products
          products={filteredProducts}
          onDelete={handleDeleteProducts}

          onUpdate={(product) => {
            setname(product.name);
            setprice(product.price);
            setCategory(product.category);
            seteditid(product._id);
            setFormError("");
          }}

          onAddToCart={addToCart}
        />
      )}

    </div>
  );
}

export default App;


