import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";

export default function Bill({ cartItems, price, name, user }) {
  const currentDate = new Date().toLocaleDateString();

  // 🔥 SAVE ORDER TO FIREBASE
  async function saveOrder() {
    try {
      await addDoc(collection(db, "orders"), {
        userEmail: user?.email,
        items: cartItems,
        total: price,
        date: new Date().toLocaleString(),
          status: "Delivered" // 🔥 NEW

      });
      console.log("Order saved ✅");
    } catch (error) {
      console.error("Error saving order:", error);
    }
  }

  // 📲 WHATSAPP SHARE + SAVE ORDER
  async function handleWhatsAppShare() {
  try {
    const user = JSON.parse(localStorage.getItem("user"));

    // 🔥 SAVE ORDER FIRST
    await addDoc(collection(db, "orders"), {
      userEmail: user?.email,
      items: cartItems,
      total: price,
      date: new Date().toLocaleString(),
    });

    console.log("✅ Order saved to Firebase");

    // 📲 THEN SHARE
    let message = `🧾 *GunDeep Fruit Bill*\n\n`;

    cartItems.forEach((item, index) => {
      message += `${index + 1}) ${item.name} - ₹${item.finalprice} x ${
        item.qty
      } = ₹${(item.qty * item.finalprice).toFixed(2)}\n`;
    });

    message += `\n💰 *Total: ₹${price}*`;
    message += `\n\nThank you for shopping with GunDeep 🍎`;

    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");

  } catch (error) {
    console.error("❌ Error saving order:", error);
  }
}

  return (
    <div className="bill-container">
      <div className="container my-4">
        <div className="text-end mb-3">
          <button onClick={handleWhatsAppShare}>
            Share Bill on WhatsApp 📲
          </button>
        </div>

        <div
          className="p-4 rounded shadow"
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #ddd",
            color: "#000000",
          }}
        >
          <div className="text-center h5 fw-bold">|| Shree ||</div>
          <div className="text-center h3 fw-bold">Laxmi Fruit Shop</div>
          <div className="text-center h6">
            220, Market Yard, Pune - 411009
          </div>
          <div className="text-end">Date: {currentDate}</div>
          <div className="h5">Customer Name: {name}</div>

          <hr />

          <div className="row fw-bold border-bottom pb-2 mb-2">
            <div className="col-4">Product</div>
            <div className="col-3">Rate</div>
            <div className="col-2">Qty</div>
            <div className="col-3 text-end">Total</div>
          </div>

          {cartItems.map((item, index) => (
            <div key={index} className="row mb-2">
              <div className="col-4">{`${index + 1}) ${item.name}`}</div>
              <div className="col-3">
                <span className="text-muted text-decoration-line-through me-2">
                  ₹{item.mrp}
                </span>
                <span>₹{item.finalprice}</span>
              </div>
              <div className="col-2">
                {item.qty} {item.unit}
              </div>
              <div className="col-3 text-end">
                ₹{(item.qty * item.finalprice).toFixed(2)}
              </div>
            </div>
          ))}

          <hr />

          <div className="row fw-bold">
            <div className="col-9 text-end">Grand Total:</div>
            <div className="col-3 text-end">₹{price}</div>
          </div>
        </div>
      </div>
    </div>
  );
}