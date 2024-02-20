"use client";
import { Theme, useMediaQuery } from "@mui/material";
import { useState } from "react";

import { Footer } from "@portal/components/modules/Footer/Footer";
import { Header } from "@portal/components/modules/Header/Header";
import { LoginModal } from "@portal/components/modules/LoginModal/LoginModal";

interface ContentFrameProps {
  children: React.ReactNode;
}

export const ContentFrame = (props: ContentFrameProps) => {
  const [openLogin, setOpenLogin] = useState(false);
  const downMd = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  return (
    <>
      <Header setOpenLogin={setOpenLogin} />
      <LoginModal open={openLogin} setOpen={setOpenLogin} />
      {props.children}
      {downMd && <Footer setOpenLogin={setOpenLogin} />}
    </>
  );
};
