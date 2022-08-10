import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase/firebaseConfig";
import "./forget.scss";

const Forget = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      if (email === undefined || email === "") {
        setMessage("Vui lòng nhập email!");
      }
      await sendPasswordResetEmail(auth, email);
      setMessage("");
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="forget">
      <form className="form">
        <div className="form__group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Nhập email của bạn"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button onClick={handleReset}>Lấy lại mật khẩu</button>
        <span>{message}</span>
      </form>
    </div>
  );
};

export default Forget;
