"use client";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { IconButton, Popover, Theme, useMediaQuery } from "@mui/material";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import React from "react";
import { useTranslation } from "react-i18next";

import { LabelButton, SearchBar } from "@portal/components";
import { AuthActionEnum, AuthContext } from "@portal/context/auth-provider";
import { LocalStorageEnum, setLocalKey } from "@portal/utils/local-storage";

interface HeaderProps {
  setOpenLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header = (props: HeaderProps) => {
  const {
    state: { user },
    dispatch,
  } = useContext(AuthContext);
  const { t, i18n } = useTranslation();

  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [anchorElIdioms, setAnchorElIdioms] = useState<HTMLButtonElement | null>(null);

  const downMd = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const open = Boolean(anchorEl);
  const openIdioms = Boolean(anchorElIdioms);
  const idioms = [
    {
      title: "Português",
      value: "pt",
    },
    {
      title: "English",
      value: "en",
    },
    {
      title: "Español",
      value: "es",
    },
  ];

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorElIdioms(null);
  };

  return (
    <>
      <header className="w-full z-20 border-b-2 border-black border-opacity-10 fixed bg-white py-3 px-5 flex flex-row justify-between items-center">
        <nav>
          <h1
            className="flex flex-row primary items-center cursor-pointer"
            onClick={() => router.push("/")}>
            <img src="/ic_logo.svg" alt="logo" className="w-6 h-6" />
            <b className="header-title ml-2 bold primary">Nhac!</b>
          </h1>
        </nav>
        <nav className={"w-7/12"}>
          <SearchBar />
        </nav>
        <nav className="flex-row items-center">
          <nav>
            <IconButton onClick={(e) => setAnchorElIdioms(e.currentTarget)}>
              <img src={`/ic_${i18n.language}.svg`} alt="logo" className="w-5 h-5" />
            </IconButton>
          </nav>
          {!downMd && (
            <div className="pl-3">
              {!user ? (
                <nav>
                  <LabelButton
                    className="primary bold text-lg"
                    value={t("UTILS.BUTTONS.LOGIN")}
                    onClick={() => {
                      props.setOpenLogin(true);
                    }}></LabelButton>
                </nav>
              ) : (
                <div className="flex flex-row">
                  <nav className="mr-2">
                    <IconButton onClick={() => router.push("/favorites")}>
                      <FavoriteBorderIcon color="primary" />
                    </IconButton>
                  </nav>
                  <nav>
                    <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                      <AccountCircleIcon color="primary" />
                    </IconButton>
                  </nav>
                </div>
              )}
            </div>
          )}
        </nav>
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
            <LabelButton
              color="secondary"
              value={t("UTILS.TABBAR.MY_PROFILE")}
              onClick={() => {
                props.setOpenProfile(true);
                handleClose();
              }}
            />
            <hr className="my-2" />
            <LabelButton
              className="bold"
              value={t("UTILS.BUTTONS.EXIT")}
              onClick={() => {
                dispatch({ type: AuthActionEnum.LOGOUT });
                handleClose();
              }}
            />
          </div>
        </Popover>
        <Popover
          open={openIdioms}
          anchorEl={anchorElIdioms}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}>
          <div className="p-3 flex flex-col">
            {idioms.map((idiom, index) => (
              <LabelButton
                key={index}
                value={idiom.title}
                onClick={() => {
                  i18n.changeLanguage(idiom.value);
                  setLocalKey(LocalStorageEnum.LANGUAGE, idiom.value);
                  handleClose();
                }}
              />
            ))}
          </div>
        </Popover>
      </div>
    </>
  );
};
