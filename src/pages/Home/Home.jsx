import { useEffect, useState } from "react";
import Grid from "../../components/Grid/Grid";
import ProductCard from "../../components/ProductCard/ProductCard";
import Section from "../../components/Section/Section";
import Slider from "../../components/Slider/Slider";
import { getProductNew, getRandomProducts } from "../../firebase/firebaseFunc";
import "./home.scss";

const Home = ({ type }) => {
  const [products, setProducts] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRandomProducts(10, `${type}`);
        setProducts(data);
        const newProducts = await getProductNew("new");
        setNews(newProducts);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [type]);

  return (
    <div className="home">
      <div className="home__slider">
        <Slider />
      </div>
      <div className="home__products">
        <Section title={"sản phẩm bán chạy"} />
        <Grid col={5} mdCol={3} smCol={2} gap={20}>
          {products &&
            products.map((product) => (
              <ProductCard data={product} key={product.id} type={type} />
            ))}
        </Grid>
      </div>
      <div className="home__products">
        <Section title={"hàng mới về"} />
        <Grid col={5} mdCol={3} smCol={2} gap={20}>
          {news &&
            news.map((product) => (
              <ProductCard data={product} key={product.id} type={type} />
            ))}
        </Grid>
      </div>
    </div>
  );
};

export default Home;
