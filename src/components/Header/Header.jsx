import { signOut } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { MdOutlineDeleteForever } from "react-icons/md";
import { RiCloseLine } from "react-icons/ri";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { menuData } from "../../assets/data/headerMenu";
import cartIcon from "../../assets/images/cart.png";
import logo from "../../assets/images/logo.png";
import avatar from "../../assets/images/user.png";
import { auth } from "../../firebase/firebaseConfig";
import { deleteItem } from "../../redux/cartSlice";
import { deleteUser } from "../../redux/usersSlice";
import "./header.scss";

const Header = () => {
  const [openOption, setOpenOption] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [totalPrice, setTotalPrice] = useState(false);

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.value);
  const cart = useSelector((state) => state.cart.value);

  const cartRef = useRef();
  const menuRef = useRef();

  const cartActive = () => cartRef.current.classList.toggle("active");
  const menuActive = () => menuRef.current.classList.toggle("active");

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(deleteUser({ uid: users[0].uid }));
      setOpenOption(!openOption);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteItem = (item) => {
    dispatch(deleteItem(item));
  };

  useEffect(() => {
    setTotalPrice(
      cart.reduce((total, item) => total + item.amount * item.price, 0)
    );
  }, [cart]);

  return (
    <div className="header">
      <div className="header__menu">
        <div className="header__menu_icon" onClick={menuActive}>
          <HiOutlineMenuAlt1 />
        </div>
        <div className="header__menu_content" ref={menuRef}>
          {menuData &&
            menuData.map((menu) => (
              <NavLink
                className="header__menu_item"
                to={menu.path}
                key={menu.id}
              >
                <span>{menu.title}</span>
              </NavLink>
            ))}
          <div className="header__menu_content_icon" onClick={menuActive}>
            <RiCloseLine />
          </div>
        </div>
      </div>
      <div className="header__logo">
        <Link to={"/"}>
          <img src={logo} alt="" />
        </Link>
      </div>
      <div className="header__options">
        <div className="header__user">
          <div
            className="header__user_avatar"
            onClick={() => setOpenOption(!openOption)}
          >
            <img
              src={users && users[0]?.avatar ? users[0]?.avatar : avatar}
              alt=""
            />
          </div>
          {openOption && (
            <div className="header__user_content">
              {users[0] ? (
                <div className="header__user_content_logout">
                  <span onClick={handleLogout}>Logout</span>
                  <FiLogOut className="icon" />
                </div>
              ) : (
                <>
                  <Link to={"account/login"}>
                    <span onClick={() => setOpenOption(!openOption)}>
                      ????ng nh???p
                    </span>
                  </Link>
                  <Link to={"account/register"}>
                    <span onClick={() => setOpenOption(!openOption)}>
                      ????ng k??
                    </span>
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
        <div className="header__cart" title="Gi??? h??ng">
          <img src={cartIcon} alt="" onClick={cartActive} />
          <div className="header__cart_content" ref={cartRef}>
            <div className="header__cart_title">
              <span>Gi??? h??ng</span>
              <span className="header__cart_title_icon" onClick={cartActive}>
                <RiCloseLine />
              </span>
            </div>
            <div className="header__cart_products">
              {cart &&
                cart.map((item, index) => (
                  <div className="header__cart_item" key={index}>
                    <div className="header__cart_item_img">
                      <img src={item.img[0]} alt="" />
                    </div>
                    <div className="header__cart_item_info">
                      <span>
                        {item.name} - {item.option.color} - {item.size}
                      </span>
                      <div className="header__cart_item_info_option">
                        <small>{item.amount}</small>
                        <NumberFormat
                          value={item.price}
                          displayType="text"
                          thousandSeparator={true}
                          suffix="??"
                          className="header__cart_item_info-price"
                        />
                      </div>
                      <div
                        className="header__cart_item_info_icon"
                        onClick={() => handleDeleteItem(item)}
                      >
                        <MdOutlineDeleteForever />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="header__cart_total">
              T???ng ti???n:{" "}
              <NumberFormat
                value={totalPrice}
                displayType="text"
                thousandSeparator={true}
                suffix="??"
                className="header__cart_item_info-price"
              />
            </div>
            <div className="header__cart_btn">
              <Link to={"/cart"}>
                <span onClick={cartActive}>Xem gi??? h??ng</span>
              </Link>
              <Link to={"/check"}>
                <span onClick={cartActive}>Thanh to??n</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="header__search">
          <div
            className="header__search_icon"
            title="T??m ki???m"
            onClick={() => setOpenSearch(!openSearch)}
          >
            <BiSearch />
          </div>
          {openSearch && (
            <div className="header__search_content">
              <input type="text" placeholder="T??m ki???m s???n ph???m..." />
              <span>
                <BiSearch />
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
