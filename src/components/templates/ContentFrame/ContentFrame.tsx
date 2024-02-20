"use client";
import { useState } from "react";

import { Header } from "@portal/components/modules/Header/Header";
import { LoginModal } from "@portal/components/modules/LoginModal/LoginModal";

interface ContentFrameProps {
  children: React.ReactNode;
}

export const ContentFrame = (props: ContentFrameProps) => {
  const [openLogin, setOpenLogin] = useState(false);
  return (
    <>
      <Header setOpenLogin={setOpenLogin} />
      <LoginModal open={openLogin} setOpen={setOpenLogin} />
      {props.children}
    </>
  );
};
