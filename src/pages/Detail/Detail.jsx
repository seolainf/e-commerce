import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Grid from "../../components/Grid/Grid";
import ProductCard from "../../components/ProductCard/ProductCard";
import ProductDetail from "../../components/ProductDetail/ProductDetail";
import Section from "../../components/Section/Section";
import {
  getProductBySlug,
  getRandomProducts,
} from "../../firebase/firebaseFunc";
import "./detail.scss";

const Detail = ({ database }) => {
  const { slug } = useParams();

  const [product, setProduct] = useState({});
  const [productSuggest, setProductSuggest] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProductBySlug(slug, database);
        setProduct(...res);
        const sugg = await getRandomProducts(5, database);
        setProductSuggest(sugg);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [slug, database]);

  return (
    <div className="detail">
      <ProductDetail data={product} />
      <div className="detail__desc">
        <div className="detail__desc_title">Đặc điểm sản phẩm</div>
        <ul>
          {product &&
            product.featured?.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
      </div>
      <div className="detail__suggestion">
        <Section title={"Có thể bạn muốn mua"} />
        <Grid col={5} mdCol={3} smCol={2} gap={30}>
          {productSuggest &&
            productSuggest?.map((item) => (
              <ProductCard key={item.id} data={item} type={database} />
            ))}
        </Grid>
      </div>
    </div>
  );
};

export default Detail;
