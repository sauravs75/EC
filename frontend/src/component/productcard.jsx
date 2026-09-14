function ProductCard({
    product,
    onDelete,
    onUpdate,
    onAddToCart
}) {
    return (
        <div className="product-card">
            <h2>{product.name}</h2>
            <p>${product.price}</p>
            <button onClick={() => onAddToCart(product)}>Add to Cart</button>
            <button onClick={() => onDelete(product._id)}>Delete</button>
            <button onClick={() => onUpdate(product)}>Update</button>


        </div>
    );
}
export default ProductCard;