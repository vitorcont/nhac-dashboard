"use client";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Button, IconButton, Popover, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import React from "react";

import { LabelButton } from "@portal/components/elements/LabelButton/LabelButton";
import { SearchBar } from "@portal/components/modules/SearchBar/SearchBar";
import { AuthActionEnum, AuthContext } from "@portal/context/auth-provider";

export const Header = () => {
  const {
    state: { user },
    dispatch,
  } = useContext(AuthContext);
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
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
        <nav className="w-7/12">
          <SearchBar />
        </nav>
        <>
          {!user ? (
            <nav>
              <p className="primary bold">Entrar</p>
            </nav>
          ) : (
            <div className="flex flex-row">
              <nav className="mr-2">
                <IconButton onClick={() => router.push("/favorites")}>
                  <FavoriteBorderIcon />
                </IconButton>
              </nav>
              <nav>
                <IconButton onClick={handleClick}>
                  <AccountCircleIcon />
                </IconButton>
              </nav>
            </div>
          )}
        </>
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
            <LabelButton value="Meu Perfil" />
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
