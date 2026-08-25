import axios from "axios";
//import { response } from "express";
const API_URL ="http://localhost:5000/api/products";
export  const getProducts = async()=>{
    const response = await axios.get(API_URL);
    return response.data;
};
export const createProducts =  async(product)=>{
    const response = await axios.post(API_URL,product);
    return response.data;
};
export const  deleteProducts = async(id)=>{
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};

export const updateProducts = async(id,updateProducts)=>{
    const response = await axios.put(`${API_URL}/${id}`,updateProducts);
    return response.data;
    
}