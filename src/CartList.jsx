export default function CartList({
  cartItems,
  totalPrice,
  onbuttonincrement,
  onbuttondecrement,
  onhandlebuybtn,
  onhandlebillbutton,
    onClearCart, onAddMoreItems 
}) {
  function handleBuyBtn() {
    if (onhandlebuybtn) onhandlebuybtn();
  }

  function handleBillButton() {
    if (onhandlebillbutton) onhandlebillbutton();
  }
const qtyBtn = {
  padding: "5px 12px",
  borderRadius: "8px",
  border: "none",
  background: "#ff7e5f",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
};
  return (
    
  <div
    style={{
      padding: "30px",
      minHeight: "100vh",
    }}
  >
    {/* TOP BUTTONS */}
    <div style={{ textAlign: "center", marginBottom: "30px" }}>
      <button
  onClick={onAddMoreItems}
  style={{
    padding: "12px 25px",
    borderRadius: "30px",
    border: "none",
    background: "linear-gradient(45deg, #ff7e5f, #feb47b)",
    color: "white",
    fontWeight: "bold",
    marginRight: "15px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
    cursor: "pointer",
    transition: "0.3s",
  }}
  onMouseEnter={(e) => (e.target.style.transform = "scale(1.08)")}
  onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
>
  ➕ Add More Items
</button>
      <button
        onClick={handleBillButton}
        style={{
          padding: "12px 25px",
          borderRadius: "30px",
          border: "none",
          background: "linear-gradient(45deg, #ff4d4d, #ff8080)",
          color: "white",
          fontWeight: "bold",
          boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
          cursor: "pointer",
        }}
      >
        🧾 View Bill
      </button>
    </div>

    {/* CART ITEMS */}
    <div
      style={{
        maxWidth: "900px",
        margin: "auto",
      }}
    >
      {cartItems.map((e, index) => {
        const finalprice = e.mrp - (e.mrp * e.discount) / 100;

        return (
          <div
            key={index}
            style={{
              background: "#fff",
              borderRadius: "15px",
              padding: "20px",
              marginBottom: "20px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
              transition: "0.3s",
            }}
            onMouseOver={(el) =>
              (el.currentTarget.style.transform = "scale(1.02)")
            }
            onMouseOut={(el) =>
              (el.currentTarget.style.transform = "scale(1)")
            }
          >
            {/* TOP ROW */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <h5 style={{ margin: 0 }}>
                {index + 1}) {e.name}
              </h5>

              <div>
                {e.discount === 0 ? (
                  <strong>₹{e.mrp}</strong>
                ) : (
                  <>
                    <span
                      style={{
                        textDecoration: "line-through",
                        color: "red",
                        marginRight: "10px",
                      }}
                    >
                      ₹{e.mrp}
                    </span>
                    <span style={{ color: "green", fontWeight: "bold" }}>
                      ₹{finalprice.toFixed(2)}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* BOTTOM ROW */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {/* QUANTITY */}
              <div>
                <button
                  onClick={() => onbuttondecrement(e.id)}
                  style={qtyBtn}
                >
                  –
                </button>

                <span style={{ margin: "0 15px", fontWeight: "bold" }}>
                  {e.qty}
                </span>

                <button
                  onClick={() => onbuttonincrement(e.id)}
                  style={qtyBtn}
                >
                  +
                </button>
              </div>

              {/* TOTAL */}
              <div style={{ fontWeight: "bold", color: "#333" }}>
                ₹{(e.qty * finalprice).toFixed(2)}
              </div>
            </div>
          </div>
        );
      })}
    </div>

    {/* TOTAL */}
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h3>
        Total: <span style={{ color: "#28a745" }}>₹{totalPrice.toFixed(2)}</span>
      </h3>
    </div>
    <div style={{ textAlign: "center", marginTop: "20px" }}>
  {/* <button
    onClick={onClearCart}
    style={{
      padding: "12px 30px",
      borderRadius: "30px",
      border: "none",
      background: "linear-gradient(45deg, #6c757d, #adb5bd)",
      color: "white",
      fontWeight: "bold",
      cursor: "pointer",
      boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
      transition: "all 0.3s ease",
      transform: "scale(1)",
    }}
    onMouseEnter={(e) => {
      e.target.style.transform = "scale(1.08)";
      e.target.style.boxShadow = "0 10px 25px rgba(0,0,0,0.4)";
    }}
    onMouseLeave={(e) => {
      e.target.style.transform = "scale(1)";
      e.target.style.boxShadow = "0 5px 15px rgba(0,0,0,0.2)";
    }}
    onMouseDown={(e) => {
  e.target.style.transform = "scale(0.95)";
}}
onMouseUp={(e) => {
  e.target.style.transform = "scale(1.08)";
}}
  >
    🗑️ Clear Cart
  </button> */}
  <div style={{ textAlign: "center", marginTop: "20px" }}>
  <button
    onClick={onClearCart}
    style={{
      padding: "12px 30px",
      borderRadius: "30px",
      border: "none",
      background: "linear-gradient(45deg, #ff7e5f, #feb47b)", // 🔥 THEME COLOR
      color: "white",
      fontWeight: "bold",
      cursor: "pointer",
      boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
      transition: "all 0.3s ease",
      transform: "scale(1)",
    }}
    onMouseEnter={(e) => {
      e.target.style.transform = "scale(1.08)";
      e.target.style.boxShadow = "0 10px 25px rgba(0,0,0,0.4)";
    }}
    onMouseLeave={(e) => {
      e.target.style.transform = "scale(1)";
      e.target.style.boxShadow = "0 5px 15px rgba(0,0,0,0.2)";
    }}
    onMouseDown={(e) => {
      e.target.style.transform = "scale(0.95)";
    }}
    onMouseUp={(e) => {
      e.target.style.transform = "scale(1.08)";
    }}
  >
    🗑️ Clear Cart
  </button>
</div>
</div>
  </div>
);
  
}
