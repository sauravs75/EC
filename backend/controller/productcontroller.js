const products = require("../model/product");

const getproducts = async (req, res,next) => {
    try {
        const Products = await products.find();
        res.status(200).json(Products);
    } catch (error) {
        next(error);
        // res.status(500).json({
        //     error: "Internal server error"
        // });
    }
};

const postproducts = async (req, res,next ) => {
    try {
        const newproduct = await products.create(req.body);
        res.status(201).json(newproduct);
    } catch (error) {
        next(error);
        // if (error.name === "ValidationError") {
        //     return res.status(400).json({
        //         success: false,
        //         message: error.message
        //     });

        // }
        // res.status(500).json({
        //     error: "Internal server error"
        // });
    }

};

const deleteproducts = async (req, res,next) => {
    try {
        const deletedproduct = await products.findByIdAndDelete(req.params.id);
        if (!deletedproduct) {
            return res.status(404).json({
                error: "product not found"
            });
        }
        res.status(200).json(deletedproduct);
    } catch (error) {
        next(error);
        // if (error.name === "CastError") {
        //     return res.status(400).json({
        //         success: false,
        //         message: "invalid product id"
        //     });
        // }
        // res.status(500).json({
        //     error: "internal server error"
        // });
    }
};

const updateproducts = async (req, res,next) => {
    try {
        const updatedproduct = await products.findByIdAndUpdate(req.params.id, req.body, { new: true, });
        if (!updatedproduct) {
            return res.status(404).json({
                error: "product not found"
            });
        }
        res.status(200).json(updatedproduct);
    } catch (error) {
        next(error);
        // if(error.name ==="CastError"){
        //     return res.status(400).json({
        //         success:false,
        //         message:"Invalid product id"
        //     })
        // }
        // res.status(500).json({
        //     error: "internal server error"
        // });
    }
};


module.exports = { getproducts, postproducts, deleteproducts, updateproducts };