import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

export default function CustomSwipeableDrawer({
  children,
  buttonLabel,
  childrenProps,
  ...props
}: any) {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  return (
    <div>
      <React.Fragment>
        <Box
          onClick={() => {
            setOpenDrawer(true);
          }}
        >
          {buttonLabel}
        </Box>
        <SwipeableDrawer
          anchor="right"
          open={openDrawer}
          onClose={() => {
            setOpenDrawer(false);
          }}
          onOpen={() => {
            setOpenDrawer(true);
          }}
          {...props}
        >
          <Box sx={{ width: "450px" }} {...childrenProps}>
            {children({ openDrawer, setOpenDrawer })}
          </Box>
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}
