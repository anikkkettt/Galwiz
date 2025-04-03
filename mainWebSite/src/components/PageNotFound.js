import React from "react";

const PageNotFound = () => {
  return (
    <div
      style={{
        backgroundImage: `url(/images/map.png)`,
        backgroundPosition: "cover",
        backgroundRepeat: "no-repeat",
        // opacity: 0.2,
        minHeight: "70vh",
      }}
      className="row d-flex align-items-center"
    >
      <div
        style={{
          opacity: 1,
          color: "black",
        }}
        className="col-md-6 col-12 d-flex justify-content-end"
      >
        <img
          style={{
            opacity: 1,
            color: "black",
          }}
          alt=""
          src="/images/404.png"
        />
      </div>
      <div
        style={{
          opacity: 1,
          color: "black",
        }}
        className="col-md-6 col-12 d-flex justify-content-start"
      >
        <p style={{ fontSize: "80px" }}>Page not Found</p>
      </div>
    </div>
  );
};

export default PageNotFound;
