import { signOut, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import avt from "../../assets/images/user.jpg";
import { auth, db, storage } from "../../firebase/firebaseConfig";
import { deleteUser } from "../../redux/usersSlice";
import "./user.scss";

const User = ({ cmp, title }) => {
  const [file, setFile] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [user, setUser] = useState(auth.currentUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUploadFile = async (e) => {
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
        console.log(progress);
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

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await signOut(auth);
      dispatch(deleteUser({ uid: user?.uid }));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  const handleChangeAvatar = async (e) => {
    e.preventDefault();
    try {
      const userRef = doc(db, "users", `${user.uid}`);
      await updateDoc(userRef, { avatar: file });
      await updateProfile(auth.currentUser, {
        photoURL: file,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setFile("");
    setIsShow(false);
    setUser(auth.currentUser);
  }, [user]);

  return (
    <div className="user">
      <div className="user__title">Tài khoản</div>
      <div className="user__main">
        <div className="user__info">
          <div className="user__info_img">
            <img src={user?.photoURL || avt} alt="" />
            {user?.providerData[0]?.providerId === "password" ? (
              <div
                className="user__info_img_btn"
                title="Đổi ảnh đại diện"
                onClick={() => setIsShow(!isShow)}
              >
                <BsPlusCircle />
              </div>
            ) : (
              <></>
            )}
            {isShow && (
              <div className="user__info_img_add">
                <div
                  className="user__info_img_title"
                  onClick={() => setIsShow(!isShow)}
                >
                  <MdOutlineClose className="icon" />
                </div>
                <label htmlFor="img">
                  <img src={file || avt} alt="" />
                  <input type="file" onChange={handleUploadFile} id="img" />
                </label>
                <button onClick={handleChangeAvatar}>Thay đổi</button>
              </div>
            )}
          </div>
          <div className="user__info_content">
            <span>{user?.displayName}</span>
            <button onClick={handleLogout}>Đăng xuất</button>
          </div>
          <div className="user__info_list">
            <Link to={"/account"}>Tài khoản của tôi</Link>
            {user?.providerData[0]?.providerId === "password" ? (
              <Link to={"/account/change"}>Đổi mật khẩu</Link>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="user__detail">
          <div className="user__detail_title">{title}</div>
          <div className="user__detail_content">{cmp}</div>
        </div>
      </div>
    </div>
  );
};

export default User;
