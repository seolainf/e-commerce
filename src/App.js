import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Detail from "./pages/Detail/Detail";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import "./scss/app.scss";

function App() {
  return (
    <div className="App">
      <Header />
      <main className="main">
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="account/login" element={<Login />} />
            <Route path="account/register" element={<Register />} />
            <Route path="product/:id" element={<Detail />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
