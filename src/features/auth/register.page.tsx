import { AuthLayout } from "@/features/auth/auth.layout.tsx";
import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/model/routes.tsx";

function RegisterPage() {
  return (
    <AuthLayout
      title={"Регистрация"}
      description="Введите ваш email и пароль для регистрации в системе"
      footerText={
        <>
          Уже есть аккаунт?
          <Link to={ROUTES.LOGIN}>Войти</Link>
        </>
      }
      form={<form action=""></form>}
    />
  );
}

export const Component = RegisterPage;
