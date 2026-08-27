function productcard({
    product,
    onDelete,
    onUpdate
}) {
    return (
        <div className="product-card">
            <h2>{product.name }</h2>
            <p>${product.price}</p>
            <button>Add to Cart</button>
            <button onClick={()=> onDelete(product._id )}>Delete</button>
            <button onClick={()=>onUpdate(product)}>Update</button>

        </div>
    );
}
export default productcard;