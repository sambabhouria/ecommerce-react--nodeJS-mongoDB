import React from "react";

import product from '../../images/favicon.png';

const ProductsStatistics = () => {
  return (
    <div className="col-xl-6 col-lg-12">
      <div className="card mb-4 shadow-sm">
        <article className="card-body">
          <h5 className="card-title">Products statistics</h5>
          <img
            alt=""
            style={{ width: "100%", height: "350px", objectFit: "contain" }}
            // src="/images/product.png"
            src={product}
          />
        </article>
      </div>
    </div>
  );
};

export default ProductsStatistics;
