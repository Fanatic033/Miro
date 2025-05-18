import { AuthLayout } from "@/features/auth/auth.layout.tsx";
import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/model/routes.tsx";
import { LoginForm } from "@/features/auth/login-form.tsx";

function LoginPage() {
  return (
    <AuthLayout
      title={"Вход в систему"}
      description="Введите ваш email и пароль для входа в систему"
      footerText={
        <>
          Нет аккаунта?{" "}
          <Link to={ROUTES.REGISTER}>Зарегестрироваться</Link>{" "}
        </>
      }
      form={<LoginForm />}
    />
  );
}

export const Component = LoginPage;
