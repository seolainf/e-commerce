import React, { useState } from "react";
import "./productsFilter.scss";

const ProductsFilter = ({ data, option }) => {
  const [filterActive, setFilterActive] = useState(null);

  const handleOnchange = (e) => {
    const id = e.target.id;
    option(id);
  };
  return (
    <div className="productsFilter">
      <div className="productsFilter__title">{data.title}</div>
    </div>
  );
};

export default ProductsFilter;
