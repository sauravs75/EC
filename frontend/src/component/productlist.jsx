import ProductCard from "./productcard";
function ProductList({ products,onDelete,onUpdate}){
    return (
        <div className="products">
            {products.map((product)=>(
                < ProductCard
                key={product._id}
                product={product}
                onDelete={onDelete}
                onUpdate={onUpdate}
                />
            ))}
        </div>
    );
}
export default ProductList; 