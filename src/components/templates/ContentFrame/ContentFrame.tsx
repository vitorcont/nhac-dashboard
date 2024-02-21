"use client";
import { Theme, useMediaQuery } from "@mui/material";
import { useState } from "react";

import { Footer } from "@portal/components/modules/Footer/Footer";
import { Header } from "@portal/components/modules/Header/Header";
import { LoginModal } from "@portal/components/modules/LoginModal/LoginModal";
import { RegisterModal } from "@portal/components/modules/RegisterModal/RegisterModal";

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
