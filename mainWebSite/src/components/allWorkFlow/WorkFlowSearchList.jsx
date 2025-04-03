import React from "react";
import { Link } from "react-router-dom";

const WorkFlowSearchList = (props) => {
  return (
    <div>
      <div className="m-5">
        <div>
          <div>
            <h3 className="my-5">Search Result</h3>
          </div>
        </div>
        <div>
          <div className=" row mt-3">
            {props.searchResult.map((workBookData) => (
              <div className="col-md-6 col-12">
                <p key={workBookData._id}>
                  <div
                    className="pointer"
                    onClick={() => window.open(workBookData.link, "_blank")}
                  >
                    {workBookData.title}
                  </div>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkFlowSearchList;
