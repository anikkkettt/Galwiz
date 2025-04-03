import React, { useState, useEffect, useRef } from "react";
import Miles from "./Miles";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

const Intern = (props) => {
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

  const [value, setValue] = React.useState("");

  const projectChange = (event) => {
    props.setOutreachyData({
      ...props.qutreachyData,
      [`inter${props.index + 1}`]: {
        ...props.qutreachyData[`inter${props.index + 1}`],
        project: event.target.value,
      },
    });
  };
  const nameChange = (event) => {
    props.setOutreachyData({
      ...props.qutreachyData,
      [`inter${props.index + 1}`]: {
        ...props.qutreachyData[`inter${props.index + 1}`],
        name: event.target.value,
      },
    });
  };
  const organizationChange = (event) => {
    props.setOutreachyData({
      ...props.qutreachyData,
      [`inter${props.index + 1}`]: {
        ...props.qutreachyData[`inter${props.index + 1}`],
        organization: event.target.value,
      },
    });
  };
  const conclusionChange = (event) => {
    props.setOutreachyData({
      ...props.qutreachyData,
      [`inter${props.index + 1}`]: {
        ...props.qutreachyData[`inter${props.index + 1}`],
        conclusion: event.target.value,
      },
    });
  };
  const updateProfileData = async () => {
    try {
      const res = await axios.post(
        `/api/v1/main/outreachy/update/inter${props.index + 1}`,
        {
          name: props.qutreachyData[`inter${props.index + 1}`].name,
          organization:
            props.qutreachyData[`inter${props.index + 1}`].organization,
          project: props.qutreachyData[`inter${props.index + 1}`].project,
          conclusion: props.qutreachyData[`inter${props.index + 1}`].conclusion,
        }
      );
      console.log(res);
      props.getData();
    } catch (error) {}
  };
  const photo = useRef();
  const handlePhotoChange = async () => {
    const formData = new FormData();
    formData.append("image", photo.current.files[0]);
    const imageUploadRes = await axios.post(
      `/api/v1/main/outreachy/update/inter${props.index + 1}/image`,
      formData
    );
    console.log(imageUploadRes);
  };
  const createMileData = async () => {
    try {
      const res = await axios.post(
        `/api/v1/main/outreachy/add/inter${props.index + 1}/mile`,
        {
          htmlData: value,
        }
      );
      console.log(res);
      props.getData();
    } catch (error) {}
  };
  return (
    <div className="">
      <div className="col-md-12 w-100">
        <div className="row d-flex row justify-content-center py-5 px-3 w-100 px-md-0">
          <div className="col-md-4 d-flex justify-content-center  align-items-center mb-md-0 mb-4  ">
            <div className="d-flex flex-column justify-content-center align-items-center gap-2">
              <img
                src={`/api/v1/user/image/${
                  props.qutreachyData[`inter${props.index + 1}`].photo
                }`}
                alt="Profile Pic"
                className="img-fluid "
                style={{ minWidth: "190px", height: "190px" }}
              />
              <label
                variant="secondary"
                for="file-upload"
                className="border border-warning py-1 px-3"
                style={{ backgroundColor: "#B6B6B6", borderRadius: "20px" }}
              >
                Change
              </label>
              <input
                id="file-upload"
                type="file"
                style={{ display: "none" }}
                onChange={handlePhotoChange}
                ref={photo}
              />
            </div>
          </div>

          <div className="col-md-8 row-4 d-flex flex-column justify-content-center">
            <h3>
              Name :{" "}
              <FormControl
                sx={{ width: "60%" }}
                size="normal"
                variant="standard"
              >
                <Input
                  id="standard-adornment-amount"
                  value={props.qutreachyData[`inter${props.index + 1}`].name}
                  onChange={nameChange}
                />
              </FormControl>
            </h3>

            <h3>
              Organization :{" "}
              <FormControl
                sx={{ width: "60%" }}
                size="normal"
                variant="standard"
              >
                <Input
                  id="standard-adornment-amount"
                  value={
                    props.qutreachyData[`inter${props.index + 1}`].organization
                  }
                  onChange={organizationChange}
                />
              </FormControl>
            </h3>
            <h3>
              Project :{" "}
              <FormControl
                sx={{ width: "60%" }}
                size="normal"
                variant="standard"
              >
                <Input
                  id="standard-adornment-amount"
                  value={props.qutreachyData[`inter${props.index + 1}`].project}
                  onChange={projectChange}
                />
              </FormControl>
            </h3>

            <h3>
              Conclusion :{" "}
              <FormControl
                sx={{ width: "60%" }}
                id="standard-textarea"
                label="Multiline Placeholder"
                placeholder="Placeholder"
                multiline
                variant="standard"
              >
                <TextField
                  multiline
                  variant="standard"
                  id="standard-adornment-amount"
                  value={
                    props.qutreachyData[`inter${props.index + 1}`].conclusion
                  }
                  onChange={conclusionChange}
                />
              </FormControl>
            </h3>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center my-3">
          <Button variant="contained" onClick={updateProfileData}>
            Update
          </Button>
        </div>
      </div>

      {props.qutreachyData[`inter${props.index + 1}`].mile.map((val, idx) => (
        <Miles
          mile={val}
          number={idx}
          index={props.index + 1}
          getData={props.getData}
        />
      ))}
      <div
        className="col-md-12 d-flex  justify-content-center p-2 align-content-center my-3 "
        style={{ backgroundColor: "#FFE34F" }}
      >
        <h2>Create Mile</h2>
      </div>
      <div className="d-flex justify-content-center mx-2">
        <SunEditor
          // width="80vw"
          plugin=""
          setContents={value}
          onChange={setValue}
          setOptions={{
            imageGalleryUrl: "/api/v1/main/get/gallery",
            buttonList: [
              ["undo", "redo"],
              ["font", "fontSize"],

              [
                "bold",
                "underline",
                "italic",
                "strike",
                "subscript",
                "superscript",
              ],
              ["fontColor", "hiliteColor"],
              ["align", "list", "lineHeight"],
              ["outdent", "indent"],

              ["table", "horizontalRule"],

              ["imageGallery"], // You must add the "imageGalleryUrl".
              ["fullScreen", "showBlocks", "codeView"],
              ["preview", "print"],
              ["removeFormat"],

              // ['save', 'template'],
              // '/', Line break
            ], // Or Array of button list, eg. [['font', 'align'], ['image']]
            defaultTag: "div",
            minHeight: "300px",
            showPathLabel: false,
            font: sortedFontOptions,
          }}
        />
      </div>
      <div className="d-flex justify-content-center align-items-center my-3">
        <Button variant="contained" onClick={createMileData}>
          Create Mile
        </Button>
      </div>
    </div>
  );
};

export default Intern;
