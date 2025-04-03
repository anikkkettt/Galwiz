import React, { useRef, useState, useEffect, useContext } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import userDataContext from "../../store/userData-context";
import ProfileImageTag from "./ProfileImageTag";
import "./Modal.css";
import CloseIcon from "@mui/icons-material/Close";

const MyProfile = ({
  showMyProfile,
  setShowMyProfile,
  profilePhoto,
  setProfilePhoto,
}) => {
  const userDataCtx = useContext(userDataContext);

  const handleClose = () => {
    setShowMyProfile(false);
  };

  const photo = useRef();
  // const lastName = useRef("userDataCtx.userData.lastName");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    setImage(userDataCtx.userData.photo);
    setLastName(userDataCtx.userData.lastName);
    setFirstName(userDataCtx.userData.firstName);
  }, [
    userDataCtx.userData.lastName,
    userDataCtx.userData.firstName,
    userDataCtx.userData.photo,
  ]);

  const handleChange = async () => {
    const formData = new FormData();
    formData.append("image", photo.current.files[0]);
    const imageUploadRes = await axios.post(
      `/api/v1/user/profile/update/photo`,
      formData
    );
    userDataCtx.userDataPhotoHandler(imageUploadRes.data.photo);
    setProfilePhoto(true);
    setShowMyProfile(false);
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    const res = await axios.post(`/api/v1/user/profile/update/name`, {
      firstName: firstName,
      lastName: lastName,
    });
    userDataCtx.userDataHandler(res.data.user);
    setProfilePhoto(true);
    setShowMyProfile(false);
  };

  return (
    <>
      <Modal
        show={showMyProfile}
        onHide={handleClose}
        sz="xl"
        style={{ position: "fixed" }}
        centered
      >
        <Modal.Body className="w-100" style={{ backgroundColor: "#D9D9D9" }}>
          <div className="d-flex justify-content-center align-items-center">
            <Modal.Header>
              <CloseIcon
                onClick={handleClose}
                sx={{ position: "absolute", right: "15px", top: "15px" }}
              />
              <div>
                <h2 style={{ fontWeight: "bolder" }}>Update your profile</h2>
              </div>
            </Modal.Header>
          </div>
          <div className="d-flex justify-content-center align-items-center flex-column ">
            <div className="d-flex flex-column justify-content-center align-items-center gap-2">
              <ProfileImageTag image={image} />
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
                onChange={handleChange}
                ref={photo}
              />
            </div>
            <Form className="p-2" onSubmit={updateProfile}>
              <Form.Group className="" controlId="formBasicText">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  className="input"
                  type="text"
                  placeholder="Enter First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="" controlId="formBasicText">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  className="input"
                  type="text"
                  placeholder="Enter Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Group>
              <div className="d-flex justify-content-center mt-2 align-items-center">
                <Button
                  variant="secondary"
                  style={{ backgroundColor: "#12182D", color: "white" }}
                  type="submit"
                >
                  Update
                </Button>
              </div>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MyProfile;
