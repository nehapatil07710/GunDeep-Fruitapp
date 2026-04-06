import { useEffect, useState } from "react";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(data);
  }, []);

  function removeItem(id) {
    const updated = wishlist.filter((item) => item.id !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  }

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h2>❤️ Your Wishlist</h2>

      {wishlist.length === 0 ? (
        <p>No items in wishlist</p>
      ) : (
        wishlist.map((item) => (
          <div
            key={item.id}
            style={{
              background: "#222",
              padding: "15px",
              marginTop: "10px",
              borderRadius: "10px",
            }}
          >
            <h4>{item.name}</h4>
            <p>₹{item.mrp}</p>

            <button
              onClick={() => removeItem(item.id)}
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "5px 10px",
                borderRadius: "5px",
              }}
            >
              Remove ❌
            </button>
          </div>
        ))
      )}
    </div>
  );
}