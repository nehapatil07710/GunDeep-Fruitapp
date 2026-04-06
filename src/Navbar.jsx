import ProductsPage from "./Productpage";

function Navbar({ user, cartItemCount, totalPrice, onSetPage, onLogoutClick,searchTerm, setSearchTerm ,toggleTheme,  
  theme }) {
  function setPage(view) {
    onSetPage(view);
  }

  return (
    <nav
  className="navbar px-5"
  style={{
    width: "100vw",              // full screen width
    height: "120px",             // bigger navbar
    padding: "0 40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

background: theme === "dark"
  ? "rgba(0,0,0,0.8)"
  : "rgba(255,255,255,0.9)",    backdropFilter: "blur(10px)",

    position: "sticky",
    top: 0,
    left: 0,

    boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
    zIndex: 1000
  }}
>
      {/* Logo */}
      <div>
        <img
         src={`${import.meta.env.BASE_URL}logo/shop_logo.jpg`}
          onClick={() => setPage("home")}
          className="img-fluid"
          alt="Shop Logo"
          style={{ height: "90px", cursor: "pointer" }} // Medium Logo
        />
      </div>

      {/* Navigation Links */}
      <div>
        <button
        style={{
  borderRadius: "25px",
  padding: "10px 20px",
  border: "none",
  background: "linear-gradient(45deg, #ff7e5f, #feb47b)",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
}}
          className="btn btn-light mx-3 px-4 py-2 fs-5"
          onClick={() => {
  setSearchTerm("");   // 🔥 clear search
  setPage("home");
}}
        >
          Home
        </button>
        {!user && (
          <>
            <button
            style={{
  borderRadius: "25px",
  padding: "10px 20px",
  border: "none",
  background: "linear-gradient(45deg, #ff7e5f, #feb47b)",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
}}
              className="btn btn-light mx-3 px-4 py-2 fs-5"
              onClick={() => setPage("login")}
            >
              Login
            </button>
            <button
            style={{
  borderRadius: "25px",
  padding: "10px 20px",
  border: "none",
  background: "linear-gradient(45deg, #ff7e5f, #feb47b)",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
}}
              className="btn btn-light mx-3 px-4 py-2 fs-5"
              onClick={() => setPage("signup")}
            >
              Signup
            </button>
          </>
        )}
      </div>

      {/* User Info & Logout */}
      {user && (
        
        <div className="text-white d-flex align-items-center">
          <span className="me-3 fs-5 "   style={{ color: theme === "dark" ? "#fff" : "#000" }}
 >Welcome, {user.name}</span>
          <button style={{
  borderRadius: "25px",
  padding: "10px 20px",
  border: "none",
  background: "linear-gradient(45deg, #ff7e5f, #feb47b)",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
}}
            className="btn btn-danger px-4 py-2 fs-5"
            onClick={onLogoutClick}
          >
            Logout
          </button>
        </div>
      )}
      <button
  onClick={toggleTheme}
  style={{
    padding: "8px 15px",
    borderRadius: "20px",
    border: "none",
    background: theme === "dark" ? "#222" : "#ff7e5f",
    color: "white",
    cursor: "pointer",
  }}
>
  {theme === "dark" ? "☀ Light Mode" : "🌙 Dark Mode"}
</button>
{/* History button.  */}
<button
style={{
  borderRadius: "25px",
  padding: "10px 20px",
  border: "none",
  background: "linear-gradient(45deg, #ff7e5f, #feb47b)",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
}}
  className="btn btn-light mx-3"
  onClick={() => setPage("history")}
>
  History
</button>
<input
  type="text"
  placeholder="Search fruits 🍎"
  value={searchTerm}
  onChange={(e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() !== "") {
      onSetPage("search");   // 🔥 GO TO SEARCH PAGE
    } else {
      onSetPage("home");     // 🔥 BACK TO HOME
    }

  }}
  style={{
    padding: "12px 20px",
  borderRadius: "30px",
  border: "1px solid #ddd",
  outline: "none",
  width: "280px",
  marginLeft: "20px",
  backgroundColor: "white",   
  color: "#333",              
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",

  }}
/>

{/* <button onClick={() => setPage("wishlist")}>
  ❤️ Wishlist
</button> */}
      {/* Cart Icon & Total Price */}
      <div
      
        className="position-relative d-flex align-items-center"
        onClick={() => setPage("cart")}
        style={{ cursor: "pointer",
          borderRadius: "25px",
  padding: "10px 20px",
  border: "none",
  background: "linear-gradient(45deg, #ff7e5f, #feb47b)",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
         }}
      >
        <i
          className="bi bi-cart-check text-white"
          style={{ fontSize: "30px" }}
        ></i>{" "}
        {/* Bigger Cart Icon */}
        {/* Cart count badge */}
        {cartItemCount > 0 && (
          <span className="position-absolute top-0 start-100 translate-middle bg-danger text-white rounded-circle px-3 fs-6">
            {cartItemCount}
          </span>
        )}
        {/* Total Price */}
        {cartItemCount > 0 && (
          <span className="text-white fw-bold ms-3 fs-5">₹ {totalPrice}</span>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
