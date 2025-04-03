import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Navbar/Header";
import Container from "react-bootstrap/Container";
import { NavDropdown, Navbar, Nav, Form, Button, Card } from "react-bootstrap";
import Cards from "../components/Cards/card";
import CardItemNB from "../components/Cards/CardItemNB";
import CardItemTNB from "../components/Cards/CardItemTNB";
import "./home.css";
import Footer from "../components/footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import axios from "axios";

const evenColor = "#7D7D7D";
const oddColor = "#586284";
const potentialCardBG = "#DEDEDE";
const contributionsColorHeading = "#FFE34F";
const contributionsColorPara = "white";
const contributionsColorLink = "#C5C5C5";

const potentialHeading = "#00726C";
const potentialLink = "#A6A6A6";
const potentialPara = "black";

const contributionHeading = "CLIMATOGRAM ANALYSIS";
const contributionPara =
  "The notebook consists of  python code for converting the rainfall and temperature data into a climatogram. The user uploads csv files containing the data of dates and variable values, each for a file. The code reproduces an accurate climatogram  ";
const contributionLink = "Visit Notebook";

const potentialHeadingText = "CLIMATOGRAM ANALYSIS";
const potentialParaText =
  "The notebook consists of  python code for converting the rainfall and temperature data into a climatogram. The user uploads csv files containing the data of dates and variable values, each for a file. The code reproduces an accurate climatogram  ";

const workflowLinkText = "Explore";

const upload_img = require("../pics/upload-work.png");
const work_community_img = require("../pics/work-community.png");
const mapImg = require("../pics/map.png");
const limit = 12;

const Home = () => {
  const navigate = useNavigate();
  const [totalNoteBook, setTotalNoteBook] = useState(0);
  const [totalUseCase, setTotalUseCase] = useState(0);
  const [useCaseData, setUseCaseData] = useState([]);
  const [notebookData, setNotebookData] = useState([]);
  const [totalToolNoteBook, setTotalToolNoteBook] = useState(0);
  const [toolNotebookData, setToolNotebookData] = useState([]);
  const [totalTopic, setTotalTopic] = useState({});
  const getNBData = async (page) => {
    const res = await axios.get(`/api/v1/user/get/notebook/${limit}/${page}`);
    // console.log(res)
    setTotalNoteBook(res.data.totalNoteBook);
    setNotebookData(res.data.notebook);
  };

  const getUCData = async (page) => {
    const res = await axios.get(`/api/v1/user/get/UseCase/${limit}/${page}`);
    // console.log(res)
    setTotalUseCase(res.data.totalUseCase);
    setUseCaseData(res.data.useCase);
  };

  const getTNBData = async (page) => {
    const res = await axios.get(
      `/api/v1/user/get/toolNotebook/${limit}/${page}`
    );
    // console.log(res)
    setTotalToolNoteBook(res.data.totalToolNoteBook);
    setToolNotebookData(res.data.toolNotebook);
  };
  const getTotalTopic = async (page) => {
    const res = await axios.get(`/api/v1/main/home/total/topic`);
    setTotalTopic(res.data.data);
  };
  useEffect(() => {
    getNBData(1);
    getTNBData(1);
    getTotalTopic();
    getUCData(1);
  }, []);
  return (
    <>
      <div
        className="d-flex justify-content-around align-items-center p-1 f-16"
        style={{ background: "rgb(255,250,123)", fontSize: "20px" }}
      >
        <div>Explore our collection of tools at Galaxy Toolshed</div>
        <Button
          onClick={() =>
            window.open("https://toolshed.g2.bx.psu.edu/", "_blank")
          }
          className="px-5 py-1 visit"
          style={{
            fontSize: "inherit",
            backgroundColor: "rgb(44,48,67)",
            border: "none",
            borderRadius: "15px",
          }}
        >
          Visit Galaxy Toolshed
        </Button>
      </div>
      <div className="demo-wrap">
        <img class="demo-bg fluid" src={mapImg} alt="" />
        <div
          className="d-flex flex-column background demo-content"
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0,0.5 )",
            backgroundImage: `url("../pics/p2.png")`,
            minHeight: "40vh",
          }}
        >
          <div className="p-md-5 p-3 w-75 font text-center ">
            Joining Hands to make a 'Reproducible Science' ecosystem
          </div>
          <a href="#use_case">
            <Button
              className="px-3 rounded py-3 f-1"
              style={{
                backgroundColor: "rgb(221,241,240)",
                color: "black",
                fontSize: "25px",
                border: "none",
              }}
            >
              Scroll to view Use Case{" "}
              <i className="bi bi-chevron-double-down"></i>
            </Button>
          </a>
          <div
            className="d-flex flex-column justify-content-center py-5 f-2"
            style={{
              fontSize: "40px",
              color: "white",
              alignItems: "center",
              fontWeight: "400",
            }}
          >
            <p className="m-0 p-0">
              {totalTopic.totalWorkFlow} Workflows, {totalTopic.totalUseCase}{" "}
              Use cases,{" "}
            </p>
            <p className=" m-0 p-0">
              {totalTopic.totalToolNoteBook} Tool Notebooks ,{" "}
              {totalTopic.totalNoteBook} Notebooks.
            </p>
          </div>
        </div>
      </div>
      <div
        className="p-4"
        style={{
          background: "rgb(255,227,79)",
        }}
      >
        <div className="container d-flex flex-column justify-content-between ">
          <h2 className="text-center">Our Community</h2>
          <div className="container contain d-flex justify-content-center">
            <img
              src="/images/Companies_Collage.png"
              className="fluid image"
              alt=""
            />
            <div
              onClick={() =>
                window.open("https://galaxyproject.org/community/", "_blank")
              }
              className="middle"
            >
              <h3 className="pointer">Know More</h3>
            </div>
          </div>
        </div>
        {/* <div className="container d-flex flex-column justify-content-between gap-4">
          <h2 className="text-center" style={{ fontWeight: "bolder" }}>
            Research Leads
          </h2>
          <div className="container contain d-flex justify-content-center">
            <img src={research} className="fluid image " alt="" />
            <div className="middle">
              <h3 className="">Research Leads</h3>
            </div>
          </div>
        </div> */}
      </div>
      <div
        id="use_case"
        className=" d-flex flex-column justify-content-center  p-4"
        style={{
          backgroundColor: "white",
          minHeight: "500px",
          flexGrow: 1,
          alignItems: "center",
        }}
      >
        <h1 className="py-3" style={{ textAlign: "center", fontSize: "40px" }}>
          Latest Use Cases
        </h1>
        <div
          className="d-flex my-4 justify-content-evenly container"
          style={{
            width: "inherit",
            maxHeight: "fit-content",
            blockSize: "fit-content",
            flexGrow: "1",
            flexWrap: "wrap",
            gap: "50px",
            // background:'#ffff'
          }}
        >
          {useCaseData.map((uc, index) => (
            <Cards key={uc._id} data={uc} index={index} />
          ))}
          {/* <Cards backgroundColor={oddColor} />
          <Cards backgroundColor={evenColor} />
          <Cards backgroundColor={oddColor} />
          <Cards backgroundColor={evenColor} />
          <Cards backgroundColor={oddColor} />
          <Cards backgroundColor={evenColor} /> */}
        </div>

        <div className="row  d-flex justify-content-center ">
          <div className="col d-flex justify-content-center">
            <Pagination
              count={Math.trunc(totalUseCase / limit) + 1}
              onChange={(e, pageNo) => {
                getNBData(pageNo);
              }}
            />
          </div>
        </div>
      </div>

      <div className="row p-2 mt-3 d-flex flex-column justify-content-center align-items-center ">
        <div
          className="col-md-8 p-3 border borderRadius d-flex align-items-center justify-content-center"
          style={{
            minWidth: "60vw",
            boxShadow:
              "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
          }}
        >
          <img src={upload_img} style={{ width: "70px" }} className="" alt="" />
          <div className="row ms-md-2">
            <div className="col">
              <div className="p-2" style={{ minWidth: "40vw" }}>
                <h4>Upload Workflow </h4>
                <h6 style={{ fontWeight: "400" }}>
                  Follow the guide to upload a workflow at Workflow hub.
                </h6>
              </div>
            </div>
          </div>

          <i
            className="bi bi-arrow-up-right-square ms-md-5"
            style={{ fontSize: "1.6rem", marginTop: "-10px" }}
          ></i>
        </div>
        <div
          className="col-md-8 p-3 border borderRadius mt-3 d-flex justify-content-center align-items-center "
          onClick={() =>
            window.open(
              "https://workflowhub.eu/home/create_or_join_project",
              "_blank"
            )
          }
          style={{
            minWidth: "60vw",
            boxShadow:
              "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
          }}
        >
          <img
            src={work_community_img}
            style={{ width: "70px" }}
            className=""
            alt=""
          />

          <div className="row ms-md-2">
            <div className="col">
              <div
                className="p-2"
                style={{ minWidth: "40vw", cursor: "pointer" }}
              >
                <h4>Workflowhub Europe Galaxy Community</h4>
                <h6 style={{ fontWeight: "400" }}>
                  Discover all the workflows and join our teams
                </h6>
              </div>
            </div>
          </div>
          <i
            className="bi bi-arrow-up-right-square ms-md-5"
            style={{
              fontSize: "1.6rem",
              marginTop: "-10px",
              cursor: "pointer",
            }}
          ></i>
        </div>
      </div>

      <section>
        <div
          className=" d-flex flex-column justify-content-center  p-4"
          style={{
            backgroundColor: "white",
            minHeight: "500px",
            flexGrow: 1,
            alignItems: "center",
          }}
        >
          <h1
            className="py-3"
            style={{ textAlign: "center", fontSize: "40px" }}
          >
            Latest Reproducible Python Notebooks
          </h1>
          <div
            className="d-flex my-4 justify-content-evenly container"
            style={{
              width: "inherit",
              maxHeight: "fit-content",
              blockSize: "fit-content",
              flexGrow: "1",
              flexWrap: "wrap",
              gap: "50px",
            }}
          >
            {notebookData.map((nb) => (
              <CardItemNB
                heading={nb.title}
                para={nb.description}
                id={nb._id}
                backgroundColor={evenColor}
                colorHead={contributionsColorHeading}
                colorPara={contributionsColorPara}
                colorLink={contributionsColorLink}
              />
            ))}
          </div>

          <div className="row  mt-4 ">
            <div className="col d-flex justify-content-center">
              <Pagination
                count={Math.trunc(totalNoteBook / limit) + 1}
                onChange={(e, pageNo) => {
                  getNBData(pageNo);
                }}
              />
            </div>
          </div>
        </div>
        {/* <div className="row bg-section-1 p-5  d-flex flex-column justify-content-center  p-4">
          <div className="row text-center">
            <h2 className="m-2 mb-3"> Latest Reproducible Python Notebooks</h2>
          </div>

          <div
            className="d-flex my-4 justify-content-evenly container"
            style={{
              width: "inherit",
              maxHeight: "fit-content",
              blockSize: "fit-content",
              flexGrow: "1",
              flexWrap: "wrap",
              gap: "50px",
            }}
          >
            {notebookData.map((nb) => (
              <CardItem
                heading={nb.topic}
                para={nb.description}
                link={nb.notebookLink}
                backgroundColor={evenColor}
                colorHead={contributionsColorHeading}
                colorPara={contributionsColorPara}
                colorLink={contributionsColorLink}
              />
            ))}
          </div>

          <div className="row  mt-4 ">
            <div className="col d-flex justify-content-center">
              <Pagination
                count={Math.trunc(totalNoteBook / limit) + 1}
                onChange={(e, pageNo) => {
                  console.log(pageNo);
                  getNBData(pageNo);
                }}
              />
            </div>
          </div>
        </div> */}
      </section>

      <section>
        <div
          className=" d-flex flex-column justify-content-center  p-4"
          style={{
            backgroundColor: "#FFFFFF",
            minHeight: "500px",
            flexGrow: 1,
            alignItems: "center",
          }}
        >
          <h1
            className="py-3"
            style={{ textAlign: "center", fontSize: "40px" }}
          >
            Latest Potential Tools Notebook
          </h1>
          <div
            className="d-flex my-4 justify-content-evenly container"
            style={{
              width: "inherit",
              maxHeight: "fit-content",
              blockSize: "fit-content",
              flexGrow: "1",
              flexWrap: "wrap",
              gap: "50px",
            }}
          >
            {toolNotebookData.map((nb) => (
              <CardItemTNB
                heading={nb.title}
                para={nb.description}
                id={nb._id}
                backgroundColor={potentialCardBG}
                colorHead={potentialHeading}
                colorPara={potentialPara}
                colorLink={potentialLink}
              />
            ))}
          </div>

          <div className="row  mt-4 ">
            <div className="col d-flex justify-content-center">
              <Pagination
                count={Math.trunc(totalToolNoteBook / limit) + 1}
                onChange={(e, pageNo) => {
                  // console.log(pageNo);
                  getTNBData(pageNo);
                }}
              />
            </div>
          </div>
        </div>
        {/* <div
          className="row  p-5 d-flex justify-content-evenly  "
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <div className="row text-center ">
            <h2 className="mt-3">Latest Potential Tools Notebook</h2>
          </div>
          {toolNotebookData.map((nb) => (
            <CardItem
              heading={nb.topic}
              para={nb.description}
              link={nb.notebookLink}
              backgroundColor={potentialCardBG}
              colorHead={potentialHeading}
              colorPara={potentialPara}
              colorLink={potentialLink}
            />
          ))}
          <div className="row  mt-4 ">
            <div className="col d-flex justify-content-center">
              <Pagination
                count={Math.trunc(totalToolNoteBook / limit) + 1}
                onChange={(e, pageNo) => {
                  // console.log(pageNo);
                  getTNBData(pageNo);
                }}
              />
            </div>
          </div>
        </div> */}
      </section>

      {/* <section>
        <div className="row  p-5 bg-section-1 d-flex justify-content-evenly  ">
          <div className="row text-center ">
            <h2 className="mt-3">Latest Workflows</h2>
          </div>

          <CardItem
            heading={potentialHeadingText}
            para={potentialParaText}
            link={workflowLinkText}
            backgroundColor={oddColor}
            colorHead={contributionsColorHeading}
            colorPara={contributionsColorPara}
            colorLink={potentialLink}
          />
          <CardItem
            heading={potentialHeadingText}
            para={potentialParaText}
            link={workflowLinkText}
            backgroundColor={evenColor}
            colorHead={contributionsColorHeading}
            colorPara={potentialPara}
            colorLink={potentialLink}
          />
          <CardItem
            heading={potentialHeadingText}
            para={potentialParaText}
            link={workflowLinkText}
            backgroundColor={oddColor}
            colorHead={contributionsColorHeading}
            colorPara={contributionsColorPara}
            colorLink={potentialLink}
          />
          <CardItem
            heading={potentialHeadingText}
            para={potentialParaText}
            link={workflowLinkText}
            backgroundColor={evenColor}
            colorHead={contributionsColorHeading}
            colorPara={potentialPara}
            colorLink={potentialLink}
          />
          <CardItem
            heading={potentialHeadingText}
            para={potentialParaText}
            link={workflowLinkText}
            backgroundColor={oddColor}
            colorHead={contributionsColorHeading}
            colorPara={contributionsColorPara}
            colorLink={potentialLink}
          />
          <CardItem
            heading={potentialHeadingText}
            para={potentialParaText}
            link={workflowLinkText}
            backgroundColor={evenColor}
            colorHead={contributionsColorHeading}
            colorPara={potentialPara}
            colorLink={potentialLink}
          />
          <div className="row  mt-4 ">
            <div className="col d-flex justify-content-center">
              <Pagination count={10} />
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
};

export default Home;
