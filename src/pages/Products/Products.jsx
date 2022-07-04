import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../firebase/firebaseFunc";
import { filterData } from "../../assets/data/filterData";
import "./products.scss";
import ProductsFilter from "../../components/ProductsFilter/ProductsFilter";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="products">
      <div className="products__filter">
        {filterData &&
          filterData.map((item) => (
            <ProductsFilter key={item.id} data={item} />
          ))}
      </div>
      <div className="products__main">Main</div>
    </div>
  );
};

export default Products;
