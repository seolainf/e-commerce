import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebaseConfig";
import { fetchUserById, setUser } from "../../redux/usersSlice";
import "./login.scss";
import { FaGooglePlusG } from "react-icons/fa";

const Login = () => {
  const [message, setMessage] = useState("");

  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const googleProvider = new GoogleAuthProvider();

  const handleLoginWithEmail = async (values) => {
    try {
      const res = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      dispatch(fetchUserById(res.user.uid));
      navigate("/");
    } catch (err) {
      console.log(err);
      setMessage(err);
      if (err.code === "auth/user-not-found") {
        setMessage("Tài khoản không tồn tại");
      } else {
        setMessage("sai mật khẩu");
      }
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      dispatch(
        setUser({
          uid: res.user.uid,
          avatar: res.user.photoURL,
          email: res.user.email,
          username: res.user.displayName,
        })
      );
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login">
      <form
        className="login__form"
        onSubmit={handleSubmit(handleLoginWithEmail)}
      >
        <div className="login__form_group">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            placeholder="Email"
            id="email"
            {...register("email")}
            required
          />
        </div>
        <div className="login__form_group">
          <label htmlFor="password">Mật khẩu: </label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            required
            {...register("password")}
          />
        </div>
        <div className="login__form_group">
          <button type="submit">Đăng nhập</button>
        </div>
        <div className="login__form_group form__forget">
          <Link to={"/account/forget"}>
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
          <div className="google">
            <FaGooglePlusG className="icon" />
            <span onClick={handleLoginWithGoogle}>Google</span>
          </div>
        </div>
        <div className="login__form_group form__other">
          <span className="login__message">{message}</span>
        </div>
      </form>
    </div>
  );
};

export default Login;
