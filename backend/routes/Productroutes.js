const express = require("express");
const router =express.Router();
const products= require("../data/products");
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
router.get("/",(req,res)=>{
    try{
        res.status(200).json(products);
    }catch(error){
        res.status(500).json({error:"internal server error"});
    }
});

router.post("/",(req,res)=>{
    try{
    const newid=products.length+1;
    const newProduct={
        id:newid,
        ...req.body
    };
    products.push(newProduct);
    //res.json(newProduct);
    res.status(201).json(newProduct);
}catch(error){
    res.status(500).json({
        error:"internal server error"
    });
}
});
router.delete("/:id",(req,res)=>{
    try{
    const id=Number(req.params.id);
    const index= products.findIndex((product)=> product.id === id);
    if(index === -1){
         return res.status(404).json({error:"product not found"});
    }
    const deletedProduct=products.splice(index,1);
    res.status(200).json(deletedProduct[0]);
}catch(error){
    res.status(500).json({
        error:"internal server error"
    });
}

});
router.put("/:id",(req,res)=>{
    try{

    const id=Number(req.params.id);
    const index=products.findIndex((product)=>product.id ===id);
    if(index === -1){

    return res.status(404).json({error:"product not found"});
    }
    const updatedProduct={...products[index],...req.body};
    products[index]=updatedProduct;
    //res.json(updatedProduct);
    res.status(200).json(updatedProduct);
}catch(error){
    res.status(500).json({
        error:"internal server error"
    });
}
});
module.exports=router;