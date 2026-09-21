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
  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [editid, seteditid] = useState(null);
  const [Loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");
  

  // ADDED: Cart state
  const [cart, setCart] = useState([]);

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

    setFormError("");

    const product = {
      name: name,
      price: Number(price)
    };

    createProducts(product)
      .then((data) => {
        setProducts([...products, data]);
        setname("");
        setprice("");
      });
  };

  // EDITED: Same product ki maximum quantity 25
  const addToCart = (product) => {
    const existingProduct = cart.find(
      (item) => item._id === product._id
    );

    if (existingProduct) {

      // ADDED: 25 ke baad quantity increase nahi hogi
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

  // Function to remove a product from the cart
  const removeFromCart = (id) => {
    setCart(
      cart.filter((product) => product._id !== id)
    );
  };

  // ADDED: Clear complete cart
  const clearCart = () => {
    setCart([]);
  };

  // EDITED: Same product ki maximum quantity 25
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

  // ADDED: Quantity decrease karne ke liye
  // EDITED: Quantity 1 se neeche nahi jayegi
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

  const handleDeleteProducts = (id) => {
    deleteProducts(id)
      .then(() => {
        setProducts(
          products.filter((product) => product._id !== id)
        );
      });
  };

  const handleUpdateProducts = (id, updatedProduct) => {
    if (updatedProduct.name.trim() === "") {
      setFormError("Product name is required.");
      return;
    }

    if (updatedProduct.price <= 0) {
      setFormError("Price must be greater than 0.");
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



const filteredProducts = products.filter((product) =>
  product.name.toLowerCase().includes(search.toLowerCase())
);

  return (
    <div className="app">

      <h1>EC</h1>
      <div className ="search-box">
        <input
        type ="text"
        placeholder="search Products"
        value={search}
        onChange={(e)=> setSearch(e.target.value)}
        />
      </div>

      {/* ADDED: Cart section */}
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

              {/* ADDED: Quantity show karne ke liye */}
              <p>
                Quantity: {product.quantity}
              </p>

              {/* ADDED: Quantity decrease button */}
              <button
                onClick={() =>
                  decreaseQuantity(product._id)
                }
              >
                -
              </button>

              {/* ADDED: Quantity increase button */}
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

        {/* EDITED: Total mein quantity bhi calculate hogi */}
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

        {/* ADDED: Clear Cart button */}
        {cart.length > 0 && (
          <button onClick={clearCart}>
            Clear Cart
          </button>
        )}

      </div>

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

        {formError && (
          <p className="form-error">
            {formError}
          </p>
        )}

        {editid == null && (
          <button onClick={addProducts}>
            Add Product
          </button>
        )}

        {editid != null && (
          <>
            <button
              onClick={() => {
                handleUpdateProducts(editid, {
                  name: name,
                  price: Number(price)
                });

                setname("");
                setprice("");
                seteditid(null);
              }}
            >
              Save
            </button>

            <button
              onClick={() => {
                setname("");
                setprice("");
                seteditid(null);
                setFormError("");
              }}
            >
              Cancel
            </button>
          </>
        )}

      </div>

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