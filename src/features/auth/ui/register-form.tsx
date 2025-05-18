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
import { useRegister } from "@/features/auth/model/use-register.ts";

const registerSchema = z
  .object({
    email: z.string().email("Неверный email или пароль"),
    password: z.string().min(6, "Пароль должен быть не менее 6 символов"),
    confirmPassword: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Пароли не совпадают",
  });

export function RegisterForm() {
  const form = useForm({
    resolver: zodResolver(registerSchema),
  });

  const { isPending, errorMessage, register } = useRegister();

  const onSubmits = form.handleSubmit(register);

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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Подтвердите Пароль</FormLabel>
              <FormControl>
                <Input {...field} type={"password"} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {errorMessage && (
          <FormMessage className={"text-destructive text-sm"}>
            {errorMessage}
          </FormMessage>
        )}
        <Button type={"submit"} disabled={isPending}>
          Зарегестрироваться
        </Button>
      </form>
    </Form>
  );
}
