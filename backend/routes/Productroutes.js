const express = require("express");
const router =express.Router();
const products = require("../model/product");
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
router.get("/",async (req,res)=>{
    try{
        const  Products = await products.find();// YAHA pe products ka model use kiya hai OR AKE PRODUCTS collection se data fetch kiya hai islia capital P use kiya hai
        res.status(200).json(Products);
    }catch(error){
        res.status(500).json({error:"internal server error"});
    }
});

router.post("/",async (req,res)=>{
    try{
        const  newProduct = await products.create(req.body);
   
    res.status(201).json(newProduct);
}catch(error){
    res.status(500).json({
        error:"internal server error"
    });
}
});
// router.delete("/:id",(req,res)=>{
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

// router.put("/:id",(req,res)=>{
//     try{

//     const id=Number(req.params.id);
//     const index=products.findIndex((product)=>product.id ===id);
//     if(index === -1){

//     return res.status(404).json({error:"product not found"});
//     }
//     const updatedProduct={...products[index],...req.body};
//     products[index]=updatedProduct;
//     //res.json(updatedProduct);
//     res.status(200).json(updatedProduct);
// }catch(error){
//     res.status(500).json({
//         error:"internal server error"
//     });

// }
// });
router.delete("/:id",async(req,res)=>{
    try{
        const deletedProduct= await products.findByIdAndDelete(req.params.id);
        if(!deletedProduct){
            return res.status(404).json({error:"product not found"});
        }
        res.status(200).json(deletedProduct);
    }catch(error){
        res.status(500).json({
            error:"internal server error"
        });
    }
});
router.put("/:id",async(req,res)=>{
    try{
        const updateProduct= await products.findByIdAndUpdate( 
        req.params.id,
        req.body,
        {
            new:true, 
        }
    );
    if(!updateProduct){
        return res.status(404).json({error:"product not found"});
    }
    res.status(200).json(updateProduct);
}catch(error){
    res.status(500).json({
        error:"internal server error"
    });
}
});
module.exports=router;