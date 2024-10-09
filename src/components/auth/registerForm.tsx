import { registerSchema } from "@/validations/registerSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { onError } from "@/lib/onError";
import { setLocalStorage } from "@/lib/utils";
import { useAuthStore } from "@/store/auth";
import { useSignUp } from "@/hooks/useAuth";
import { IRegisterData } from "@/types";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FileUpload } from "../fileUpload";

export const RegisterForm = () => {
  const form = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      avatar: "",
      password: "",
      username: "",
    },
  });
  const { mutate: signUp } = useSignUp();
  const { setIsAuthenticated } = useAuthStore();

  const onSubmit = (values: IRegisterData) => {
    signUp(values, {
      onSuccess: (data) => {
        setLocalStorage("accessToken", data.accessToken);
        setLocalStorage("refreshToken", data.refreshToken);

        setIsAuthenticated(true);
        toast.success(`Вы успешно зарегистрировались`);
      },
      onError,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имя пользователя</FormLabel>
                <FormControl>
                  <Input placeholder="Ваше имя" {...field} />
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
                  <Input placeholder="Введите пароль" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Аватарка</FormLabel>
                <FormControl>
                  <FileUpload
                    className="w-full"
                    setUrl={(url) => {
                      field.onChange({ target: { value: url } });
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="mt-4 w-full">
          Зарегистрироваться
        </Button>
      </form>
    </Form>
  );
};
