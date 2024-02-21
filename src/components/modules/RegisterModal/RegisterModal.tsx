import { useFormik } from "formik";
import { useContext, useState } from "react";

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
  const [loading, setLoading] = useState(false);
  const [errorSnack, setErrorSnack] = useState(false);
  const [successSnack, setSuccessSnack] = useState(false);

  const formik = useFormik({
    initialValues,
    validate: (values) => {
      const errors: any = {};
      if (!values.name) {
        errors.name = "Campo obrigatório";
      }

      if (!values.email) {
        errors.email = "Campo obrigatório";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "E-mail inválido";
      }

      if (values.password.length < 5) {
        errors.passwordSize = "A senha deve conter no mínimo 5 caracteres";
      }
      if (!/[A-Z]/.test(values.password)) {
        errors.passwordUppercase = "A senha deve conter pelo menos uma letra maiúscula";
      }
      if (!/[a-z]/.test(values.password)) {
        errors.passwordLowercase = "A senha deve conter pelo menos uma letra minuscula";
      }
      if (!/[0-9]/.test(values.password)) {
        errors.passwordNumber = "A senha deve conter pelo menos um número";
      }
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(values.password)) {
        errors.passwordSpecial = "A senha deve conter pelo menos um caractere especial";
      }
      if (values.password !== values.confirmPassword) {
        errors.passwordMatch = "As senhas não conferem";
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
        description="Verifique suas credenciais e tente novamente..."
      />
      <DefaultSnackbar
        open={successSnack}
        setOpen={setSuccessSnack}
        variant="success"
        description="Usuário cadastrado com sucesso!"
      />
      <ResponsiveModal
        title="Cadastro"
        description="Preencha os campos para se cadastrar"
        {...props}>
        <form
          onSubmit={(e) => {
            !loading ? formik.handleSubmit(e) : () => {};
          }}
          className=" mx-6 flex-col items-center">
          <UnderlinedInput
            label="Nome completo"
            className="mt-6"
            onChange={formik.handleChange}
            id="name"
            error={!!formik.errors.name}
            helperText={formik.errors.name}
          />
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
          />
          <UnderlinedInput
            label="confirmar senha"
            className="mt-5"
            onChange={formik.handleChange}
            password
            id="confirmPassword"
          />
          <div className="mt-2 self-start">
            {passwordErrors.map((error, index) => (
              <li key={index} className="text-sm primary">
                {error}
              </li>
            ))}
          </div>

          <div className="mt-6">
            <Button
              label="Cadastrar"
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
