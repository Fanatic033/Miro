import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/kit/form.tsx";
import { Input } from "@/shared/ui/kit/input.tsx";
import { useForm } from "react-hook-form";
import { Button } from "@/shared/ui/kit/button.tsx";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@/features/auth/model/use-login.ts";

const loginSchema = z.object({
  email: z.string().email("Неверный email или пароль"),
  password: z.string().min(6, "Пароль должен быть не менее 6 символов"),
});

export function LoginForm() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { isPending, errorMessage, login } = useLogin();

  const onSubmits = form.handleSubmit(login);

  return (
    <Form {...form}>
      <form className={"flex flex-col gap-4"} onSubmit={onSubmits}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input placeholder="*******" {...field} type={"password"} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {errorMessage && (
          <FormMessage className={'text-destructive text-sm'}>{errorMessage}</FormMessage>
        )}
        <Button type={"submit"} disabled={isPending}>
          Войти
        </Button>
      </form>
    </Form>
  );
}
