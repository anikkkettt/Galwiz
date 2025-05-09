import React from "react";
import { Link } from "react-router-dom";

const UseCaseSearchList = (props) => {
  return (
    <div>
      <div className="m-5">
        <div>
          <div>
            <h3 className="my-5">Search Result</h3>
          </div>
        </div>
        <div>
          <div className=" row ">
            {props.searchResult ? (
              props.searchResult.map((item) => (
                <div
                  onClick={(e) => props.setShowSearchResult(false)}
                  className="col-md-6 col-12"
                >
                  <p key={item._id}>
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to={`use_case/${item._id}`}
                    >
                      {item.title}
                    </Link>
                  </p>
                </div>
              ))
            ) : (
              <div>
                <p className="h4">No Result Found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseCaseSearchList;
