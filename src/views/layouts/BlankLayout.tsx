import { Box, BoxProps, styled } from "@mui/material";
import { NextPage } from "next";
import React from "react";

type TProps = {
  children: React.ReactNode
}

const BlankLayoutWrap = styled(Box)<BoxProps>(({theme}) => ({
  height: "100vh"
}))

const BlankLayout:NextPage<TProps> =({children}) => {
  return (
    <BlankLayoutWrap>
        <Box>{children}</Box>
    </BlankLayoutWrap>

  )
}
export default BlankLayout;