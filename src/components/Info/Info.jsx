import React from "react";
import "./info.scss";

const Info = ({ data }) => {
  return (
    <div className="info">
      <span className="info__item">Họ Tên: {data?.username}</span>
      <span className="info__item">Email: {data?.email}</span>
    </div>
  );
};

export default Info;
