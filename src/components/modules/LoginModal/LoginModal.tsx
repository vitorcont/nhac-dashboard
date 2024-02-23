import { useFormik } from "formik";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  ModalWrapperProps,
  ResponsiveModal,
  UnderlinedInput,
  DefaultSnackbar,
  Button,
} from "@portal/components";
import { AuthActionEnum, AuthContext } from "@portal/context/auth-provider";
import { authApi } from "@portal/service/auth.api";
import { userApi } from "@portal/service/user.api";
import { LocalStorageEnum, clearLocalStorage, setLocalKey } from "@portal/utils/local-storage";

interface LoginModalProps extends ModalWrapperProps {
  onRegister: () => void;
}

export const LoginModal = (props: LoginModalProps) => {
  const initialValues = {
    email: "",
    password: "",
  };
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [errorSnack, setErrorSnack] = useState(false);

  const formik = useFormik({
    initialValues,
    validate: (values) => {
      const errors: any = {};
      if (!values.email) {
        errors.email = t("UTILS.INPUTS.REQUIRED_FIELD");
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = t("UTILS.INPUTS.EMAIL.ERROR");
      }

      if (values.password.length < 5) {
        errors.password = t("UTILS.INPUTS.REQUIRED_FIELD");
      }

      return errors;
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  const { dispatch } = useContext(AuthContext);

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      setLoading(true);
      const response = await authApi.login(values);
      clearLocalStorage();
      const userDetais = await userApi.getMe(response.accessToken);
      setLocalKey(LocalStorageEnum.ACCESS_TOKEN, response.accessToken);
      dispatch({
        type: AuthActionEnum.LOGIN,
        payload: userDetais,
      });
      props.setOpen(false);
    } catch (err) {
      setErrorSnack(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DefaultSnackbar
        open={errorSnack}
        setOpen={setErrorSnack}
        variant="error"
        description={t("UTILS.MODAL.LOGIN.ERROR")}
      />
      <ResponsiveModal {...props}>
        <p className="login-modal__description">{t("UTILS.MODAL.LOGIN.TITLE")}</p>
        <div className="mt-4 self-center">
          <Button label={t("UTILS.BUTTONS.CREATE_NEW")} onPress={() => props.onRegister()} />
        </div>
        <div className="login-modal__line-wrapper">
          <hr className="w-2/12" />
          <p className=" primary">{t("UTILS.MODAL.LOGIN.REGISTERED")}</p>
          <hr className="w-2/12" />
        </div>
        <form
          onSubmit={(e) => {
            !loading ? formik.handleSubmit(e) : () => {};
          }}
          className="login-modal__form">
          <div className="mt-6 w-full">
            <UnderlinedInput
              label={t("UTILS.INPUTS.EMAIL.LABEL")}
              onChange={formik.handleChange}
              id="email"
              error={!!formik.errors.email}
              helperText={formik.errors.email}
            />
          </div>
          <div className="mt-3 w-full">
            <UnderlinedInput
              label={t("UTILS.INPUTS.PASSWORD.LABEL")}
              onChange={formik.handleChange}
              password
              id="password"
              error={!!formik.errors.password}
              helperText={formik.errors.password}
            />
          </div>
          <div className="login-modal__form__submit">
            <Button
              label={t("UTILS.BUTTONS.LOGIN")}
              type="submit"
              disabled={!!(formik.errors.email || formik.errors.password)}
              loading={loading}
            />
          </div>
          <div className="login-modal__form__close">
            <Button
              onPress={() => {
                props.setOpen(false);
              }}
              variant="outlined"
              label={t("UTILS.BUTTONS.CLOSE")}
              type="reset"
            />
          </div>
        </form>
      </ResponsiveModal>
    </>
  );
};
