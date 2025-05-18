import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/kit/form";
import { Input } from "@/shared/ui/kit/input";
import { useForm } from "react-hook-form";
import { Button } from "@/shared/ui/kit/button.tsx";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().email("Неверный email или пароль"),
  password: z.string().min(6, "Пароль должен быть не менее 6 символов"),
});

export function LoginForm() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmits = form.handleSubmit((data) => {
    console.log(data);
  });

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
                <Input placeholder="*******" {...field}  type={'password'}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type={"submit"}>Войти</Button>
      </form>
    </Form>
  );
}
