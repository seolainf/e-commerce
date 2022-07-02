import React, { useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/usersSlice";

const Login = () => {
  const [data, setData] = useState({});
  const [err, setErr] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(err);
  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setData({ ...data, [id]: value });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      dispatch(
        setUser({ userName: res.user.displayName, avatar: res.user.photoURL })
      );
      navigate("/");
    } catch (err) {
      setErr(err);
    }
  };
  return (
    <div className="login">
      <form className="login__form">
        <div className="login__form_group">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            placeholder="Email"
            id="email"
            onChange={handleInput}
          />
        </div>
        <div className="login__form_group">
          <label htmlFor="password">Mật khẩu: </label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            onChange={handleInput}
          />
        </div>
        <div className="login__form_group">
          <button onClick={handleLogin}>Đăng nhập</button>
        </div>
        <div className="login__form_group form__forget">
          <Link to={"/account/register"}>
            <span>Quên mật khẩu</span>
          </Link>
          <Link to={"/account/register"}>
            <span>Đăng ký</span>
          </Link>
        </div>
        <div className="login__form_group form__or">
          <span>Hoặc</span>
        </div>
        <div className="login__form_group form__other">
          <span>Google</span>
          <span>Facebook</span>
        </div>
        {/*  <div className="login__form_group form__other">
          <span>{err}</span>
        </div> */}
      </form>
    </div>
  );
};

export default Login;
