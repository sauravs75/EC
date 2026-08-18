
import { useEffect,useState } from "react";
import "./App.css";
function App(){
  const[products,setProducts]=useState([]);
  const[name,setname]=useState("");
  const[price,setprice]=useState("");
  const[editid,seteditid]=useState(null);
  useEffect(()=>{
    fetch("http://localhost:5000/api/products")
    .then((response)=>response.json())
    .then((data)=>{setProducts(data);

    });
    
  },[]);
  const addProducts=()=>{
    const product={name:name,price:Number(price)};
    fetch("http://localhost:5000/api/products",{
      method:"POST",
      headers:{"content-type":"application/json"},
      body:JSON.stringify(product)
    })
    .then((response)=>response.json())
    .then((data)=>{
      console.log(data); 
      setProducts([...products,data]);  
      setname("");
      setprice("");                 
    });

  };
  const deleteProduct=(id)=>{
    fetch(`http://localhost:5000/api/products/${id}`,{
      method:"DELETE"

    })
    .then((responce)=>responce.json())
    .then((data)=>{
      console.log(data);
      setProducts(products.filter((product)=>product.id !== id));
    });
   
  
  };

  const updateProduct=(id,updatedProduct)=>{
    fetch(`http://localhost:5000/api/products/${id}`,{
      method:"PUT",
      headers:{"content-type":"application/json"},
      body:JSON.stringify(updatedProduct)
    })
    .then((response)=>response.json())
    .then((data)=>{
      console.log(data);
      setProducts(products.map((product)=>product.id === id ?{...product,...data}:product));

    });
  };
  return (
    <div> 
      <h1>EC</h1>
      <input type="text" placeholder="name" value={name} onChange={(e)=>setname(e.target.value)}/>
      <input type="number" placeholder="price" value={price} onChange={(e)=>setprice(e.target.value)}/>
      <button onClick={addProducts}>Add Product</button>
      {editid != null && (
      <button onClick={()=>{
        updateProduct(editid,{
          name:name,
          price:Number(price)
        });
        setname("");
        setprice("");
        seteditid(null);
      }}>Save</button>
     )}
      <div className="products">
      {products.map((products)=>{
        return(
          <div className ="product-card" key={products.id}>
          <h2>{products.name}</h2>
          <p>₹{products.price}</p>
          <button>Add to Cart</button>
          <button onClick={()=>
            deleteProduct(products.id)}>Delete </button>
          <button onClick={()=>{
              setname(products.name);
              setprice(products.price);
              seteditid(products.id);

          }}>Update</button>
            
          </div>
        );
      })}
      </div>
      </div>

    );

}
export default App;