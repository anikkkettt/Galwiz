// import React from "react";
// import { Modal } from '@mui/material';
// const ShareModal = () => {
//   return <div>ShareModal</div>;
// };

// export default ShareModal;
import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import RedditIcon from "@mui/icons-material/Reddit";

//
export default function ShareModal() {
  const actions = [
    {
      icon: (
        <TwitterIcon
        //   onClick={window.open(
        //     `https://twitter.com/intent/tweet?url=`,
        //     "_blank"
        //   )}
        />
      ),
      name: "Twitter",
    },
    {
      icon: (
        <FacebookIcon
        //   onClick={window.open(
        //     `https://www.facebook.com/sharer.php?u=`,
        //     "_blank"
        //   )}
        />
      ),
      name: "Facebook",
    },
    {
      icon: (
        <RedditIcon
        //   onClick={window.open(`https://www.reddit.com/submit?url=`, "_blank")}
        />
      ),
      name: "Reddit",
    },
    {
      icon: (
        <FileCopyIcon
        //   onClick={() => {
        //     navigator.clipboard.writeText("this.state.textToCopy");
        //   }}
        />
      ),
      name: "Copy",
    },
  ];
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = (e) => {
    if (e === "Twitter") {
      window.open(
        `https://twitter.com/intent/tweet?url=${window.location.href}`,
        "_blank"
      );
    } else if (e === "Facebook") {
      window.open(
        `https://www.facebook.com/sharer.php?href=${window.location.href}`,
        "_blank"
      );
    } else if (e === "Reddit") {
      window.open(
        `https://www.reddit.com/submit?url=${window.location.href}`,
        "_blank"
      );
    } else if (e === "Copy") {
      navigator.clipboard.writeText(window.location.href);
    }
    setOpen(false);
  };

  return (
    <Box sx={{ transform: "translateZ(0px)", flexGrow: 1 }}>
      <SpeedDial
        direction="left"
        ariaLabel="SpeedDial controlled open example"
        sx={{ position: "absolute", bottom: 0, right: 16 }}
        icon={<ShareIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => handleClose(action.name)}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
