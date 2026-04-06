import { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

export default function History({ user , onRepeatOrder  }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    const querySnapshot = await getDocs(collection(db, "orders"));
    const userOrders = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.userEmail === user?.email) {
        userOrders.push(data);
      }
    });

    setOrders(userOrders);
  }
function repeatOrder(order) {
  onRepeatOrder(order.items);
}
  
    return (
  <div
    style={{
      minHeight: "100vh",
      padding: "40px",
      background:
        "linear-gradient(135deg, #0f172a, #1e293b)",
      color: "white",
    }}
  >
    {/* HEADER */}
    <h2
      style={{
        fontSize: "34px",
        marginBottom: "30px",
        textAlign: "center",
        fontWeight: "600",
      }}
    >
      🛍️ Your Order History
    </h2>

    {orders.length === 0 ? (
      <p style={{ textAlign: "center", opacity: 0.7 }}>
        No orders yet 😢
      </p>
    ) : (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "20px",
        }}
      >
        {orders.map((order, index) => (
          <div
            key={index}
            style={{
              backdropFilter: "blur(15px)",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "20px",
              padding: "20px",
              transition: "0.3s",
              position: "relative",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow =
                "0 15px 40px rgba(0,0,0,0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {/* STATUS BADGE */}
            <div
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                padding: "5px 10px",
                borderRadius: "10px",
                fontSize: "12px",
                background:
                  order.status === "Delivered"
                    ? "#22c55e"
                    : "#facc15",
                color: "black",
                fontWeight: "bold",
              }}
            >
              {order.status || "Pending"}
            </div>

            {/* DATE */}
            <p style={{ opacity: 0.6, fontSize: "13px" }}>
              📅 {new Date(order.date).toLocaleString()}
            </p>

            {/* TOTAL */}
            <h3
              style={{
                margin: "10px 0",
                color: "#22c55e",
              }}
            >
              ₹{order.total}
            </h3>

            <hr style={{ borderColor: "rgba(255,255,255,0.1)" }} />

            {/* ITEMS */}
            <div>
              {order.items.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "10px",
                    fontSize: "14px",
                  }}
                >
                  <span>
                    {item.name} × {item.qty}
                  </span>
                  <span style={{ opacity: 0.8 }}>
                    ₹{item.finalprice * item.qty}
                  </span>
                </div>
              ))}
            </div>

            {/* BUTTON */}
            <button
              onClick={() => repeatOrder(order)}
              style={{
                marginTop: "15px",
                width: "100%",
                padding: "10px",
                border: "none",
                borderRadius: "25px",
                background:
                  "linear-gradient(45deg, #ff7e5f, #feb47b)",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              🔁 Order Again
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
);
  
}