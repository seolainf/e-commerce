import React, { useState } from "react";
import "./productsFilter.scss";

const ProductsFilter = ({ data }) => {
  const [filterActive, setFilterActive] = useState(null);

  const handleOnchange = (e) => {
    const id = e.target.id;
    console.log(id);
  };
  return (
    <div className="productsFilter">
      <div className="productsFilter__title">{data.title}</div>
      <div className="productsFilter__content">
        {data.options.map((option, index) => (
          <label
            htmlFor={option.id}
            className={`productsFilter__content_item ${
              filterActive === option ? "active" : ""
            }`}
            key={index}
            style={{ borderColor: `${option.bg}` }}
            onClick={() => setFilterActive(option)}
          >
            <input type="checkbox" id={option.id} onChange={handleOnchange} />
            <small
              style={{
                backgroundColor: `${option.bg}`,
              }}
            ></small>
            <span>{option.title}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ProductsFilter;
