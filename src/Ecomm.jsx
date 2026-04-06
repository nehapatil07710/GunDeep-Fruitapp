import axios from "axios";
import { useEffect, useState } from "react";
import AdminMainPage from "./AdminMainPage";
import Login from "./Login";
import Navbar from "./Navbar";
import ProductsPage from "./Productpage";
import Signup from "./signup";
import CartList from "./CartList";
import Bill from "./Bill";
import History from "./History";
import Chatbot from "./Chatbot";
// import Wishlist from "./Wishlist";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export default function Ecomm() {
  const [productList, setProductList] = useState([]);
  const [view, setView] = useState("home");
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
const [searchTerm, setSearchTerm] = useState("");
const [theme, setTheme] = useState(
  localStorage.getItem("theme") || "light"
); 
function toggleTheme() {
  const newTheme = theme === "light" ? "dark" : "light";
  setTheme(newTheme);
  localStorage.setItem("theme", newTheme);
}

  useEffect(() => {
    getDataFromServer();
    checkUserExist();
  }, []);

  async function getDataFromServer() {
  try {
    const querySnapshot = await getDocs(collection(db, "fruits"));
    const list = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      qty: 0
    }));
    setProductList(list);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

  function checkUserExist() {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }

  function handleLogin(userData) {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setView("home");
  }

  function handleLogoutClick() {
    localStorage.removeItem("user");
    setUser(null);
    setView("home");
  }

  function showCart() {
    setView("cart");
  }

  function handleAddToCart(productId) {
  const updatedProducts = productList.map((item) =>
    item.id === productId && item.inStock && item.qty === 0
      ? { ...item, qty: 1 }
      : item
  );

  setProductList(updatedProducts);
  updateCart(updatedProducts);
}

  function handleIncrement(productId) {
  const updatedProducts = productList.map((item) =>
    item.id === productId && item.inStock
      ? { ...item, qty: item.qty + 1 }
      : item
  );

  setProductList(updatedProducts);
  updateCart(updatedProducts);
}

function handleDecrement(productId) {
  const updatedProducts = productList.map((item) =>
    item.id === productId && item.qty > 0
      ? { ...item, qty: item.qty - 1 }
      : item
  );

  setProductList(updatedProducts);
  updateCart(updatedProducts);
}

  function updateCart(updatedProducts) {
    const cart = updatedProducts.filter((item) => item.qty > 0);
    setCartItems(cart);
  }

  async function handleBuy() {
  try {
    await addDoc(collection(db, "orders"), {
      userEmail: user.email,
      items: cartItems,
      total: totalPrice,
      date: new Date().toISOString(),
    });

    alert("Order placed successfully! 🎉");

    const clearedProducts = productList.map((item) => ({ ...item, qty: 0 }));
    setProductList(clearedProducts);
    setCartItems([]);
    setView("home");
  } catch (error) {
    console.error("Error saving order:", error);
  }
}
  function handleBillClick() {
    setView("bill");
  }

  const cartItemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cartItems.reduce(
    (acc, item) =>
      acc + (item.mrp - (item.mrp * item.discount) / 100) * item.qty,
    0
  );

  const billItems = cartItems.map((item) => ({
    ...item,
    finalprice: (item.mrp - (item.mrp * item.discount) / 100).toFixed(2),
  }));

  const price = totalPrice.toFixed(2);
  const name = user ? user.name : "Guest";

  const filteredProducts = productList.filter((product) =>
  (product.name || "").toLowerCase().includes(searchTerm.toLowerCase())
);

function handleRepeatOrder(items) {
  // set quantities in productList
  const updatedProducts = productList.map((product) => {
    const found = items.find((i) => i.id === product.id);
    if (found) {
      return { ...product, qty: found.qty };
    }
    return { ...product, qty: 0 };
  });

  setProductList(updatedProducts);

  // update cart
  const cart = updatedProducts.filter((item) => item.qty > 0);
  setCartItems(cart);

  // go to cart page
  setView("cart");
}
 function clearCart() {
  const clearedProducts = productList.map((item) => ({
    ...item,
    qty: 0,
  }));

  setProductList(clearedProducts);
  setCartItems([]);
}



  return (
      <div className={theme === "dark" ? "dark-theme" : "light-theme"}>

    <div>
      <Navbar
      
        onSetPage={setView}
        user={user}
        onLogoutClick={handleLogoutClick}
        onclickimageicon={showCart}
        cartItemCount={cartItemCount}
        totalPrice={totalPrice}
        searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}

  toggleTheme={toggleTheme}   
  theme={theme}   
      />

      <div>
        

        {view === "cart" && (
          <CartList
            cartItems={cartItems}
            totalPrice={totalPrice}
            onbuttonincrement={(id) => handleIncrement(id)}
            onbuttondecrement={(id) => handleDecrement(id)}
            onhandlebuybtn={handleBuy}
            onhandlebillbutton={handleBillClick}
             onClearCart={clearCart}
               onAddMoreItems={() => setView("home")}
          />
        )}
        {view === "search" && (
  <>
    <h2 style={{ color: "white", textAlign: "center" }}>
      Search Results for "{searchTerm}"
    </h2>

    <ProductsPage
      productList={filteredProducts}
      handleAddToCart={handleAddToCart}
      handleIncrementQuantity={handleIncrement}
      handleDecrementQuantity={handleDecrement}
    />
  </>
)}
{view === "home" && (
  <ProductsPage
    productList={productList}
    handleAddToCart={handleAddToCart}
    handleIncrementQuantity={handleIncrement}
    handleDecrementQuantity={handleDecrement}
  />
)}
{view === "history" && <History user={user}  onRepeatOrder={handleRepeatOrder}/>}
        {view === "login" && <Login onLogin={handleLogin} />}
{view === "signup" && <Signup onSetPage={setView} />}   
     {/* {view === "wishlist" && <Wishlist />} */}
        {view === "AdminMainPage" && <AdminMainPage />}

        {view === "bill" && (
          <Bill price={price} name={name} cartItems={billItems} />
        )}
        <Chatbot />
      </div>
    </div>
    </div>
  );
}
