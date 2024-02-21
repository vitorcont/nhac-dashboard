import { useFormik } from "formik";
import { useContext, useState } from "react";

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
import { LocalStorageEnum, setLocalKey } from "@portal/utils/local-storage";

interface LoginModalProps extends ModalWrapperProps {
  onRegister: () => void;
}

export const LoginModal = (props: LoginModalProps) => {
  const initialValues = {
    email: "",
    password: "",
  };
  const [loading, setLoading] = useState(false);
  const [errorSnack, setErrorSnack] = useState(false);

  const formik = useFormik({
    initialValues,
    validate: (values) => {
      const errors: any = {};
      if (!values.email) {
        errors.email = "Campo obrigatório";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "E-mail inválido";
      }

      if (values.password.length < 5) {
        errors.password = "Campo obrigatório";
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
      const userDetais = await userApi.getMe(response.accessToken);
      setLocalKey(LocalStorageEnum.ACCESS_TOKEN, response.accessToken);
      dispatch({ type: AuthActionEnum.LOGIN, payload: userDetais });
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
        description="Verifique suas credenciais e tente novamente..."
      />
      <ResponsiveModal {...props}>
        <p className="bold text-lg primary text-center px-8 mt-6">
          Fique por dentro das novidades e promoções de seus restaurantes favoritos
        </p>
        <div className="mt-4 self-center">
          <Button label="Criar minha conta" onPress={() => props.onRegister()} />
        </div>
        <div className="mt-12 flex-row items-center w-full justify-between">
          <hr className="w-2/12" />
          <p className=" primary">Já tenho minha conta</p>
          <hr className="w-2/12" />
        </div>
        <form
          onSubmit={(e) => {
            !loading ? formik.handleSubmit(e) : () => {};
          }}
          className="py-4 mx-8 flex-col items-center">
          <div className="mt-6 w-full">
            <UnderlinedInput
              label="e-mail"
              onChange={formik.handleChange}
              id="email"
              error={!!formik.errors.email}
              helperText={formik.errors.email}
            />
          </div>
          <div className="mt-3 w-full">
            <UnderlinedInput
              label="senha"
              onChange={formik.handleChange}
              password
              id="password"
              error={!!formik.errors.password}
              helperText={formik.errors.password}
            />
          </div>
          <div className="mt-12">
            <Button
              label="Entrar"
              type="submit"
              disabled={!!(formik.errors.email || formik.errors.password)}
              loading={loading}
            />
          </div>
        </form>
      </ResponsiveModal>
    </>
  );
};
