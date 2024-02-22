import { useFormik } from "formik";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  Button,
  ModalWrapperProps,
  DefaultSnackbar,
  ResponsiveModal,
  UnderlinedInput,
} from "@portal/components";
import { AuthActionEnum, AuthContext } from "@portal/context/auth-provider";
import { authApi } from "@portal/service/auth.api";
import { userApi } from "@portal/service/user.api";
import { LocalStorageEnum, setLocalKey } from "@portal/utils/local-storage";

export const RegisterModal = (props: ModalWrapperProps) => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [errorSnack, setErrorSnack] = useState(false);
  const [successSnack, setSuccessSnack] = useState(false);

  const formik = useFormik({
    initialValues,
    validate: (values) => {
      const errors: any = {};
      if (!values.name) {
        errors.name = t("UTILS.INPUTS.REQUIRED_FIELD");
      }

      if (!values.email) {
        errors.email = t("UTILS.INPUTS.REQUIRED_FIELD");
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = t("UTILS.INPUTS.EMAIL.ERROR");
      }

      if (values.password.length < 5) {
        errors.passwordSize = t("UTILS.INPUTS.PASSWORD.ERROR_LENGTH");
      }
      if (!/[A-Z]/.test(values.password)) {
        errors.passwordUppercase = t("UTILS.INPUTS.PASSWORD.ERROR_UPPERCASE");
      }
      if (!/[a-z]/.test(values.password)) {
        errors.passwordLowercase = t("UTILS.INPUTS.PASSWORD.ERROR_LOWERCASE");
      }
      if (!/[0-9]/.test(values.password)) {
        errors.passwordNumber = t("UTILS.INPUTS.PASSWORD.ERROR_NUMBER");
      }
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(values.password)) {
        errors.passwordSpecial = t("UTILS.INPUTS.PASSWORD.ERROR_SPECIAL");
      }
      if (values.password !== values.confirmPassword) {
        errors.passwordMatch = t("UTILS.INPUTS.PASSWORD.ERROR_MATCH");
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
      delete (values as any).confirmPassword;
      const userDetais = await userApi.register(values);
      const response = await authApi.login(values);
      setLocalKey(LocalStorageEnum.ACCESS_TOKEN, response.accessToken);
      dispatch({ type: AuthActionEnum.LOGIN, payload: userDetais });
      setSuccessSnack(true);
      props.setOpen(false);
    } catch (err) {
      setErrorSnack(true);
    } finally {
      setLoading(false);
    }
  };

  const passwordErrors = Object.keys(formik.errors)
    .filter((key) => key.includes("password"))
    .map((key) => formik.errors[key as keyof typeof formik.errors]);

  return (
    <>
      <DefaultSnackbar
        open={errorSnack}
        setOpen={setErrorSnack}
        variant="error"
        description={t("UTILS.MODAL.USER_MODAL.ERROR")}
      />
      <DefaultSnackbar
        open={successSnack}
        setOpen={setSuccessSnack}
        variant="success"
        description={t("UTILS.MODAL.USER_MODAL.SUCCESS")}
      />
      <ResponsiveModal
        title={t("UTILS.MODAL.REGISTER.TITLE")}
        description={t("UTILS.MODAL.REGISTER.DESCRIPTION")}
        {...props}>
        <form
          onSubmit={(e) => {
            !loading ? formik.handleSubmit(e) : () => {};
          }}
          className=" mx-6 flex-col items-center">
          <div className="mt-6 w-full">
            <UnderlinedInput
              label={t("UTILS.INPUTS.NAME.LABEL")}
              onChange={formik.handleChange}
              id="name"
              error={!!formik.errors.name}
              helperText={formik.errors.name}
            />
          </div>
          <div className="mt-3 w-full">
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
            />
          </div>
          <div className="mt-3 w-full">
            <UnderlinedInput
              label={t("UTILS.INPUTS.CONFIRM_PASSWORD.LABEL")}
              onChange={formik.handleChange}
              password
              id="confirmPassword"
            />
          </div>
          <div className="mt-2 self-start">
            {passwordErrors.map((error, index) => (
              <li key={index} className="text-sm primary">
                {error}
              </li>
            ))}
          </div>

          <div className="mt-6">
            <Button
              label={t("UTILS.BUTTONS.REGISTER")}
              type="submit"
              disabled={Object.keys(formik.errors).length > 0}
              loading={loading}
            />
          </div>
        </form>
      </ResponsiveModal>
    </>
  );
};
