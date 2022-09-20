import React from "react";
import "./prodcutList.css";
import Product from "../product/Product";

const ProductList = () => {
  return (
    <div className="pl">
      <div className="pl-texts">
        <h1 className="pl-title">Create & inspire. It's Parth</h1>
        <p className="pl-desc">
          Parth's portfolio is a creative portfolio that your work has been
          waiting for. Beautiful homes, stunning portfolio styles & a whole lot
          more awaits inside.
        </p>
      </div>
      <div className="pl-list">
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </div>
    </div>
  );
};

export default ProductList;
