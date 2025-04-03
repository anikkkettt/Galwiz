import { Link } from "react-router-dom";
import React, { useState } from "react";
import { NavDropdown, NavLink } from "react-bootstrap";

const DropdownSubtopics = ({ subject }) => {
  const [show, setShow] = useState(false);
  const showDropdown = (e) => {
    setShow(!show);
  };
  const hideDropdown = (e) => {
    setShow(false);
  };
  let sub = subject.topic;
  let newsub = "";
  for (let i = 0; i < sub.length; ++i) {
    if (sub[i] == " ") {
      newsub = newsub.concat("_");
    } else {
      newsub = newsub.concat(sub[i]);
    }
  }
  // newsub = newsub.toLowerCase();
  // console.log(newsub);
  return (
    <div style={{ color: "black" }}>
      <NavDropdown
        title={<span style={{ color: "black" }}>{subject.topic}</span>}
        show={show}
        onMouseEnter={showDropdown}
        onMouseLeave={hideDropdown}
        style={{ color: "black" }}
        drop="end"
        id="basic-nav-dropdown"
        className="border p-1"
      >
        {subject.subtopic.map((item) => {
          let newsubtopic = "";
          for (let i = 0; i < item.length; ++i) {
            if (item[i] === " ") {
              newsubtopic = newsubtopic.concat("_");
            } else {
              newsubtopic = newsubtopic.concat(item[i]);
            }
          }
          // newsubtopic = newsubtopic.toLowerCase();

          return (
            <NavLink>
              <NavDropdown.Item style={{ color: "black" }}>
                <Link
                  style={{ color: "black", textDecoration: "none" }}
                  to={`topic/${newsub}/${newsubtopic}`}
                >
                  {item}
                </Link>
              </NavDropdown.Item>
            </NavLink>
          );
        })}
      </NavDropdown>
    </div>
  );
};

export default DropdownSubtopics;
