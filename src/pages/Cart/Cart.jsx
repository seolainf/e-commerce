import { useEffect, useState } from "react";
import { HiOutlinePlusSm } from "react-icons/hi";
import { MdOutlineDeleteForever } from "react-icons/md";
import { RiSubtractLine } from "react-icons/ri";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteItem, updateItem } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import "./cart.scss";

const Cart = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const cartData = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdateItem = (type, item) => {
    if (type === "+") {
      dispatch(updateItem({ ...item, amount: item.amount + 1 }));
    }
    if (type === "-") {
      dispatch(
        updateItem({
          ...item,
          amount: item.amount - 1 === 0 ? 1 : item.amount - 1,
        })
      );
    }
  };

  const handleDeleteItem = (item) => {
    dispatch(deleteItem(item));
  };

  useEffect(() => {
    const productsPrice = cartData.reduce(
      (total, item) => total + item.price * item.amount,
      0
    );
    setTotalPrice(productsPrice);
  }, [cartData]);

  return (
    <div className="cart">
      <div className="cart__main">
        <div className="cart__main_header">
          <div className="cart__main_header_title">
            Đơn hàng của bạn <span>({cartData.length}) sản phẩm</span>
          </div>
          <div className="cart__main_header_link">
            <Link to={"/products"}>
              <span>Tiếp tục mua hàng</span>
            </Link>
          </div>
        </div>
        <div className="cart__main_content">
          <div className="cart__main_content_label">
            <span className="cart__main_content_label_item label_product">
              Sản phẩm
            </span>
            <span className="cart__main_content_label_item label_price">
              Đơn giá
            </span>
            <span className="cart__main_content_label_item label_amount">
              Số lượng
            </span>
            <span className="cart__main_content_label_item label_totalPrice">
              Thành tiền
            </span>
          </div>
          <div className="cart__main_content_list">
            {cartData &&
              cartData.map((item, index) => (
                <div className="cart__main_content_item" key={index}>
                  <div className="cart__main_content_item_info">
                    <div className="cart__main_content_item_info_img">
                      <img src={item.img[0]} alt="" />
                    </div>
                    <div className="cart__main_content_item_info_detail">
                      <div className="cart__main_content_item_info_detail_group">
                        <span>{item.name}</span>
                        <div className="cart__main_content_item_info_detail_option">
                          {item.option.color} / {item.size}
                        </div>
                      </div>
                      <div
                        className="cart__main_content_item_info_detail_btn"
                        onClick={() => handleDeleteItem(item)}
                      >
                        <MdOutlineDeleteForever />
                      </div>
                    </div>
                  </div>
                  <div className="cart__main_content_item_price">
                    <NumberFormat
                      value={item.price}
                      displayType="text"
                      thousandSeparator={true}
                      suffix="đ"
                    />
                  </div>
                  <div className="cart__main_content_item_amount">
                    <span
                      className="item-sub"
                      onClick={() => handleUpdateItem("-", item)}
                    >
                      <RiSubtractLine />
                    </span>
                    <span className="item-amount">{item.amount}</span>
                    <span
                      className="item-plus"
                      onClick={() => handleUpdateItem("+", item)}
                    >
                      <HiOutlinePlusSm />
                    </span>
                  </div>
                  <div className="cart__main_content_item_totalPrice">
                    <NumberFormat
                      value={item.amount * item.price}
                      displayType="text"
                      thousandSeparator={true}
                      suffix="đ"
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="cart__pay">
        <div className="cart__pay_heading">
          <span className="cart__pay_title">Tổng cộng: </span>
          <NumberFormat
            value={totalPrice}
            displayType="text"
            thousandSeparator={true}
            suffix="đ"
            className="cart__pay_price"
          />
        </div>
        <div className="cart__pay_btn">
          <button onClick={() => navigate("/check")}>Thanh toán</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
