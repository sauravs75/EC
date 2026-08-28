import { useEffect, useState } from "react";
import "./App.css";

import Products from "./pages/Products";
//
import {
  getProducts,
  createProducts,
  deleteProducts,
  updateProducts
} from "./services/productServices";

function App() {
  const [products, setProducts] = useState([]);
  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [editid, seteditid] = useState(null);
  const [Loading, setLoading] = useState(true);
  const [error, setError] = useState("");
 // const [formError,setFormError]= useState("");


  // Get Products
  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      }).catch((error) => {
        setError("Failed to load products");
        setLoading(false);
      });
  }, []);

  // Add Product
  const addProducts = () => {
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

  // Delete Product
  const handleDeleteProducts = (id) => {
    deleteProducts(id)
      .then((data) => {
        setProducts(
          products.filter((product) => product._id !== id)
        );
      });
  };

  // Update Product
  const handleUpdateProducts = (id, updatedProduct) => {
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

  return (
    <div>
      <h1>EC</h1>

      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => setname(e.target.value)}
      />

      <input
        type="number"
        placeholder="price"
        value={price}
        onChange={(e) => setprice(e.target.value)}
      />

      <button onClick={addProducts}>
        Add Product
      </button>

      {editid != null && (
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
      )}
      {Loading ? (
        <p>Product Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : products.length == 0 ? (
        <p>No Products Available </p>
      ) : (
        <Products
          products={products}
          onDelete={handleDeleteProducts}
          onUpdate={(product) => {
            setname(product.name);
            setprice(product.price);
            seteditid(product._id);
          }}
        />
      )}
    </div>
  );
}

export default App;
// import { useEffect, useState } from "react";
// import "./App.css";

// import Products from "./pages/Products";

// // ProductList is now used inside Products.jsx.
// // import ProductList from "./component/productlist";

// // ProductCard is now used inside ProductList.jsx.
// // import ProductCard from "./component/productcard";

// import {
//   getProducts,
//   createProducts,
//   deleteProducts,
//   updateProducts
// } from "./services/productServices";


// function App() {
//   const [products, setProducts] = useState([]);
//   const [name, setname] = useState("");
//   const [price, setprice] = useState("");
//   const [editid, seteditid] = useState(null);


//   // =========================
//   // GET PRODUCTS
//   // =========================

//   useEffect(() => {
//     getProducts()
//       .then((data) => {
//         setProducts(data);
//       });
//   }, []);



//   // ADD PRODUCT


//   const addProducts = () => {
//     const product = {
//       name: name,
//       price: Number(price)
//     };

//     createProducts(product)
//       .then((data) => {
//         setProducts([...products, data]);
//         setname("");
//         setprice("");
//       });
//   };


//   // =========================
//   // DELETE PRODUCT
//   // =========================

//   const handleDeleteProducts = (id) => {
//     deleteProducts(id)
//       .then((data) => {
//         setProducts(
//           products.filter((product) => product._id !== id)
//         );
//       });
//   };


//   // =========================
//   // UPDATE PRODUCT
//   // =========================

//   const handleUpdateProducts = (id, updatedProduct) => {
//     updateProducts(id, updatedProduct)
//       .then((data) => {
//         setProducts(
//           products.map((product) =>
//             product._id === id
//               ? { ...product, ...data }
//               : product
//           )
//         );
//       });
//   };


//   return (
//     <div>

//       <h1>EC</h1>


//       {/* =========================
//           PRODUCT FORM
//           ========================= */}

//       <input
//         type="text"
//         placeholder="name"
//         value={name}
//         onChange={(e) => setname(e.target.value)}
//       />

//       <input
//         type="number"
//         placeholder="price"
//         value={price}
//         onChange={(e) => setprice(e.target.value)}
//       />


//       <button onClick={addProducts}>
//         Add Product
//       </button>


//       {/* =========================
//           SAVE / UPDATE BUTTON
//           ========================= */}

//       {editid != null && (
//         <button
//           onClick={() => {

//             handleUpdateProducts(editid, {
//               name: name,
//               price: Number(price)
//             });

//             setname("");
//             setprice("");
//             seteditid(null);

//           }}
//         >
//           Save
//         </button>
//       )}


//       {/* =========================
//           PRODUCTS PAGE
//           =========================

//           Products.jsx is now responsible
//           for displaying the product page.

//           Flow:

//           App.jsx
//              ↓
//           Products.jsx
//              ↓
//           ProductList.jsx
//              ↓
//           ProductCard.jsx
//       */}

//       <Products
//         products={products}

//         onDelete={handleDeleteProducts}

//         onUpdate={(product) => {

//           setname(product.name);
//           setprice(product.price);
//           seteditid(product._id);

//         }}
//       />

//     </div>
//   );
// }

// export default App;


// /*
// ====================================================
// OLD / PREVIOUS CODE
// ====================================================

// We are keeping the old code commented at the bottom
// for learning and future reference.

// The old code was working, but we moved the
// responsibilities into separate files/components.

// OLD STRUCTURE:

// App.jsx
//    ↓
// ProductList.jsx
//    ↓
// ProductCard.jsx

// NEW STRUCTURE:

// App.jsx
//    ↓
// Products.jsx
//    ↓
// ProductList.jsx
//    ↓
// ProductCard.jsx
// */


// /*
// ====================================================
// OLD GET CODE
// ====================================================

// Previously App.jsx directly used fetch() to get
// products.

// Now the GET request is handled by:

// services/productServices.js

// */

// // OLD CODE:

// /*
// useEffect(() => {
//   fetch("http://localhost:5000/api/products")
//     .then((response) => response.json())
//     .then((data) => {
//       setProducts(data);
//     });
// }, []);
// */


// /*
// ====================================================
// OLD POST CODE
// ====================================================

// Previously App.jsx directly used fetch() to create
// a product.

// Now createProducts() from productServices.js
// handles the API request.

// */

// // OLD CODE:

// /*
// const addProducts = () => {
//   const product = {
//     name: name,
//     price: Number(price)
//   };

//   fetch("http://localhost:5000/api/products", {
//     method: "POST",
//     headers: {
//       "content-type": "application/json"
//     },
//     body: JSON.stringify(product)
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       setProducts([...products, data]);
//       setname("");
//       setprice("");
//     });
// };
// */


// /*
// ====================================================
// OLD DELETE CODE
// ====================================================

// Previously App.jsx directly used fetch() to delete
// a product.

// Now deleteProducts() from productServices.js
// handles the API request.

// */

// // OLD CODE:

// /*
// const deleteProduct = (id) => {
//   fetch(`http://localhost:5000/api/products/${id}`, {
//     method: "DELETE"
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       setProducts(
//         products.filter((product) => product.id !== id)
//       );
//     });
// };
// */


// /*
// ====================================================
// OLD PUT CODE
// ====================================================

// Previously App.jsx directly used fetch() to update
// a product.

// Now updateProducts() from productServices.js
// handles the API request.

// */

// // OLD CODE:

// /*
// const updateProduct = (id, updatedProduct) => {
//   fetch(`http://localhost:5000/api/products/${id}`, {
//     method: "PUT",
//     headers: {
//       "content-type": "application/json"
//     },
//     body: JSON.stringify(updatedProduct)
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       setProducts(
//         products.map((product) =>
//           product.id === id
//             ? { ...product, ...data }
//             : product
//         )
//       );
//     });
// };
// */


// /*
// ====================================================
// OLD PRODUCT LIST CODE
// ====================================================

// Previously App.jsx directly displayed all products
// using products.map().

// Now ProductList.jsx handles the list and
// ProductCard.jsx handles one product.

// We keep this code commented so we can understand
// how the project was structured before.

// */

// // OLD CODE:

// /*
// <div className="products">

//   {products.map((product) => {

//     return (
//       <div
//         className="product-card"
//         key={product._id}
//       >

//         <h2>{product.name}</h2>

//         <p>₹{product.price}</p>

//         <button>
//           Add to Cart
//         </button>

//         <button
//           onClick={() =>
//             handleDeleteProducts(product._id)
//           }
//         >
//           Delete
//         </button>

//         <button
//           onClick={() => {
//             setname(product.name);
//             setprice(product.price);
//             seteditid(product._id);
//           }}
//         >
//           Update
//         </button>

//       </div>
//     );

//   })}

// </div>
// */


// /*
// ====================================================
// OLD PRODUCT LIST IMPORT
// ====================================================

// ProductList is no longer directly used by App.jsx.

// ProductList is now imported and used inside
// Products.jsx.

// */

// // OLD IMPORT:

// /*
// import ProductList from "./component/productlist";
// */


// /*
// ====================================================
// OLD PRODUCT CARD IMPORT
// ====================================================

// ProductCard is no longer directly used by App.jsx.

// ProductCard is now used inside ProductList.jsx.

// */

// // OLD IMPORT:

// /*
// import ProductCard from "./component/productcard";
// */