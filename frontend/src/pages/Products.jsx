import ProductList from "../component/productlist";
function Products({
    products,onDelete,onUpdate
}){
    return(
        <div >
        <h1>Products</h1>
        <ProductList
        products={products}
        onDelete={onDelete}
        onUpdate={onUpdate}
        />
        </div>
    );
}
export default Products;