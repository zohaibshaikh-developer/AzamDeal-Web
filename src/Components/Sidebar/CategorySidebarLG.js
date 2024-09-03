import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Sidebar from "./Sidebar";
import { HiMenuAlt2 } from "react-icons/hi";
import { useState } from "react";
import { IoMdArrowDropright } from "react-icons/io";

const SidebarToggle = () => {
  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Sidebar />
      </List>
    </Box>
  );

  return (
    <div>
      <div>
        {["right"].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button onClick={toggleDrawer(anchor, true)}>
              {/* <HiMenuAlt2 className="w-6 h-6 drop-shadow-xl text-black" /> */}
              <h1 className="text-black font-semibold underline capitalize flex items-center">
                <span>All</span>
                <IoMdArrowDropright />
              </h1>
            </Button>
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default SidebarToggle;
