const express = require("express");
const cors = require("cors");
const app= express();
const PORT = 5000;
app.use(cors());
app.use(express.json());
const products=[
    {
        id:1,
        name:"samsung",
        price:80000
    },
    {
        id:2,
        name:"lg",
        price:60000
    },
    {
        id:3,
        name:"index",
        price:50000
    }
];
app.get("/api/products",(req,res)=>{
    res.json(products);
});
app.post("/api/products",(req,res)=>{
    const newid=products.length+1;
    const newProduct={
        id:newid,
        ...req.body
    };
    products.push(newProduct);
    res.json(newProduct);
    
})
app.delete("/api/Products/:id",(req,res)=>{
    const id=Number(req.params.id);
    const index= products.findIndex((product)=> product.id === id);
    if(index === -1){
         return res.status(404).json({error:"product not found"});
    }
    const deletedProduct=products.splice(index,1);
    res.json(deletedProduct[0]);
});
app.put("/api/products/:id",(req,res)=>{
    const id=Number(req.params.id);
    const index=products.findIndex((product)=>product.id ===id);
    if(index === -1){

    return res.status(404).json({error:"product not found"});
    }
    const updatedProduct={...products[index],...req.body};
    products[index]=updatedProduct;
    res.json(updatedProduct);
});
app.get("/",(req,res)=>{res.send('backend server is running')});
app.listen(PORT,()=>{console.log(`server is running on the port ${PORT}`)});

