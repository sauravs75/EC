const express = require("express");

const cors = require("cors");
const app= express();
const PORT = 5000;
app.use(cors());
app.use(express.json());
const Productroutes = require("./routes/Productroutes");
app.use("/api/products",Productroutes);

// const products=[
//     {
//         id:1,
//         name:"samsung",
//         price:80000
//     },
//     {
//         id:2,
//         name:"lg",
//         price:60000
//     },
//     {
//         id:3,
//         name:"index",
//         price:50000
//     }
// ];
// app.get("/api/products",(req,res)=>{
//     res.json(products);
//     res.status(200).json(products);
// });

// app.get("/api/products",(req,res)=>{
//     try{
//         res.status(200).json(products);
//     }catch(error){
//         res.status(500).json({error:"internal server error"});
//     }
// });

// app.post("/api/products",(req,res)=>{
//     try{
//     const newid=products.length+1;
//     const newProduct={
//         id:newid,
//         ...req.body
//     };
//     products.push(newProduct);
//     res.json(newProduct);
//     res.status(201).json(newProduct);
// }catch(error){
//     res.status(500).json({
//         error:"internal server error"
//     });
// }
// });

// app.delete("/api/Products/:id",(req,res)=>{
//     try{
//     const id=Number(req.params.id);
//     const index= products.findIndex((product)=> product.id === id);
//     if(index === -1){
//          return res.status(404).json({error:"product not found"});
//     }
//     const deletedProduct=products.splice(index,1);
//     res.status(200).json(deletedProduct[0]);
// }catch(error){
//     res.status(500).json({
//         error:"internal server error"
//     });
// }

// });
// app.put("/api/products/:id",(req,res)=>{
//     try{

//     const id=Number(req.params.id);
//     const index=products.findIndex((product)=>product.id ===id);
//     if(index === -1){

//     return res.status(404).json({error:"product not found"});
//     }
//     const updatedProduct={...products[index],...req.body};
//     products[index]=updatedProduct;
//     res.json(updatedProduct);
//     res.status(200).json(updatedProduct);
// }catch(error){
//     res.status(500).json({
//         error:"internal server error"
//     });
// }
// });
app.get("/",(req,res)=>{res.send('backend server is running')});
app.listen(PORT,()=>{console.log(`server is running on the port ${PORT}`)});

