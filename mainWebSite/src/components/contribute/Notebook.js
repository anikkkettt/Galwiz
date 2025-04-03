import React, { useState, useRef } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import SunEditor from "suneditor-react";
import axios from "axios";
import Button from "@mui/material/Button";
import topicData from "../reUsableComponent/TopicData";
import "suneditor/dist/css/suneditor.min.css";
import SnackbarComponent from "../reUsableComponent/SnackbarComponent";
import Loader from "../reUsableComponent/Loader";

const defaultFonts = [
  "Arial",
  "Comic Sans MS",
  "Courier New",
  "Impact",
  "Georgia",
  "Tahoma",
  "Trebuchet MS",
  "Verdana",
];
const sortedFontOptions = [
  "Logical",
  "Salesforce Sans",
  "Garamond",
  "Sans-Serif",
  "Serif",
  "Times New Roman",
  "Helvetica",
  ...defaultFonts,
].sort();
const Notebook = () => {
  const [subTopicData, setSubTopicData] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [valueOfSunEditor, setValueOfSunEditor] = useState("");
  const [isLoader, setIsLoader] = useState(false);

  const topicSelectHandler = async (event) => {
    subTopic.current.value = "";
    setSubTopicData(topicData[topic.current.value].subtopic);
  };

  const title = useRef(null);
  const githubLink = useRef(null);
  const notebookLink = useRef(null);

  const subTopic = useRef(null);
  const topic = useRef(null);
  const submitHandler = async (e) => {
    try {
      setIsLoader(true);

      const res = await axios.post("/api/v1/user/create/notebook", {
        title: title.current.value,
        topic: topicData[topic.current.value].topic,
        subTopic: subTopic.current.value,
        description: valueOfSunEditor,
        githubLink: githubLink.current.value,
        notebookLink: notebookLink.current.value,
      });
      title.current.value = "";

      setIsLoader(false);
      githubLink.current.value = "";
      setValueOfSunEditor("");
      notebookLink.current.value = "";
      setOpenSnackbar(true);
      setMessage(res.data.message);
      setSeverity("success");
    } catch (error) {
      setIsLoader(false);

      setOpenSnackbar(true);
      setMessage(error.response.data.message);
      setSeverity("error");
    }
  };

  return (
    <div className=" m-3 mt-5 pb-5 rounded shadow bg-body  ">
      <SnackbarComponent
        message={message}
        severity={severity}
        open={openSnackbar}
        setOpen={setOpenSnackbar}
      />
      <Loader open={isLoader} setOpen={setIsLoader} />
      <Form
        onSubmit={(e) => {
          e.preventDefault();

          submitHandler();
        }}
      >
        <div className="row mt-2">
          <div className="col-md-6 col-12">
            <Form.Group
              as={Row}
              className="my-3 ms-md-5 ms-1 "
              controlId="formPlaintextPassword"
            >
              <Form.Label column sm="1">
                Tittle:
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  required
                  className="shadow"
                  placeholder="Tittle"
                  ref={title}
                />
              </Col>
            </Form.Group>
          </div>
          <div className="col-md-6 col-12">
            <div className="row">
              <div className=" col-12">
                <Form.Group
                  as={Row}
                  className="my-3 ms-md-5 ms-1"
                  controlId="formPlaintextPassword"
                >
                  <Form.Label column sm="3">
                    Select Topic :
                  </Form.Label>
                  <Col sm="8">
                    <Form.Select
                      className="shadow"
                      ref={topic}
                      onChange={topicSelectHandler}
                    >
                      <option>Select Topic</option>
                      {topicData.map((item, key) => (
                        <option value={key}>{item.topic}</option>
                      ))}
                    </Form.Select>
                  </Col>
                </Form.Group>
              </div>
              <div className=" col-12">
                <Form.Group
                  as={Row}
                  className="my-3 ms-md-5 ms-1"
                  controlId="formPlaintextPassword"
                >
                  <Form.Label column sm="3">
                    Select Sub_topic :
                  </Form.Label>
                  <Col sm="8">
                    <Form.Select className="shadow" ref={subTopic}>
                      <option>Select Sub Topic</option>

                      {subTopicData.map((item, key) => (
                        <option value={item}>{item}</option>
                      ))}
                    </Form.Select>
                  </Col>
                </Form.Group>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col mt-2 d-flex justify-content-center  ">
            <h5 className="border-bottom border-success border-2">
              Description :
            </h5>
          </div>

          <div className="col-12 d-flex justify-content-center   ">
            <SunEditor
              width="90%"
              setContents={valueOfSunEditor}
              onChange={setValueOfSunEditor}
              setOptions={{
                buttonList: [
                  [
                    "bold",
                    "underline",
                    "italic",
                    "strike",
                    "subscript",
                    "superscript",
                  ],
                  ["undo", "redo"],
                  ["font", "fontSize"],
                  ["fontColor", "hiliteColor"],
                  ["align", "list", "lineHeight"],

                  // ["table", "horizontalRule", "link", "image"],
                ],
                defaultTag: "div",
                minHeight: "300px",
                showPathLabel: false,
                font: sortedFontOptions,
              }}
            />
          </div>
        </div>
        <div className="row  ">
          <div className="col-md-6 col-12  ">
            <Form.Group
              className="my-3 ms-md-5 ms-1 "
              controlId="formPlaintextPassword"
            >
              <Form.Label column sm="12">
                Notebook link:
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  ref={notebookLink}
                  type="url"
                  className="shadow"
                  placeholder="Notebook link"
                />
              </Col>
            </Form.Group>
          </div>
          <div className="col-md-6 col-12">
            <Form.Group
              className="my-3 ms-md-5 ms-1 "
              controlId="formPlaintextPassword"
            >
              <Form.Label column sm="12">
                Github link:
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  ref={githubLink}
                  type="url"
                  className="shadow"
                  placeholder="Github link"
                />
              </Col>
            </Form.Group>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 col-12 ">
            <div className="row me-5">
              <div className="d-flex justify-content-center col-12 my-4 ">
                {/* <button
                  type="submit"
                  style={{
                    background: "#2C3143",
                    borderRadius: "8px",
                    color: "#FFE34F",
                    border: "none",
                    padding: "10px  20px",
                  }}
                >
                  <strong>Submit</strong>
                </button> */}
                <Button
                  onClick={submitHandler}
                  sx={{
                    background: "#2C3143",
                    borderRadius: "8px",
                    color: "#FFE34F",
                    border: "none",
                    padding: "10px  20px",
                    "&:hover": {
                      backgroundColor: "#455075",
                      color: "#fff",
                    },
                  }}
                  variant="contained"
                >
                  <strong>Submit</strong>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Notebook;
