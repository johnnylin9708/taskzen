import * as React from "react";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import SidebarDrawer from "components/SidebarDrawer";

const WorkspacePage: React.FC = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <SidebarDrawer />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default WorkspacePage;
