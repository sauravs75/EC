const express = require("express");
const cors = require("cors");
const app= express();
const PORT = 5000;
app.use(cors());
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
app.get("/",(req,res)=>{res.send('backend server is running')});
app.listen(PORT,()=>{console.log(`server is running on the port ${PORT}`)});

