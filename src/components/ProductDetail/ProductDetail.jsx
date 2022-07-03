import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./productDetail.scss";
import NumberFormat from "react-number-format";
import { RiSubtractLine } from "react-icons/ri";
import { HiOutlinePlusSm } from "react-icons/hi";

const ProductDetail = (props) => {
  const { data } = props;
  const [ImgView, setImgView] = useState(data.imgURL && data.imgURL[0]);
  const [color, setColor] = useState(data.options && data.options[0]?.color);
  const [size, setSize] = useState(data.sizes && data.sizes[0]);
  const [productCount, setProductCount] = useState(1);

  useEffect(() => {
    setImgView(data.imgURL && data.imgURL[0]);
    setColor(data.options && data.options[0]?.color);
    setSize(data.sizes && data.sizes[0]);
    setProductCount(1);

    window.scrollTo(0, 0);
  }, [data]);

  const handleProductAmount = (type) => {
    if (type === "+") {
      setProductCount(productCount + 1);
    } else {
      setProductCount(productCount <= 1 ? 1 : productCount - 1);
    }
  };

  return (
    <div className="productDetail">
      <div className="productDetail__images">
        <div className="productDetail__images_list">
          {data &&
            data.imgURL?.map((img, index) => (
              <div
                className="productDetail__images_item"
                key={index}
                onClick={() => setImgView(img)}
              >
                <img src={img} alt="" />
              </div>
            ))}
        </div>
        <div className="productDetail__images_view">
          <img src={ImgView} alt="" />
        </div>
      </div>
      <div className="productDetail__info">
        <h1 className="productDetail__info_title">{data.name}</h1>
        <div className="productDetail__info_price">
          <NumberFormat
            value={data.price}
            displayType="text"
            thousandSeparator={true}
            suffix="đ"
            className="productDetail__info_price-current"
          />
          {data.oldPrice <= 0 ? (
            <></>
          ) : (
            <NumberFormat
              value={data.oldPrice}
              displayType="text"
              thousandSeparator={true}
              suffix="đ"
              className="productDetail__info_price-old"
            />
          )}
        </div>
        <div className="productDetail__info_options">
          <div className="productDetail__info_options_title">
            Màu sắc: {color}
          </div>
          <div className="productDetail__info_options_list">
            {data &&
              data.options?.map((option, index) => (
                <span
                  className="productDetail__info_options_item"
                  key={index}
                  style={{ backgroundColor: `${option.clname}` }}
                  title={option.color}
                  onClick={() => setColor(option.color)}
                ></span>
              ))}
          </div>
        </div>
        <div className="productDetail__info_options">
          <div className="productDetail__info_options_title">
            Kích cỡ: {size}
          </div>
          <div className="productDetail__info_options_list">
            {data &&
              data.sizes?.map((size, index) => (
                <span
                  className="productDetail__info_options_item"
                  key={index}
                  onClick={() => setSize(size)}
                >
                  {size}
                </span>
              ))}
          </div>
        </div>
        <div className="productDetail__info_amount">
          <div className="productDetail__info_amount_title">Số lượng:</div>
          <div className="productDetail__info_amount_options">
            <span
              className="productDetail__info_amount_item amount_sub"
              onClick={() => handleProductAmount("-")}
            >
              <RiSubtractLine />
            </span>
            <span className="productDetail__info_amount_item amount_count">
              {productCount}
            </span>
            <span
              className="productDetail__info_amount_item amount_plus"
              onClick={() => handleProductAmount("+")}
            >
              <HiOutlinePlusSm />
            </span>
          </div>
        </div>
        <div className="productDetail__info_btn">
          <button>Thêm vào giỏ hàng</button>
        </div>
      </div>
    </div>
  );
};

ProductDetail.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ProductDetail;