import React from "react";
import { useState, useRef, useEffect } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ImageCard from "./ImageCard";
import TextField from "@mui/material/TextField";
import axios from "axios";
const UploadImageForMile = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [apiData, setApiData] = useState(null);
  const name = useRef(null);
  const tag = useRef(null);
  const alt = useRef(null);

  const getData = async () => {
    try {
      const res = await axios.get(`/api/v1/main/get/gallery`);
      setApiData(res.data.result);
      console.log(res);
    } catch (error) {}
  };

  useEffect(() => {
    getData();
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const handlePhotoChange = async () => {
    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("name", name.current.value);
    formData.append("tag", tag.current.value);
    formData.append("alt", alt.current.value);

    const imageUploadRes = await axios.post(
      `/api/v1/main/create/gallery`,
      formData
    );
    getData();

    // console.log(imageUploadRes);
  };
  // console.log(apiData);

  return (
    <>
      <div className="row m-3">
        <div className="col ">
          <div className="col d-flex justify-content-center">
            {imageUrl && selectedImage && (
              <>
                <img src={imageUrl} alt={selectedImage.name} height="300" />
              </>
            )}
          </div>
          <div className="col d-flex justify-content-center">
            <input
              accept="image/*"
              type="file"
              id="select-image"
              style={{ display: "none" }}
              onChange={(e) => setSelectedImage(e.target.files[0])}
            />

            <label htmlFor="select-image">
              <Button variant="contained" color="primary" component="span">
                Choose Image
              </Button>
            </label>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col d-flex justify-content-center">
          {imageUrl && selectedImage && (
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                inputRef={name}
                id="outlined-basic"
                label="name"
                variant="outlined"
              />
              <TextField
                id="outlined-basic"
                label="alt"
                inputRef={alt}
                name="alt"
                variant="outlined"
              />
              <TextField
                id="outlined-basic"
                label="tag"
                name="tag"
                inputRef={tag}
                variant="outlined"
              />
            </Box>
          )}
        </div>
      </div>
      <div className="col d-flex justify-content-center m-3">
        {imageUrl && selectedImage && (
          <Button variant="contained" onClick={handlePhotoChange}>
            Upload Data
          </Button>
        )}
      </div>

      <div className="row m-2">
        <h2 className="m-3 mb-5">Image Gallery </h2>
        {apiData &&
          apiData.map((item) => {
            return (
              <div className="col-md-3 col-sm-6 col-12 mb-3">
                <ImageCard item={item} key={item._id} />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default UploadImageForMile;
