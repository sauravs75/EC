
import { useEffect,useState } from "react";
function App(){
  const[products,setProducts]=useState([]);
  useEffect(()=>{
    fetch("http://localhost:5000/api/products")
    .then((response)=>response.json())
    .then((data)=>{setProducts(data);

    });
    
  },[]);
  return (
    <dev> 
      <h1>EC</h1>
      {products.map((products)=>{
        return(
          <div key={products.id}>
          <h2>{products.name}</h2>
          <p>₹{products.price}</p>
          </div>
        );
      })}
      </dev>
    );

}
export default App;