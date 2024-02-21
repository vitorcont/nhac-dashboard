import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import { useContext } from "react";

import { LabelButton } from "@portal/components";
import { AuthActionEnum, AuthContext } from "@portal/context/auth-provider";
interface FooterProps {
  setOpenLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Footer = (props: FooterProps) => {
  const {
    state: { user },
    dispatch,
  } = useContext(AuthContext);
  const router = useRouter();

  return (
    <footer>
      <nav>
        <IconButton onClick={() => router.push("/")} className="flex  flex-col items-center">
          <HomeIcon color="secondary" fontSize="medium" />
          <p>Lista</p>
        </IconButton>
      </nav>
      {!user ? (
        <LabelButton
          className="primary bold text-lg"
          value="Entrar"
          onClick={() => props.setOpenLogin(true)}></LabelButton>
      ) : (
        <>
          <nav>
            <IconButton onClick={() => router.push("/")} className="flex  flex-col items-center">
              <FavoriteBorderIcon color="secondary" fontSize="medium" />
              <p>Favoritos</p>
            </IconButton>
          </nav>
          <nav>
            <IconButton onClick={() => router.push("/")} className="flex  flex-col items-center">
              <AccountCircleIcon color="secondary" fontSize="medium" />
              <p>Perfi</p>
            </IconButton>
          </nav>
          <nav>
            <IconButton
              onClick={() => {
                dispatch({ type: AuthActionEnum.LOGOUT });
              }}
              className="flex  flex-col items-center">
              <LogoutIcon color="secondary" fontSize="medium" />
              <p>Sair</p>
            </IconButton>
          </nav>
        </>
      )}
    </footer>
  );
};
