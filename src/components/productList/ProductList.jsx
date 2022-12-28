import React from "react";
import "./prodcutList.css";
import Product from "../product/Product";
import { products } from "../../data";

const ProductList = () => {
  return (
    <div className="pl">
      <div className="pl-texts">
        <h1 className="pl-title">Create & inspire. It's Parth</h1>
        <p className="pl-desc">
          It is a creative portfolio that your work has been waiting for. It
          contains stunning portfolio styles & a whole lot more awaits inside.
        </p>
        <p>
          <b>Deployemnt of these websites on the way...</b>
        </p>
      </div>
      <div className="pl-list">
        {products.map((item) => (
          <Product key={item.id} img={item.img} link={item.link} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
