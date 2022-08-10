import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import avatar from "../../assets/images/user.jpg";
import { auth, db, storage } from "../../firebase/firebaseConfig";
import "./register.scss";
import { useForm } from "react-hook-form";

const Register = () => {
  const [file, setFile] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [process, setProcess] = useState(0);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const handleRegister = async (value) => {
    const userInfo = {
      ...value,
      avatar: file,
    };

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        value.email,
        value.password
      );
      const docRef = doc(db, "users", res.user.uid);
      await setDoc(docRef, { uid: res.user.uid, ...userInfo });
      setMessage("Đăng ký thành công!");
      setMessageType("success");

      await updateProfile(auth.currentUser, {
        displayName: value.username,
        photoURL: file,
      });
      navigate("/account/login");
    } catch (err) {
      console.log(err.code);
      if (err.code === "auth/email-already-in-use") {
        setMessage("Tài khoản đã tồn tại");
        setMessageType("err");
      } else {
        setMessage(err.message);
        setMessageType("err");
      }
    }
  };

  const handleUploadFile = (e) => {
    const images = e.target.files[0];
    const imageRef = ref(storage, `usersAvatar/${images.name}`);
    const metadata = {
      contentType: "image/jpeg",
    };
    const uploadTask = uploadBytesResumable(imageRef, images, metadata);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProcess(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFile(downloadURL);
        });
      }
    );
  };

  return (
    <div className="register">
      <div className="register__container">
        <div className="register__title">
          <h5>Đăng ký tài khoản</h5>
        </div>
        <div className="register__content">
          <div className="register__avatar">
            <img src={file || avatar} alt="" />
          </div>
          <form
            className="register__form"
            onSubmit={handleSubmit(handleRegister)}
          >
            <div className="register__form_group">
              <label htmlFor="username">Họ Tên: </label>
              <input
                type="text"
                placeholder="Họ tên..."
                id="username"
                required
                {...register("username")}
              />
            </div>
            <div className="register__form_group">
              <label htmlFor="email">Email: </label>
              <input
                type="email"
                placeholder="Email..."
                id="email"
                required
                {...register("email")}
              />
            </div>
            <div className="register__form_group">
              <label htmlFor="password">Mật khẩu: </label>
              <input
                type="password"
                placeholder="Mật khẩu..."
                id="password"
                required
                {...register("password")}
              />
            </div>
            <div className="register__form_group">
              <label htmlFor="file">Ảnh đại diện: </label>
              <input
                type="file"
                id="file"
                required
                onChange={handleUploadFile}
              />
              <span className="register__process">{process} %</span>
            </div>
            <div className="register__form_group form__btn">
              <button type="submit">Đăng ký</button>
            </div>
            <div className="register__form_group form__message">
              <span className={messageType === "success" ? "success" : "err"}>
                {message}
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
