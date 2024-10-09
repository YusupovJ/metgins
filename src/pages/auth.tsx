import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth";
import { LoginForm } from "@/components/auth/loginForm";
import { RegisterForm } from "@/components/auth/registerForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Auth = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [value, setValue] = useState("login");

  useEffect(() => {
    if (user) {
      navigate("/chat");
    }
  }, [user]);

  return (
    <main className="flex justify-center items-start mt-20">
      <div className="max-w-[400px] w-full bg-background shadow-md rounded-lg">
        <Tabs defaultValue="login" onValueChange={setValue}>
          <TabsList className="w-full">
            <TabsTrigger value="login" className="grow">
              Логин
            </TabsTrigger>
            <TabsTrigger value="register" className="grow">
              Регистрция
            </TabsTrigger>
          </TabsList>
          <h2 className="text-2xl font-bold mt-4 mx-5">{value === "login" ? "Логин" : "Регистрация"}</h2>
          <div className="px-5 pb-5">
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
            <TabsContent value="register">
              <RegisterForm />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </main>
  );
};

export default Auth;
