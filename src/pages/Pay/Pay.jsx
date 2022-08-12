import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import addressApi from "../../api/addressApi";
import PayCard from "../../components/PayProductCard/PayCard";
import { db } from "../../firebase/firebaseConfig";
import { phoneRegex } from "../../helpers/phoneRegex";
import "./pay.scss";

const Pay = () => {
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [communes, setCommunes] = useState([]);
  const [data, setData] = useState({});
  const [message, setMessage] = useState("");
  const [classType, setClassType] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  const cartItems = useSelector((state) => state.cart.value);

  const getDistrictsList = async (code) => {
    try {
      const res = await addressApi.getDistricts(+code);
      setDistricts(res);
    } catch (err) {
      console.log(err);
    }
  };
  const getCommunesList = async (code) => {
    try {
      const res = await addressApi.getCommunes(+code);
      setCommunes(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputs = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.username | !data.phone | !data.address) {
      setMessage("Thiếu thông tin vui lòng nhập đầy đủ!");
      setClassType("err");
    } else {
      if (!phoneRegex(data.phone)) {
        setClassType("err");
        setMessage("Số điện thoại không hợp lệ!");
      } else {
        setMessage("");
        try {
          await addDoc(collection(db, "orders"), {
            ...data,
            orders: cartItems,
          });
        } catch (err) {
          setMessage(err.message);
        }
        toast.success("Shop đã tiếp nhận đơn hàng của bạn!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  useEffect(() => {
    const total = cartItems.reduce(
      (total, item) => total + item.price * item.amount,
      0
    );
    setTotalPrice(total);
  }, [cartItems]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await addressApi.getCities();
        setCities(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCities();
  }, []);

  return (
    <div className="pay">
      <div className="pay__content">
        <div className="pay__address">
          <span className="pay__title">Thông tin giao hàng</span>
          <form className="pay_form">
            <div className="pay_form__group">
              <label htmlFor="username">Họ tên: </label>
              <input
                type="text"
                name="username"
                id="username"
                onChange={handleInputs}
                className={!data.username ? classType : "success"}
                required
              />
            </div>
            <div className="pay_form__group">
              <label htmlFor="phone">Số điện thoại: </label>
              <input
                type="text"
                name="phone"
                id="phone"
                onChange={handleInputs}
                className={!data.phone ? classType : "success"}
                required
              />
            </div>
            <div className="pay_form__group">
              <label htmlFor="address">Địa chỉ: </label>
              <input
                type="text"
                name="address"
                id="address"
                onChange={handleInputs}
                className={!data.address ? classType : "success"}
                required
              />
            </div>
            <div className="pay_form__group">
              <select
                name="cities"
                id="cities"
                onChange={(e) => {
                  getDistrictsList(e.target.value);
                  handleInputs(e);
                }}
                className={!data.cities ? classType : "success"}
              >
                <option value="">------</option>
                {cities &&
                  cities.map((city) => (
                    <option value={city.code} key={city.code}>
                      {city.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="pay_form__group">
              <select
                name="districts"
                id="districts"
                onChange={(e) => {
                  getCommunesList(e.target.value);
                  handleInputs(e);
                }}
                disabled={districts.districts?.length > 0 ? false : true}
                className={!data.districts ? classType : "success"}
              >
                <option value="">------</option>
                {districts.districts &&
                  districts.districts?.map((dist) => (
                    <option value={dist.code} key={dist.code}>
                      {dist.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="pay_form__group">
              <select
                name="communes"
                id="communes"
                onChange={handleInputs}
                disabled={communes.wards?.length > 0 ? false : true}
                className={!data.communes ? classType : "success"}
              >
                <option value="">------</option>
                {communes.wards &&
                  communes.wards.map((comm) => (
                    <option value={comm.name} key={comm.code}>
                      {comm.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="pay_form__group">
              <textarea
                name="note"
                id="note"
                placeholder="Ghi chú"
                onChange={handleInputs}
              />
            </div>
            {!message ? (
              <></>
            ) : (
              <span className="pay__address_message">{message}</span>
            )}
          </form>
        </div>
        <div className="pay__order">
          <span className="pay__title">
            Đơn hàng {cartItems.length} sản phẩm
          </span>
          <div className="pay__order_item">
            {cartItems.map((item, index) => (
              <PayCard data={item} key={index} />
            ))}
          </div>
          <div className="pay__order_price">
            <span>Tổng cộng</span>
            <NumberFormat
              value={totalPrice}
              displayType="text"
              thousandSeparator={true}
              suffix="đ"
            />
          </div>
          <div className="pay__order_btn">
            <Link to={"/cart"}>
              <MdKeyboardArrowLeft className="icon" />
              <span>Quay về giỏ hàng</span>
            </Link>
            <button onClick={handleSubmit}>Đặt hàng</button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Pay;
