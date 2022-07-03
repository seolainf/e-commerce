import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import avatar from "../../assets/images/user.jpg";
import { auth, db, storage } from "../../firebase/firebaseConfig";
import "./register.scss";

const Register = () => {
  const [data, setData] = useState({});
  const [file, setFile] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [process, setProcess] = useState(0);

  const navigate = useNavigate();

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setData({ ...data, [id]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const userInfo = {
      ...data,
      avatar: file,
      timestamp: serverTimestamp(),
    };
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const docRef = doc(db, "users", res.user.uid);
      await setDoc(docRef, userInfo);
      setMessage("Đăng ký thành công!");
      setMessageType("success");

      await updateProfile(auth.currentUser, {
        displayName: data.username,
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
          <form action="" className="register__form">
            <div className="register__form_group">
              <label htmlFor="username">Họ Tên: </label>
              <input
                type="text"
                placeholder="Họ tên..."
                id="username"
                required
                onChange={handleInput}
              />
            </div>
            <div className="register__form_group">
              <label htmlFor="email">Email: </label>
              <input
                type="email"
                placeholder="Email..."
                id="email"
                required
                onChange={handleInput}
              />
            </div>
            <div className="register__form_group">
              <label htmlFor="password">Mật khẩu: </label>
              <input
                type="password"
                placeholder="Mật khẩu..."
                id="password"
                required
                onChange={handleInput}
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
              <span>{process} %</span>
            </div>
            <div className="register__form_group form__btn">
              <button onClick={handleRegister}>Đăng ký</button>
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
