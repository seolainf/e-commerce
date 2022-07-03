import { signOut } from "firebase/auth";
import { useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { RiCloseLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { menuData } from "../../assets/data/headerMenu";
import cart from "../../assets/images/cart.png";
import logo from "../../assets/images/logo.png";
import user from "../../assets/images/user.png";
import { auth } from "../../firebase/firebaseConfig";
import { deleteUser } from "../../redux/usersSlice";
import "./header.scss";

const Header = () => {
  const [openOption, setOpenOption] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.value);

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
              src={users && users[0]?.avatar ? users[0]?.avatar : user}
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
                      Đăng nhập
                    </span>
                  </Link>
                  <Link to={"account/register"}>
                    <span onClick={() => setOpenOption(!openOption)}>
                      Đăng ký
                    </span>
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
        <div className="header__cart" title="Giỏ hàng">
          <img src={cart} alt="" onClick={cartActive} />
          <div className="header__cart_content" ref={cartRef}>
            <div className="header__cart_title">
              <span>Giỏ hàng</span>
              <span className="header__cart_title_icon" onClick={cartActive}>
                <RiCloseLine />
              </span>
            </div>
            <div className="header__cart_item">Item1</div>
            <div className="header__cart_total">Tổng tiền: 100.000</div>
            <div className="header__cart_btn">
              <Link to={"/cart"}>
                <span onClick={cartActive}>Xem giỏ hàng</span>
              </Link>
              <Link to={"/check"}>
                <span onClick={cartActive}>Thanh toán</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="header__search">
          <div
            className="header__search_icon"
            title="Tìm kiếm"
            onClick={() => setOpenSearch(!openSearch)}
          >
            <BiSearch />
          </div>
          {openSearch && (
            <div className="header__search_content">
              <input type="text" placeholder="Tìm kiếm sản phẩm..." />
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
