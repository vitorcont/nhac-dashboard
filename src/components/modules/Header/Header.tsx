"use client";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Grid, IconButton, Modal, Popover, Theme, Typography, useMediaQuery } from "@mui/material";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import React from "react";

import { Button } from "@portal/components/elements/Button/Button";
import { LabelButton } from "@portal/components/elements/LabelButton/LabelButton";
import { ModalWrapper } from "@portal/components/elements/ModalWrapper/ModalWrapper";
import { UnderlinedInput } from "@portal/components/elements/UnderlinedInput/UnderlinedInput";
import { LoginModal } from "@portal/components/modules/LoginModal/LoginModal";
import { SearchBar } from "@portal/components/modules/SearchBar/SearchBar";
import { AuthActionEnum, AuthContext } from "@portal/context/auth-provider";

interface HeaderProps {
  setOpenLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header = (props: HeaderProps) => {
  const {
    state: { user },
    dispatch,
  } = useContext(AuthContext);
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const downMd = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <header className="w-full z-20 border-b-2 border-black border-opacity-10 fixed bg-white py-3 px-5 flex flex-row justify-between items-center">
        <nav>
          <h1
            className="flex flex-row primary items-center cursor-pointer"
            onClick={() => router.push("/")}>
            <img src="/ic_logo.svg" alt="logo" className="w-6 h-6" />
            <b className="text-3xl ml-2 bold primary">Nhac!</b>
          </h1>
        </nav>
        <nav className={"w-7/12"}>
          <SearchBar />
        </nav>
        {!downMd && (
          <>
            {!user ? (
              <nav>
                <LabelButton
                  className="primary bold text-lg"
                  value="Entrar"
                  onClick={() => props.setOpenLogin(true)}></LabelButton>
              </nav>
            ) : (
              <div className="flex flex-row">
                <nav className="mr-2">
                  <IconButton onClick={() => router.push("/favorites")}>
                    <FavoriteBorderIcon color="primary" />
                  </IconButton>
                </nav>
                <nav>
                  <IconButton onClick={handleClick}>
                    <AccountCircleIcon color="primary" />
                  </IconButton>
                </nav>
              </div>
            )}
          </>
        )}
      </header>
      <div>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}>
          <div className="p-3">
            <LabelButton color="secondary" value="Meu Perfil" />
            <hr className="my-2" />
            <LabelButton
              className="bold"
              value="Sair"
              onClick={() => {
                dispatch({ type: AuthActionEnum.LOGOUT });
                handleClose();
              }}
            />
          </div>
        </Popover>
      </div>
    </>
  );
};
