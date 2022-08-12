import { signOut, updatePassword } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { changeData } from "../../assets/data/inputData";
import { auth, db } from "../../firebase/firebaseConfig";
import { deleteUser } from "../../redux/usersSlice";
import "./change.scss";

const Change = ({ data }) => {
  const [notification, setNotification] = useState("");
  const [errClass, setErrClass] = useState("");

  const { register, handleSubmit } = useForm({
    defaultValues: { currentPass: "", newPass: "", confirmPass: "" },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = async (value) => {
    try {
      if (value.currentPass === undefined || value.currentPass === "") {
        setNotification("Vui lòng nhập mật khẩu hiện tại!");
        setErrClass("err");
      } else if (
        (value.currentPass !== undefined) &
        (value.currentPass !== "") &
        (value.currentPass !== data.password)
      ) {
        setNotification("Mật khẩu hiện tại không đúng!");
        setErrClass("err");
      } else if (
        (value.currentPass !== undefined) &
        (value.currentPass !== "") &
        (value.currentPass === data.password) &
        (value.newPass === "")
      ) {
        setNotification("Vui lòng nhập mật khẩu mới!");
        setErrClass("err");
      } else if (value.newPass !== value.confirmPass) {
        setNotification("Mật khẩu xác nhận không khớp!");
        setErrClass("err");
      } else {
        const user = auth.currentUser;

        const userRef = doc(db, "users", `${data.uid}`);
        await updateDoc(userRef, { password: value.newPass });

        await updatePassword(user, value.newPass);
        setErrClass("success");
        setNotification("Mật khẩu đã được thay đổi");

        await signOut(auth);
        dispatch(deleteUser({ uid: data.uid }));

        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="change">
      <form className="change__form" onSubmit={handleSubmit(handleChange)}>
        {changeData &&
          changeData.map((item) => (
            <div className="form__group" key={item.id}>
              <label htmlFor={item.id}>{item.title}</label>
              <input
                type="password"
                id={item.id}
                className={errClass}
                required
                {...register(item.id)}
              />
            </div>
          ))}
        <div className="form__btnGroup">
          <Link to={"/account"}>
            <span>Hủy</span>
          </Link>
          <button type="submit">Lưu</button>
        </div>
        <div className="form__group">
          {notification === "" ? (
            <></>
          ) : (
            <span className={errClass}>{notification}</span>
          )}
        </div>
      </form>
    </div>
  );
};

export default Change;
