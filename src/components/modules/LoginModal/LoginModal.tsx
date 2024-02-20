import { useFormik } from "formik";
import { useContext, useState } from "react";

import { Button } from "@portal/components/elements/Button/Button";
import { DefaultSnackbar } from "@portal/components/elements/DefaultSnackbar/DefaultSnackbar";
import {
  ModalWrapper,
  ModalWrapperProps,
} from "@portal/components/elements/ModalWrapper/ModalWrapper";
import { UnderlinedInput } from "@portal/components/elements/UnderlinedInput/UnderlinedInput";
import { AuthActionEnum, AuthContext } from "@portal/context/auth-provider";
import { authApi } from "@portal/service/auth.api";
import { userApi } from "@portal/service/user.api";
import { LocalStorageEnum, setLocalKey } from "@portal/utils/local-storage";

export const LoginModal = (props: ModalWrapperProps) => {
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
      <ModalWrapper {...props}>
        <section className="access-modal">
          <div className="access-modal__logo">
            <h1 className="text-white bold text-5xl">Nhac!</h1>
            <p className="access-modal__logo__description">
              Explore as experiências gastronomicas próximas de você
            </p>
          </div>
          <div className="access-modal__form">
            <p className="bold text-lg primary text-center px-8">
              Fique por dentro das novidades e promoções de seus restaurantes favoritos
            </p>
            <div className="mt-4 self-center">
              <Button label="Criar minha conta" type="submit" />
            </div>
            <div className="mt-12 flex-row items-center w-full justify-between">
              <hr className="w-2/12" />
              <p className=" primary">Já tenho minha conta</p>
              <hr className="w-2/12" />
            </div>
            <form onSubmit={formik.handleSubmit} className="py-4 mx-8 flex-col items-center">
              <UnderlinedInput
                label="e-mail"
                className="mt-6"
                onChange={formik.handleChange}
                id="email"
                error={!!formik.errors.email}
                helperText={formik.errors.email}
              />
              <UnderlinedInput
                label="senha"
                className="mt-5"
                onChange={formik.handleChange}
                password
                id="password"
                error={!!formik.errors.password}
                helperText={formik.errors.password}
              />
              <div className="mt-12">
                <Button label="Entrar" type="submit" loading={loading} />
              </div>
            </form>
          </div>
        </section>
      </ModalWrapper>
    </>
  );
};
