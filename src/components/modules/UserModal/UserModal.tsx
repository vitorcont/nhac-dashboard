import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { IconButton } from "@mui/material";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  ModalWrapperProps,
  ResponsiveModal,
  UnderlinedInput,
  DefaultSnackbar,
  Button,
} from "@portal/components";
import { AuthActionEnum, AuthContext } from "@portal/context/auth-provider";
import { userApi } from "@portal/service/user.api";
interface UserModalProps extends ModalWrapperProps {}

export const UserModal = (props: UserModalProps) => {
  const {
    state: { user },
    dispatch,
  } = useContext(AuthContext);
  const { t } = useTranslation();
  const [name, setName] = useState(user?.name ?? "");
  const [errorSnackbar, setErrorSnackbar] = useState(false);
  const [successSnackbar, setSuccessSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setName(user?.name ?? "");
  }, [user?.name]);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const userData = await userApi.update(user?.id ?? "", { name });
      dispatch({ type: AuthActionEnum.LOGIN, payload: userData });
      setSuccessSnackbar(true);
    } catch (err) {
      setErrorSnackbar(true);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DefaultSnackbar
        open={errorSnackbar}
        setOpen={setErrorSnackbar}
        variant="error"
        description={t("UTILS.MODAL.LOGIN.ERROR")}
      />
      <DefaultSnackbar
        open={successSnackbar}
        setOpen={setSuccessSnackbar}
        variant="success"
        description={t("UTILS.MODAL.REGISTER.SUCCESS")}
      />
      <ResponsiveModal {...props}>
        <p className="mt-8 text-2xl bold primary">{t("UTILS.MODAL.USER_MODAL.HELLO")}</p>
        <p className="text-4xl bold primary">{user?.name}</p>
        <p className="mt-4 primary">{t("UTILS.MODAL.USER_MODAL.CHANGE_NAME")}</p>
        <div className="mt-8 self-center w-full">
          <UnderlinedInput
            value={name}
            loading={loading}
            onChange={(e) => setName(e.target.value)}
            label={t("UTILS.INPUTS.NAME.LABEL")}
            EndAdornment={
              <IconButton onClick={() => handleUpdate()}>
                <SaveAltIcon color="primary" />
              </IconButton>
            }
          />
        </div>
        <div className="w-9/12 self-center mt-20">
          <Button
            onPress={() => {
              dispatch({ type: AuthActionEnum.LOGOUT });
              props.setOpen(false);
            }}
            label={t("UTILS.BUTTONS.LOGOUT")}
          />
        </div>
        <div className="w-7/12 self-center mt-6">
          <Button
            onPress={() => {
              props.setOpen(false);
            }}
            label={t("UTILS.BUTTONS.CLOSE")}
            variant="outlined"
          />
        </div>
      </ResponsiveModal>
    </>
  );
};
