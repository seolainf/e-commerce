import React from "react";
import PropTypes from "prop-types";
import "./payCard.scss";
import NumberFormat from "react-number-format";

const PayCard = ({ data }) => {
  return (
    <div className="payCard">
      <div className="payCard__content">
        <div className="payCard__img">
          <img src={data.img[0]} alt="" />
          <span className="payCard__quantity">{data.amount}</span>
        </div>
        <div className="payCard__info">
          <p>{data.name}</p>
          <span>
            {data.option?.color} / {data.size}
          </span>
        </div>
      </div>
      <div className="payCard__price">
        <NumberFormat
          value={data.price * data.amount}
          displayType="text"
          thousandSeparator={true}
          suffix="đ"
        />
      </div>
    </div>
  );
};

PayCard.propTypes = {
  data: PropTypes.object.isRequired,
};

export default PayCard;
