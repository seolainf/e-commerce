import React from "react";
import "./info.scss";

const Info = ({ data }) => {
  return (
    <div className="info">
      <div className="info__item">Họ Tên: {data?.username}</div>
      <div className="info__item">Email: {data?.email}</div>
    </div>
  );
};

export default Info;
