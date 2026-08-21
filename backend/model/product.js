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
// module.exports=products;

const mongoose =require("mongoose");
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
});
const Products = mongoose.model("Products",productSchema);
module.exports=Products;