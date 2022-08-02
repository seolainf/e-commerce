import React, { useCallback, useEffect, useState } from "react";
import {
  colorFilter,
  sexFilter,
  sizeFilter,
} from "../../assets/data/filterData";
import CheckBox from "../../components/CheckBox/CheckBox";
import Grid from "../../components/Grid/Grid";
import ProductCard from "../../components/ProductCard/ProductCard";
import { FiMenu } from "react-icons/fi";
import { VscClose } from "react-icons/vsc";
import "./products.scss";
import { useRef } from "react";

const Products = ({ data, type }) => {
  const initFilter = {
    sex: [],
    color: [],
    size: [],
  };

  const [productsList, setProductsList] = useState(data && data);
  const [filters, setFilters] = useState(initFilter);

  const filterRef = useRef(null);

  const showFilter = () => filterRef.current.classList.toggle("active");

  const filterSelect = (type, checked, item) => {
    if (checked) {
      switch (type) {
        case "SEX":
          setFilters({ ...filters, sex: [...filters.sex, item.sex] });
          break;
        case "COLOR":
          setFilters({ ...filters, color: [...filters.color, item.color] });
          break;
        case "SIZE":
          setFilters({ ...filters, size: [...filters.size, item.size] });
          break;
        default:
          break;
      }
    } else {
      switch (type) {
        case "SEX":
          const newSex = filters.sex.filter((e) => e !== item.sex);
          setFilters({ ...filters, sex: newSex });
          break;
        case "COLOR":
          const newColor = filters.color.filter((e) => e !== item.color);
          setFilters({ ...filters, color: newColor });
          break;
        case "SIZE":
          const newSize = filters.size.filter((e) => e !== item.size);
          setFilters({ ...filters, size: newSize });
          break;
        default:
          break;
      }
    }
  };

  const updateProducts = useCallback(() => {
    let temp = data;

    if (filters.sex.length > 0) {
      temp = temp.filter((e) => {
        const check = e.categories.find((sex) => filters.sex.includes(sex));
        return check !== undefined;
      });
    }
    if (filters.color.length > 0) {
      temp = temp.filter((e) => {
        const check = e.options.find((color) =>
          filters.color.includes(color.color)
        );
        return check !== undefined;
      });
    }
    if (filters.size.length > 0) {
      temp = temp.filter((e) => {
        const check = e.sizes.find((size) => filters.size.includes(size));
        return check !== undefined;
      });
    }
    setProductsList(temp);
  }, [filters, data]);

  const removeFilter = (e) => {
    e.preventDefault();
    setFilters(initFilter);
  };

  useEffect(() => {
    updateProducts();
  }, [updateProducts]);

  return (
    <div className="products">
      <div className="products__filter" ref={filterRef}>
        <div className="products__filter_close" onClick={showFilter}>
          <VscClose />
        </div>
        <div className="products__filter_title">Sản phẩm</div>
        <div className="products__filter_content">
          {sexFilter &&
            sexFilter.map((sex) => (
              <CheckBox
                title={sex.name}
                key={sex.id}
                onChange={(input) => filterSelect("SEX", input.checked, sex)}
                checked={filters.sex.includes(sex.sex)}
              />
            ))}
        </div>
        <div className="products__filter_title">Màu sắc</div>
        <div className="products__filter_content">
          {colorFilter &&
            colorFilter.map((color) => (
              <CheckBox
                title={color.name}
                key={color.id}
                onChange={(input) =>
                  filterSelect("COLOR", input.checked, color)
                }
                checked={filters.color.includes(color.color)}
              />
            ))}
        </div>
        <div className="products__filter_title">Kích cỡ</div>
        <div className="products__filter_content">
          {sizeFilter &&
            sizeFilter.map((size) => (
              <CheckBox
                title={size.name}
                key={size.id}
                onChange={(input) => filterSelect("SIZE", input.checked, size)}
                checked={filters.size.includes(size.size)}
              />
            ))}
        </div>
        <div className="products__filter_btn">
          <button onClick={removeFilter}>Xóa bộ lọc</button>
        </div>
      </div>
      <div className="products__main">
        <div className="products__main_heading">
          <div className="products__main_btn" onClick={showFilter}>
            <FiMenu />
          </div>
          <div className="products__main_title">
            {productsList && productsList.length} Sản phẩm
          </div>
        </div>
        <Grid col={4} mdCol={3} smCol={2} gap={30}>
          {productsList &&
            productsList?.map((item) => (
              <ProductCard data={item} key={item.id} type={type} />
            ))}
        </Grid>
      </div>
    </div>
  );
};

export default Products;
