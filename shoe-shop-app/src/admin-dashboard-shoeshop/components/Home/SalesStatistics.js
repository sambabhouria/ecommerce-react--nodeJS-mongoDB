import React from "react";

import logStatic from '../../images/favicon.png';

const SaleStatistics = () => {
  return (
    <div className="col-xl-6 col-lg-12">
      <div className="card mb-4 shadow-sm">
        <article className="card-body">
          <h5 className="card-title">Sale statistics</h5>
          <img
            alt=""
            style={{ width: "100%", height: "350px", objectFit: "contain" }}
            src={logStatic}
            // src="/images/static.png"
          />
        </article>
      </div>
    </div>
  );
};

export default SaleStatistics;
