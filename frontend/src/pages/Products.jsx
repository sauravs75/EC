import ProductList from "../component/productlist";
function Products({
    products,onDelete,onUpdate,onAddToCart
}){
    return(
        <div >
        <h1>Products</h1>
        <ProductList
        products={products}
        onDelete={onDelete}
        onUpdate={onUpdate}
        onAddToCart={onAddToCart}
        />
        </div>
    );
}
export default Products;