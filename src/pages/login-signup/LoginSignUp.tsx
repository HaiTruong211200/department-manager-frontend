import "./LoginSignUp.css";
import { assets } from "../../assets/assets";
import { useState } from "react";
import Button from "../../components/Button/Button";
import axios from "axios";
import { AuthService } from "../../services/AuthService";

// Component LoginSignUp dùng để hiển thị các form đăng nhập và đăng ký
const LoginSignUp = () => {
  // State: True - Đăng ký, False - Đăng nhập
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleToggle = (type: "login" | "register") => {
    setIsSignUpActive(type === "register");
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:8080/api/v1/auth/login", {
        username: loginData.username,
        password: loginData.password,
      });
      alert("Login successful");
      console.log("Login successful:", response.data);
    } catch (error) {
      setError("Login failed. Please check your credentials.");
    }
  };

  const loginWithGoogle = async () => {
    try {
      const url = await AuthService.authenticate("google");
      window.location.href = url;
    } catch (error: any) {
      console.error("Lỗi xác thực với Google: ", error?.response?.data?.message || "");
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={`container-dn ${isSignUpActive ? "active" : ""}`} id="container">
      {/* Sign Up Form */}
      <div className="form-container sign-up">
        <form action="">
          <div className="header">
            <h1 className="text">Create Account</h1>
            <div className="underline"></div>
          </div>
          <div className="inputs">
            <div className="input">
              <input className="w-full outline-blue-500 border-2 border-gray-400 rounded-xl p-3 mt-1 bg-transparent" type="text" placeholder="Username" />
            </div>
            <div className="input">
              <input className="w-full outline-blue-500 border-2 border-gray-400 rounded-xl p-3 mt-1 bg-transparent" type="email" placeholder="Email" autoComplete="username"/>
            </div>
            <div className="input">
              <input className="w-full outline-blue-500 border-2 border-gray-400 rounded-xl p-3 mt-1 bg-transparent" type="password" placeholder="Password" autoComplete="new-password"/>
            </div>
            <div className="input">
              <input className="w-full outline-blue-500 border-2 border-gray-400 rounded-xl p-3 mt-1 bg-transparent" type="password" placeholder="Confirm password" autoComplete="new-password"/>
            </div>
          </div>
          <button className="btn-tdn" type="submit">Sign Up</button>
        </form>
      </div>

      {/* Sign In Form */}
      <div className="form-container sign-in">
        <form onSubmit={handleLogin}>
          <div className="header">
            <h1 className="text">Sign In</h1>
            <div className="underline"></div>
          </div>
          <div className="inputs">
            <div className="input">
              <input
                type="text"
                className="w-full outline-blue-500 border-2 border-gray-400 rounded-xl p-3 mt-1 bg-transparent"
                placeholder="Username"
                name="username"
                value={loginData.username}
                onChange={handleInputChange}
                autoComplete="username"
              />
            </div>
            <div className="input">
              <input
                type="password"
                className="w-full outline-blue-500 border-2 border-gray-400 rounded-xl p-3 mt-1 bg-transparent"
                placeholder="Password"
                name="password"
                value={loginData.password}
                onChange={handleInputChange}
                autoComplete="current-password"
              />
            </div>
          </div>
          {error && <p className="error">{error}</p>}
          <a href="#">Forgot Your Password?</a>
          <button className="btn-tdn" type="submit">Sign In</button>

          {/* Login with Google Button */}
          <div className="social-login">
            <Button text="Login with Google" type="button" onClick={loginWithGoogle} className="google-login-btn" />
          </div>
        </form>
      </div>

      {/* Khung chuyển đổi giữa Đăng Ký và Đăng Nhập */}
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1 className="text-tdn">Welcome Back!</h1>
            <p>Demo text.</p>
            <Button
              text="Sign In"
              className="hidden"
              id="login"
              onClick={() => handleToggle("login")}
            ></Button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1 className="text-tdn">Hello Friend!</h1>
            <p>Demo text.</p>
            <button id="register" className="btn-tdn-2" onClick={() => handleToggle("register")}>Sign In</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
