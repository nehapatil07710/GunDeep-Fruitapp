
import { useState } from "react";
import "./style1.css";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth, provider } from "./firebase";
import { signInWithPopup } from "firebase/auth";

function Login({ onLogin }) {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginStatus, setLoginStatus] = useState("");

  function handleChange(e) {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
    setLoginStatus("");
  }
  async function handleGoogleLogin() {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userData = {
        name: user.displayName,
        email: user.email,
      };

      localStorage.setItem("user", JSON.stringify(userData));
      onLogin(userData);
    } catch (error) {
      console.error("Google Login Error:", error);
    }
  }
  async function handleSubmit(e) {
  e.preventDefault();

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      loginForm.email,
      loginForm.password
    );

    const user = userCredential.user;

    const userData = {
      name: user.displayName || user.email.split("@")[0],
      email: user.email,
    };

    localStorage.setItem("user", JSON.stringify(userData));
    onLogin(userData);

  } catch (error) {
  console.error("ERROR CODE:", error.code);

  if (
    error.code === "auth/user-not-found" ||
    error.code === "auth/invalid-credential"
  ) {
    setLoginStatus("❌ Invalid email or password");
  } 
  else if (error.code === "auth/wrong-password") {
    setLoginStatus("❌ Wrong password");
  } 
  else if (error.code === "auth/invalid-email") {
    setLoginStatus("❌ Invalid email format");
  } 
  else {
    setLoginStatus("⚠️ Something went wrong");
  }
}
}





  return (
    <div
      style={{
        height: "100vh",
backgroundImage: "url('/Originals/navbar3.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "350px",
          padding: "40px",
          borderRadius: "20px",
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(15px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#333" }}>Welcome Back 👋</h2>

        {/* Email */}
        <input
          type="text"
          name="email"
          placeholder="Enter your email"
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "10px",
            border: "none",
            outline: "none",
            backgroundColor: "white",
            color: "black",
          }}
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "  12px",
            marginBottom: "10px",
            borderRadius: "10px",
            border: "none",
            outline: "none",
            backgroundColor: "white",
            color: "black",
          }}
        />

        {/* Options */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "12px",
            marginBottom: "15px",
          }}
        >
          <label>
            <input type="checkbox" /> Remember
          </label>
          <span style={{ color: "red", cursor: "pointer" }}>Forgot?</span>
        </div>

        {/* Login Button */}
        <button
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "25px",
            border: "none",
            background: "linear-gradient(45deg, #ff7e5f, #feb47b)",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            marginBottom: "10px",
          }}
        >
          Login
        </button>

        {loginStatus && (
          <div style={{ color: "red", marginBottom: "10px" }}>
            {loginStatus}
          </div>
        )}

        {/* Divider */}
        <div style={{ margin: "10px 0", color: "#555" }}>or</div>

        {/* Google Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "25px",
            border: "none",
            background: "#4285F4",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Continue with Google 🔵
        </button>
      </form>
    </div>
  );
}

export default Login;
