import React from "react";
import "./prodcutList.css";
// import Product from "../product/Product";
// import { products } from "../../data";

const ProductList = () => {
  return (
    <div className="pl">
      <div className="pl-texts">
        <h1 className="pl-title">Create & inspire. It's Parth</h1>
        <p className="pl-desc">Please checkout my work and connect with me. </p>
        <p>
          <a
            className="pl-social"
            href="https://github.com/Parth8825"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 0.297c-6.627 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.613-4.042-1.613-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.835 2.809 1.305 3.495.997.108-.776.418-1.305.762-1.605-2.665-.305-5.467-1.333-5.467-5.932 0-1.311.468-2.381 1.236-3.221-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.3 1.23.96-.267 1.99-.399 3.012-.404 1.022.005 2.052.137 3.012.404 2.29-1.552 3.297-1.23 3.297-1.23.654 1.652.243 2.873.12 3.176.77.84 1.234 1.91 1.234 3.221 0 4.61-2.807 5.625-5.48 5.92.43.37.814 1.096.814 2.21 0 1.598-.015 2.887-.015 3.281 0 .32.216.694.825.576 4.765-1.589 8.2-6.085 8.2-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub Profile
          </a>
        </p>
        <p>
          <a
            className="pl-social"
            href="https://www.linkedin.com/in/parthdarji8825"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 24h5V7H0v17zM7.5 7h4.8v2.3h.1c.7-1.3 2.4-2.7 4.9-2.7 5.2 0 6.2 3.4 6.2 7.8V24h-5v-7.5c0-1.8 0-4.1-2.5-4.1-2.5 0-2.8 1.9-2.8 3.9V24h-5V7z" />
            </svg>
            LinkedIn Profile
          </a>
        </p>
      </div>
      {/* <div className="pl-list">
        {products.map((item) => (
          <Product key={item.id} img={item.img} link={item.link} />
        ))}
      </div> */}
    </div>
  );
};

export default ProductList;
