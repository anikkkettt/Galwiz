import React, { useState, useRef } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import SunEditor from "suneditor-react";
import Button from "@mui/material/Button";

import "suneditor/dist/css/suneditor.min.css";
import axios from "axios";
import topicData from "../reUsableComponent/TopicData";
import SnackbarComponent from "../reUsableComponent/SnackbarComponent";
import Loader from "../reUsableComponent/Loader";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import TagFacesIcon from "@mui/icons-material/TagFaces";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

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
const UseCase = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [isLoader, setIsLoader] = useState(false);
  const [visibilityChip, setVisibilityChip] = useState("none");
  const [valData, setValData] = useState({
    title: "",
    topic: "",
    subTopic: "",
  });

  const forValidate = (e) => {
    const { name, value } = e.target;
    setValData({ ...valData, [name]: value });
  };

  const [chip, setChip] = useState([]);

  const [invite, setInvite] = useState("");

  const [valueOfSunEditor, setValueOfSunEditor] = useState("");
  const handleImageUploadBefore = (files, info) => {
    // uploadHandler is a function
  };
  const [subTopicData, setSubTopicData] = useState([]);
  const topicSelectHandler = async (event) => {
    subTopic.current.value = "";
    setSubTopicData(topicData[topic.current.value].subtopic);
  };

  const title = useRef(null);
  const repoLink = useRef(null);
  const workflowLink = useRef(null);
  const historyLink = useRef(null);
  const notebookLink = useRef(null);
  const photo = useRef(null);

  const subTopic = useRef(null);
  const topic = useRef(null);
  const invForDiscussion = useRef(null);
  const submitHandler = async () => {
    // console.log(valData);
    // // topic: topicData[topic.current.value].topic;
    // // subTopic: subTopic.current.value;
    // // description: valueOfSunEditor;

    // if(valData.title==='shviam')
    // { console.log(valData);
    //   console.log("true hai");
    // }

    try {
      setIsLoader(true);

      const res = await axios.post("/api/v1/user/create/useCase", {
        title: title.current.value,
        topic: topicData[topic.current.value].topic,
        subTopic: subTopic.current.value,
        description: valueOfSunEditor,
        workflowLink: workflowLink.current.value,
        historyLink: historyLink.current.value,
        repoLink: repoLink.current.value,
        notebookLink: notebookLink.current.value,
        invForDiscussion: chip,
      });

      const formData = new FormData();
      formData.append("image", photo.current.files[0]);
      const imageUploadRes = await axios.patch(
        `/api/v1/user/create/useCase/${res.data.useCase._id}`,
        formData
      );
      setIsLoader(false);

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
  const inviteGet = (e) => {
    setInvite(e.target.value);
  };
  const setStateInvite = (data) => {
    setChip(() => [...chip, data]);
  };

  const handleInvite = (e) => {
    if (e.key === "Enter") {
      if (invite.length > 0) {
        setStateInvite(invite);
        setInvite("");
      }

      e.preventDefault();
    }
  };

  const handleDelete = (chipToDelete) => () => {
    // setChip((oldValue)=>{return oldValue.pull(oldValue[chipToDelete])});
    setChip((products) =>
      products.filter((_, index) => index !== chipToDelete)
    );
  };

  return (
    <div className="m-3 pb-5 mt-5 rounded shadow bg-body">
      <SnackbarComponent
        message={message}
        severity={severity}
        open={openSnackbar}
        setOpen={setOpenSnackbar}
      />
      <Loader open={isLoader} setOpen={setIsLoader} />
      <div className="row mt-3">
        <div className="col-md-6 col-12 ">
          <div className="row">
            <Form noValidate>
              <Form.Group
                as={Row}
                className=" d-flex justify-content-evenly m-2 "
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="3 ">
                  Tittle:
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    required
                    type="text"
                    name="title"
                    className="shadow"
                    placeholder="Tittle"
                    onChange={forValidate}
                    ref={title}
                  />
                </Col>
              </Form.Group>
            </Form>
            <Form>
              <Form.Group
                as={Row}
                className="d-flex justify-content-evenly m-2"
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="3">
                  Select Image:
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    required
                    type="file"
                    className="shadow"
                    accept="image/*"
                    ref={photo}
                  />
                </Col>
              </Form.Group>
            </Form>
          </div>
        </div>

        <div className="col-md-6 col-12">
          <div className="row">
            <div className=" col-12">
              <Form>
                <Form.Group
                  as={Row}
                  className="d-flex justify-content-evenly m-2"
                  controlId="formPlaintextPassword"
                >
                  <Form.Label column sm="3">
                    Select Topic :
                  </Form.Label>
                  <Col sm="7">
                    <Form.Select
                      className="shadow"
                      name="topic"
                      ref={topic}
                      onChange={() => {
                        topicSelectHandler();
                        forValidate();
                      }}
                    >
                      <option>Select Topic</option>
                      {topicData.map((item, key) => (
                        <option value={key}>{item.topic}</option>
                      ))}
                    </Form.Select>
                  </Col>
                </Form.Group>
              </Form>
            </div>
            <div className=" col-12">
              <Form>
                <Form.Group
                  as={Row}
                  className="d-flex justify-content-evenly m-2"
                  controlId="formPlaintextPassword"
                >
                  <Form.Label column sm="3">
                    Select Sub_topic :
                  </Form.Label>
                  <Col sm="7">
                    <Form.Select
                      className="shadow"
                      ref={subTopic}
                      name="subTopic"
                    >
                      <option>Select Sub Topic</option>

                      {subTopicData.map((item, key) => (
                        <option value={item}>{item}</option>
                      ))}
                    </Form.Select>
                  </Col>
                </Form.Group>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col mt-2 d-flex justify-content-center  ">
          {" "}
          <h5 className="border-bottom border-success border-2">
            Description :
          </h5>{" "}
        </div>

        <div className="col-12 d-flex justify-content-center ">
          <SunEditor
            width="90%"
            setContents={valueOfSunEditor}
            onChange={setValueOfSunEditor}
            onImageUpload={handleImageUploadBefore}
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

                ["table", "horizontalRule", "link"],
              ],
              defaultTag: "div",
              minHeight: "300px",
              showPathLabel: false,
              font: sortedFontOptions,
            }}
          />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-6 col-12 ">
          <div className="row">
            <Form noValidate>
              <Form.Group
                as={Row}
                className=" d-flex justify-content-evenly m-2"
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="3">
                  Workflow link:
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    required
                    type="url"
                    className="shadow"
                    placeholder="Workflow link"
                    ref={workflowLink}
                  />
                </Col>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid city.
                </Form.Control.Feedback>
              </Form.Group>
            </Form>

            <Form>
              <Form.Group
                as={Row}
                className="d-flex justify-content-evenly m-2 "
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="3">
                  History link:
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    type="url"
                    className="shadow"
                    placeholder="History link"
                    ref={historyLink}
                  />
                </Col>
              </Form.Group>
            </Form>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="row">
            <Form>
              <Form.Group
                as={Row}
                className="d-flex justify-content-evenly m-2 "
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="3">
                  Relevant Notebook link:
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    type="url"
                    className="shadow"
                    placeholder="Relevant Notebook link"
                    ref={notebookLink}
                  />
                </Col>
              </Form.Group>
            </Form>

            <Form>
              <Form.Group
                as={Row}
                className="d-flex justify-content-evenly m-2 "
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="3">
                  Github repo/link:
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    type="url"
                    className="shadow"
                    placeholder="Github repo/link"
                    ref={repoLink}
                  />
                </Col>
              </Form.Group>
            </Form>
          </div>
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-md-12">
          <Form>
            <Form.Group
              as={Row}
              className="d-flex justify-content-evenly m-2"
              controlId="formPlaintextPassword"
            >
              <Form.Label column sm="3">
                Invite For Discussion :
              </Form.Label>
              <Col sm="7">
                <Form.Control
                  type="text"
                  className="shadow"
                  onChange={inviteGet}
                  onKeyPress={handleInvite}
                  placeholder="Invite For Discussion "
                  // ref={invForDiscussion}
                  value={invite}
                />
                <div
                  className="row"
                  style={{ display: `${chip.length > 0 ? "block" : "none"}` }}
                >
                  <div className="col">
                    <Paper
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        flexWrap: "wrap",
                        listStyle: "none",
                        p: 0.5,
                        m: 0,
                      }}
                      component="ul"
                    >
                      {chip.map((data, i) => {
                        let icon;

                        return (
                          <ListItem key={i}>
                            <Chip
                              icon={icon}
                              label={chip[i]}
                              onDelete={handleDelete(i)}
                            />
                          </ListItem>
                        );
                      })}
                    </Paper>
                  </div>
                </div>
              </Col>
            </Form.Group>
          </Form>
        </div>
        <div className="col-md-12 mt-4">
          <div className="row ">
            <div className="col d-flex justify-content-center ">
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
    </div>
  );
};

export default UseCase;
