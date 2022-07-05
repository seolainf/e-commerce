import React, { memo } from "react";
import "./productCard.scss";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";

const ProductCard = ({ data }) => {
  return (
    <div className="productCard">
      <Link to={`/products/${data.slug}`}>
        <div className="productCard__image">
          <img src={data.imgURL[0]} alt="" />
        </div>
        <div className="productCard__info">
          <span className="productCard__info_title" title={data.name}>
            {data.name}
          </span>
          <div className="productCard__info_price">
            <NumberFormat
              value={data.price}
              displayType="text"
              thousandSeparator={true}
              suffix="đ"
              className="productCard__info_price-current"
            />
            {data.oldPrice === 0 ? (
              <></>
            ) : (
              <NumberFormat
                value={data.oldPrice}
                displayType="text"
                thousandSeparator={true}
                suffix="đ"
                className="productCard__info_price-old"
              />
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default memo(ProductCard);
