import { useState, useRef, useEffect } from "react";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);

  const [messages, setMessages] = useState([
    { text: "Hi 👋 Welcome to GunDeep!", sender: "bot" },
    { text: "How can I help you today?", sender: "bot" },
  ]);

  const messagesEndRef = useRef(null);

  // 🔥 Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🔥 Smart Reply Function
  function getReply(text) {
    text = text.toLowerCase();

    if (text.includes("fruit")) {
      return "🍎 We have Apple, Mango, Banana, Kiwi & more!";
    } else if (text.includes("price")) {
      return "💰 Prices are shown on each product card.";
    } else if (text.includes("order")) {
      return "🛒 Go to Cart and click BUY to place order.";
    } else if (text.includes("offer") || text.includes("discount")) {
      return "🎉 We have daily discounts on fruits!";
    } else if (text.includes("delivery")) {
      return "🚚 We deliver within 24 hours.";
    } else if (text.includes("payment")) {
      return "💳 We accept UPI, Cards & Cash on Delivery.";
    } else if (text.includes("location")) {
      return "📍 We are located in Pune Market Yard.";
    } else if (text.includes("contact")) {
      return "📞 Call us: 9876543210\n📧 Email: support@gundeep.com";
    } else {
      return `❓ I didn't understand your query.

📞 Call us: 9876543210  
📧 Email: support@gundeep.com

We’re happy to help you 😊`;
    }
  }

  // 🔥 Send Message
  function sendMessage(text) {
    if (!text.trim()) return;

    setMessages((prev) => [
      ...prev,
      { text, sender: "user" },
      { text: "Typing...", sender: "bot" },
    ]);

    setInput("");

    setTimeout(() => {
      setMessages((prev) => {
        const updated = [...prev];
        updated.pop(); // remove typing
        updated.push({ text: getReply(text), sender: "bot" });
        return updated;
      });

      setShowFeedback(true); // 🔥 show Yes/No
    }, 800);
  }

  // ✅ YES handler
  function handleYes() {
    setMessages((prev) => [
      ...prev,
      { text: "Yes 👍", sender: "user" },
      {
        text: "😊 Thank you! Glad I could help. Happy shopping at GunDeep 🍎",
        sender: "bot",
      },
    ]);
    setShowFeedback(false);
  }

  // ❌ NO handler
  function handleNo() {
    setMessages((prev) => [
      ...prev,
      { text: "No 👎", sender: "user" },
      {
        text: "😅 No problem! Please choose from below or ask again.",
        sender: "bot",
      },
    ]);
    setShowFeedback(false);
  }

  return (
    <>
      {/* 🔥 Floating Button */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          background: "linear-gradient(45deg,#ff7e5f,#feb47b)",
          color: "white",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "24px",
          cursor: "pointer",
          zIndex: 1000,
          boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
        }}
      >
        💬
      </div>

      {/* 🔥 Chat Window */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            width: "330px",
            height: "460px",
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(10px)",
            borderRadius: "20px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "linear-gradient(45deg,#ff7e5f,#feb47b)",
              color: "white",
              padding: "12px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            GunDeep Assistant 🤖
          </div>

          {/* Messages */}
          <div style={{ flex: 1, padding: "10px", overflowY: "auto" }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  textAlign: msg.sender === "user" ? "right" : "left",
                  margin: "6px 0",
                }}
              >
                <span
                  style={{
                    background:
                      msg.sender === "user"
                        ? "linear-gradient(45deg,#ff7e5f,#feb47b)"
                        : "#eee",
                    color: msg.sender === "user" ? "white" : "black",
                    padding: "8px 12px",
                    borderRadius: "15px",
                    display: "inline-block",
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* 🔥 Quick Buttons */}
          <div
            style={{
              padding: "8px",
              display: "flex",
              flexWrap: "wrap",
              gap: "6px",
              justifyContent: "center",
            }}
          >
            {["Fruits", "Price", "Order", "Offers", "Delivery", "Contact"].map(
              (opt) => (
                <button
                  key={opt}
                  onClick={() => sendMessage(opt)}
                  style={{
                    border: "none",
                    padding: "8px 14px",
                    borderRadius: "20px",
                    background:
                      "linear-gradient(45deg,#ff7e5f,#feb47b)",
                    color: "white",
                    fontWeight: "bold",
                    cursor: "pointer",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                    transition: "0.3s",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.transform = "scale(1.1)")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.transform = "scale(1)")
                  }
                >
                  {opt}
                </button>
              )
            )}
          </div>

          {/* 🔥 YES / NO FEEDBACK */}
          {showFeedback && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                padding: "10px",
              }}
            >
              <button
                onClick={handleYes}
                style={{
                  padding: "6px 12px",
                  borderRadius: "20px",
                  border: "none",
                  background: "#28a745",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                ✅ Yes
              </button>

              <button
                onClick={handleNo}
                style={{
                  padding: "6px 12px",
                  borderRadius: "20px",
                  border: "none",
                  background: "#dc3545",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                ❌ No
              </button>
            </div>
          )}

          {/* 🔥 Input */}
          <div
            style={{
              display: "flex",
              padding: "10px",
              borderTop: "1px solid #ddd",
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type message..."
              style={{
                flex: 1,
                padding: "8px",
                borderRadius: "20px",
                border: "1px solid #ccc",
                outline: "none",
              }}
            />
            <button
              onClick={() => sendMessage(input)}
              style={{
                marginLeft: "8px",
                border: "none",
                padding: "8px 12px",
                borderRadius: "20px",
                background: "#ff7e5f",
                color: "white",
                cursor: "pointer",
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}