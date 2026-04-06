function Product({
  product,
  handleAddToCart,
  incrementQuantity,
  decrementQuantity,
}) {

  const discountedPrice =
    Number(product.mrp) -
    (Number(product.mrp) * Number(product.discount)) / 100;

  return (
<div style={{ width: "20%", padding: "10px" }}>    
    <div className="product-card"
        style={{
background: "white",
          borderRadius: "20px",
          padding: "15px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          transition: "0.3s",
          position: "relative",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >

        {/* Discount Badge */}
        {product.discount > 0 && (
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              background: "#ff4d4d",
              color: "white",
              padding: "5px 10px",
              borderRadius: "10px",
              fontSize: "12px",
            }}
          >
            {product.discount}% OFF
          </div>
        )}

        {/* Image */}
        
<img src={`/Originals/${product.image}`}   style={{
    width: "100%",
    height: "160px",   // 👈 reduced height (important)
    objectFit: "cover",
    borderRadius: "15px",
  }}
/>
        {/* Name */}
        <h5 style={{ marginTop: "10px" }}>
          {product.name}
        </h5>

        {/* Price */}
        <div>
          {product.discount === 0 ? (
            <h6>₹{product.mrp}</h6>
          ) : (
            <h6>
              <span style={{ textDecoration: "line-through", color: "#888" }}>
                ₹{product.mrp}
              </span>{" "}
              <span style={{ color: "#28a745", fontWeight: "bold" }}>
                ₹{discountedPrice}
              </span>
            </h6>
          )}
        </div>

        <p style={{  }}>(per {product.unit})</p>

        {/* Add to cart */}
        {product.inStock && product.qty === 0 && (
          <button
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "20px",
              border: "none",
              background: "linear-gradient(45deg, #ff7e5f, #feb47b)",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        )}

        {/* Qty controls */}
        {product.inStock && product.qty > 0 && (
          <div style={{ textAlign: "center" }}>
            <button onClick={decrementQuantity}>-</button>
            <span style={{ margin: "0 10px" }}>{product.qty}</span>
            <button onClick={incrementQuantity}>+</button>

            <p style={{ marginTop: "10px" }}>
              Total: ₹{discountedPrice * product.qty}
            </p>
          </div>
        )}

        {!product.inStock && (
          <button disabled style={{ width: "100%" }}>
            Out of Stock
          </button>
        )}
      </div>
    </div>
  );
}

export default Product;