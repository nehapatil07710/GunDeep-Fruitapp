import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";import "./style1.css";
function Signup({ onSetPage }) {
  const [SignUpstatus, setSignUpstatus] = useState("");

  async function handlesignformsubmit(event) {
  event.preventDefault();

  let formData = new FormData(event.target);

  let name = formData.get("name");
  let email = formData.get("email");
  let password = formData.get("password");

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    const userData = {
      name: name,
      email: user.email,
    };

    localStorage.setItem("user", JSON.stringify(userData));

    setSignUpstatus("✅ Account created successfully!");

    // optional redirect
    setTimeout(() => {
      onSetPage("login");
    }, 1500);

  } catch (error) {
    console.error(error);

    if (error.code === "auth/email-already-in-use") {
      setSignUpstatus("❌ Email already exists");
    } else if (error.code === "auth/weak-password") {
      setSignUpstatus("❌ Password should be at least 6 characters");
    } else {
      setSignUpstatus("⚠️ Signup failed");
    }
  }
}

  // function checkUserExist(user) {
  //   axios.get("http://localhost:3000/users").then((response) => {
  //     let data = response.data;
  //     let filterData = data.filter((e) => e.email === user.email);

  //     if (filterData.length >= 1) {
  //       setSignUpstatus("User already exists!");
  //     } else {
  //       addUser(user);
  //     }
  //   });
  // }

  // function addUser(user) {
  //   axios.post("http://localhost:3000/users", user).then(() => {
  //     setSignUpstatus("Signed up successfully!");
  //   });
  // }


// const inputStyle = {
//   width: "100%",
//   padding: "12px",
//   marginBottom: "15px",
//   borderRadius: "10px",
//   border: "1px solid #ddd",
//   outline: "none",
//   fontSize: "14px",
//   background: "rgba(0,0,0,0.5)",  // 👈 dark background
//   color: "white",                 // 👈 text color
// };
const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "10px",
  border: "none",
  outline: "none",
  backgroundColor: "white",   // ✅ same as login
  color: "black",
};
  return (
  <div
    style={{
      height: "100vh",
backgroundImage: `url(Originals/navbar3.jpg)`,   
   backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <form
      onSubmit={handlesignformsubmit}
      style={{
 width: "350px",
    padding: "40px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.15)",   // 🔥 SAME AS LOGIN
    backdropFilter: "blur(15px)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
    textAlign: "center",


        
       
        animation: "fadeIn 0.8s ease",
      }}
    >
      {/* Title */}
      <h2 style={{ marginBottom: "10px", color: "#333" }}>
        Create Account 🛍️
      </h2>
      <p style={{ fontSize: "14px", color: "#777", marginBottom: "25px" }}>
        Join us & start shopping fresh fruits 🍎
      </p>

      {/* Name */}
      <input
        type="text"
        name="name"
        
        placeholder="👤 Full Name"
        required
        style={inputStyle}
        
      />

      {/* Email */}
      <input
        type="email"
        name="email"
        placeholder="📧 Email Address"
        required
        style={inputStyle}
      />

      {/* Password */}
      <input
        type="password"
        name="password"
        placeholder="🔒 Password"
        required
        style={inputStyle}
      />

      {/* Button */}
      <button
        style={{
          width: "100%",
          padding: "14px",
          borderRadius: "30px",
          border: "none",
          background: "linear-gradient(45deg, #ff7e5f, #feb47b)",
          color: "white",
          fontWeight: "bold",
          fontSize: "16px",
          cursor: "pointer",
          boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
          transition: "0.3s",
        }}
        onMouseOver={(e) =>
          (e.target.style.transform = "scale(1.05)")
        }
        onMouseOut={(e) =>
          (e.target.style.transform = "scale(1)")
        }
      >
        🚀 Create Account
      </button>

      {/* Status */}
      {SignUpstatus && (
        <div
          style={{
            marginTop: "12px",
            fontWeight: "500",
            color: SignUpstatus.includes("successfully")
              ? "green"
              : "red",
          }}
        >
          {SignUpstatus}
        </div>
      )}

      {/* Footer */}
      <p style={{ marginTop: "18px", fontSize: "14px", color: "#555" }}>
        Already have an account?{" "}
        <span
          style={{
            color: "#ff7e5f",
            cursor: "pointer",
            fontWeight: "bold",
          }}
          onClick={() => onSetPage("login")}
        >
          Login →
        </span>
      </p>
    </form>
  </div>
);
}

export default Signup;
