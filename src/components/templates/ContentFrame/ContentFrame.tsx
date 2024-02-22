"use client";
import { Theme, useMediaQuery } from "@mui/material";
import { useState } from "react";

import { Header, LoginModal, RegisterModal, Footer } from "@portal/components";
import { UserModal } from "@portal/components/modules/UserModal/UserModal";

interface ContentFrameProps {
  children: React.ReactNode;
}

export const ContentFrame = (props: ContentFrameProps) => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openRegistration, setOpenRegistration] = useState(false);

  const downMd = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  return (
    <>
      <Header setOpenProfile={setOpenProfile} setOpenLogin={setOpenLogin} />
      <LoginModal
        open={openLogin}
        setOpen={setOpenLogin}
        onRegister={() => {
          setOpenRegistration(true);
          setOpenLogin(false);
        }}
      />
      <RegisterModal open={openRegistration} setOpen={setOpenRegistration} />
      <UserModal open={openProfile} setOpen={setOpenProfile} />
      {props.children}
      {downMd && <Footer setOpenProfile={setOpenProfile} setOpenLogin={setOpenLogin} />}
    </>
  );
};
