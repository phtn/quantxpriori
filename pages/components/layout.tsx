"use client";
import { Box } from "./box";

export const Layout = ({ children }) => {
  return (
    <Box
      css={{
        maxW: "100%",
      }}
    >
      {children}
    </Box>
  );
};
