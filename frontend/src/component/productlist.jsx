import ProductCard from "./productcard";
function ProductList({ products,onDelete,onUpdate,onAddToCart }){
    return (
        <div className="products">
            {products.map((product)=>(
                < ProductCard
                key={product._id}
                product={product}
                onDelete={onDelete}
                onUpdate={onUpdate}
                onAddToCart={onAddToCart}
                />
            ))}
        </div>
    );
}
export default ProductList; 