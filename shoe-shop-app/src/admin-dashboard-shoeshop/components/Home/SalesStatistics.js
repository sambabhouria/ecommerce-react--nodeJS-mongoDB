import React from "react";

import logStatic from '../../images/favicon.png';

const SaleStatistics = () => {
  return (
    <div className="col-xl-6 col-lg-12">
      <div className="card mb-4 shadow-sm">
        <article className="card-body">
          <h5 className="card-title">Sale statistics</h5>
          <iframe
          title="sale statistics"
            style={{
              background: "#FFFFFF",
              border: "none",
              borderRadius: "2px",
              boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2);",
              width: "100%",
              height: "350px",
            }}
            src="https://charts.mongodb.com/charts-shoeshoptutorial-bzbxw/embed/charts?id=28397e9a-cc52-45f2-8da0-7a9a760c2f6d&maxDataAge=3600&theme=light&autoRefresh=true"
          ></iframe>
          {/* <img
            alt=""
            style={{ width: "100%", height: "350px", objectFit: "contain" }}
            src={logStatic}
            // src="/images/static.png"
          /> */}
        </article>
      </div>
    </div>
  );
};

export default SaleStatistics;
