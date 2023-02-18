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
          Here is the project created by me. You can check out more of my work
          on github profile a whole lot more awaits inside.{" "}
          <a
            href="https://github.com/Parth8825"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://github.com/Parth8825
          </a>
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
