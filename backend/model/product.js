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
        required:true,
        trim:true,
        
        
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    category: {
        type: String,
        required: true,
        trim: true
    }
});
const Products = mongoose.model("Products",productSchema);
module.exports=Products;