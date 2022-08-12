import React from "react";
import { Link } from "react-router-dom";
import img from "../../assets/images/9.png";
import "./notFound.scss";

const NotFound = () => {
  return (
    <div className="notfound">
      <div className="notfound_img">
        <img src={img} alt="" />
      </div>
      <div className="notfound_content">
        <p>Page not found</p>
        <h2>Oh No! Error 404</h2>
        <Link to={"/"}>
          <span>Trở lại trang chủ</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
