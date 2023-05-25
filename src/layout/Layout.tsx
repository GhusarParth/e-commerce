"use client";
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import React from "react";
import NavigationScroll from "./NavigationScroll";

import themes from "@/themes";
import config from "@/config";
import { store } from "@/redux/store";
import { Provider } from "react-redux";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider
          theme={themes({
            defaultId: "default",
            fontFamily: config.fontFamily,
            borderRadius: config.borderRadius,
          })}
        >
          <CssBaseline />
          <NavigationScroll>
            <>{children}</>
          </NavigationScroll>
        </ThemeProvider>
      </StyledEngineProvider>
    </Provider>
  );
};

export default Layout;
