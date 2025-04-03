import { createContext, useState } from "react";
const userDataContext = createContext({
  _id: "",
  firstName: "",
  lastName: "",
  email: "",
  emailApprove: "",
  userName: "",
  githubUserName: "",
  photo: "",
  auth: false,
});
export function UserDataContextProvider(props) {
  const [userData, setUserData] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    emailApprove: "",
    userName: "",
    githubUserName: "",
    photo: "",
    auth: false,
  });
  const userDataHandler = (user) => {
    setUserData(() => {
      return {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        emailApprove: user.emailApprove,
        userName: user.userName,
        githubUserName: user.githubUserName,
        photo: user.photo,
        auth: true,
      };
    });
  };

  const userDataPhotoHandler = (photo) => {
    setUserData(() => {
      return {
        photo,
        ...userData,
      };
    });
  };

  const authFalse = () => {
    setUserData(() => {
      return {
        _id: "",
        firstName: "",
        lastName: "",
        email: "",
        emailApprove: "",
        userName: "",
        githubUserName: "",
        photo: "",
        auth: false,
      };
    });
  };
  const context = {
    userDataHandler: userDataHandler,
    authFalse: authFalse,
    userData: userData,
    userDataPhotoHandler: userDataPhotoHandler,
  };
  return (
    <userDataContext.Provider value={context}>
      {props.children}
    </userDataContext.Provider>
  );
}

export default userDataContext;
