"use client";
import { Theme, useMediaQuery } from "@mui/material";
import { useState } from "react";

import { Header, LoginModal, RegisterModal, Footer } from "@portal/components";

interface ContentFrameProps {
  children: React.ReactNode;
}

export const ContentFrame = (props: ContentFrameProps) => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegistration, setOpenRegistration] = useState(false);

  const downMd = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  return (
    <>
      <Header setOpenLogin={setOpenLogin} />
      <LoginModal
        open={openLogin}
        setOpen={setOpenLogin}
        onRegister={() => {
          setOpenRegistration(true);
          setOpenLogin(false);
        }}
      />
      <RegisterModal open={openRegistration} setOpen={setOpenRegistration} />
      {props.children}
      {downMd && <Footer setOpenLogin={setOpenLogin} />}
    </>
  );
};
