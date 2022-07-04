import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Grid from "../../components/Grid/Grid";
import ProductCard from "../../components/ProductCard/ProductCard";
import ProductDetail from "../../components/ProductDetail/ProductDetail";
import Section from "../../components/Section/Section";
import { getProductById, getRandomProducts } from "../../firebase/firebaseFunc";
import "./detail.scss";

const Detail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState({});
  const [productSuggest, setProductSuggest] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProductById(id);
        setProduct({ id: id, ...res });
        const sugg = await getRandomProducts(5);
        setProductSuggest(sugg);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="detail">
      <ProductDetail data={product} />
      <div className="detail__desc">
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
              <ProductCard key={item.id} data={item} />
            ))}
        </Grid>
      </div>
    </div>
  );
};

export default Detail;
