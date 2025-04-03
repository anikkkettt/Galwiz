import React, { useContext } from "react";
import userDataContext from "../../store/userData-context";

const ProfileImageTag = () => {
  const userDataCtx = useContext(userDataContext);
  return (
    <img
      src={`/api/v1/user/image/${userDataCtx.userData.photo}`}
      alt=""
      className="fluid w-50 border border-warning"
      style={{
        maxHeight: "200px",
        maxWidth: "200px",
        minHeight: "150px",
        minWidth: "150px",
      }}
    />
  );
};

export default ProfileImageTag;
