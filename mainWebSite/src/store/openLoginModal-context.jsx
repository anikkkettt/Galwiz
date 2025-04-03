import { createContext, useState } from "react";
const LoginModalContext = createContext(false);
export function LoginModalContextProvider(props) {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const openLoginModal = () => {
    setLoginModalOpen(() => {
      return true;
    });
  };
  const closeLoginModal = () => {
    setLoginModalOpen(() => {
      return false;
    });
  };
  const context = {
    loginModalOpen: loginModalOpen,
    openLoginModal: openLoginModal,
    closeLoginModal: closeLoginModal,
  };
  return (
    <LoginModalContext.Provider value={context}>
      {props.children}
    </LoginModalContext.Provider>
  );
}

export default LoginModalContext;
