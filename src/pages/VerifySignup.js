import React, { useState } from "react";
import "./auth.css"

const VerifySignup = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/verify-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp }),
      });

      if (response.ok) {
        alert("Email verified successfully! You can now log in.");
        window.location.href = "/login";
      } else {
        setError("Invalid or expired OTP.");
      }
    } catch {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Verify Email</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          OTP:
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </label>
        <button type="submit">Verify</button>
      </form>
    </div>
  );
};

export default VerifySignup;
