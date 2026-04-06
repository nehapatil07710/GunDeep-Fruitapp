export default function LandingPage({ onEnter }) {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundImage: "url('/images/_.gif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        backdropFilter: "blur(2px)",
        animation: "zoomBg 20s infinite alternate"
      }}
    >
      {/* 💜 Purple Soft Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
background: "rgba(255, 255, 255, 0.08)"        }}
      ></div>

      {/* 🔥 Content (NO BOX) */}
    <div
  style={{
    position: "relative",
    zIndex: 1,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "#222",
    animation: "fadeIn 1.5s ease-in-out",
  }}
>
  {/* 🔥 Title */}
  <h1
  style={{
    fontSize: "90px", // 🔥 BIG
    fontWeight: "900",
    letterSpacing: "3px",
    color: "#ff5722",
  }}
>
  GunDeep 🍎
</h1>

<p
  style={{
    fontSize: "26px", // 🔥 bigger
    marginTop: "15px",
    color: "#222",
    fontWeight: "600",
  }}
>
  Fresh Fruits Delivered to Your Doorstep
</p>

<p
  style={{
    fontSize: "18px",
    marginTop: "10px",
    color: "#444",
    maxWidth: "500px",
    lineHeight: "1.6",
  }}
>
  Experience the best quality fruits with fast delivery and amazing discounts every day.
</p>

  {/* 🔥 Button */}
  <button
    onClick={onEnter}
  style={{
    marginTop: "40px",
    padding: "18px 55px", // 🔥 bigger button
    fontSize: "18px",
    fontWeight: "700",
    background: "linear-gradient(45deg, #ff7a18, #32d16d)",
    border: "none",
    borderRadius: "40px",
    color: "white",
    cursor: "pointer",
    boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
    transition: "all 0.3s ease",
  }}
    onMouseOver={(e) => {
      e.target.style.transform = "scale(1.1)";
      e.target.style.boxShadow = "0 15px 35px rgba(0,0,0,0.3)";
    }}
    onMouseOut={(e) => {
      e.target.style.transform = "scale(1)";
      e.target.style.boxShadow = "0 10px 25px rgba(0,0,0,0.2)";
    }}
  >
    Start Shopping 🛒
  </button>
</div>
    </div>
  );
}