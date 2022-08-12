import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Change from "./components/Change/Change";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Info from "./components/Info/Info";
import { getAllProducts } from "./firebase/firebaseFunc";
import Cart from "./pages/Cart/Cart";
import Contact from "./pages/Contact/Contact";
import Detail from "./pages/Detail/Detail";
import Forget from "./pages/ForgetPassword/Forget";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import Pay from "./pages/Pay/Pay";
import Products from "./pages/Products/Products";
import Register from "./pages/Register/Register";
import User from "./pages/User/User";
import "./scss/app.scss";

function App() {
  const currentUser = useSelector((state) => state.users.value);
  const [products, setProducts] = useState([]);
  const [accessories, setAccessories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await getAllProducts("products");
        setProducts(productsData);
        const accessoriesData = await getAllProducts("accessories");
        setAccessories(accessoriesData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <Header user={currentUser[0]} />
      <main className="main">
        <Routes>
          <Route path="/">
            <Route index element={<Home type="products" />} />
            <Route path="account">
              <Route
                index
                element={
                  <User
                    cmp={<Info data={currentUser[0]} />}
                    title={"Thông tin cá nhân"}
                  />
                }
              />
              <Route
                path="change"
                element={
                  <User
                    user={currentUser[0]}
                    cmp={<Change data={currentUser[0]} />}
                    title={"Đổi mật khẩu"}
                  />
                }
              />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="forget" element={<Forget />} />
            </Route>

            <Route path="products">
              <Route
                index
                element={<Products data={products} type="products" />}
              />
              <Route path=":slug" element={<Detail database={"products"} />} />
            </Route>
            <Route path="accessories">
              <Route
                index
                element={<Products data={accessories} type="accessories" />}
              />
              <Route
                path=":slug"
                element={<Detail database={"accessories"} />}
              />
            </Route>
            <Route path="cart" element={<Cart />} />
            <Route path="contact" element={<Contact />} />
            <Route path="check" element={<Pay />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
