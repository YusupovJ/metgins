import { useAuthStore } from "@/store/auth";
import { ModalContent, ModalFooter, ModalHeader } from "../ui/modal";
import { ConfirmButton } from "../ui/confirmButton";
import { useLogout } from "@/hooks/useAuth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { delLocalStorage } from "@/lib/utils";
import { useModalStore } from "@/store/modal";
import { Lock, LogOut, UserCircle2 } from "lucide-react";
import { EditProfile } from "../auth/editProfile";
import { EditAvatar } from "../auth/editAvatar";

const UserInfo = () => {
  const { user, setIsAuthenticated, setUser } = useAuthStore();
  const { mutate: logout } = useLogout();
  const { closeModal } = useModalStore();
  const navigate = useNavigate();

  const onLogout = () => {
    logout(null, {
      onSettled: () => {
        delLocalStorage("accessToken", "refreshToken");
        closeModal("userinfo", "logout");
        setIsAuthenticated(false);
        setUser(null);
        toast.success("Вы успешно вышли из аккаунта");
        navigate("/");
      },
    });
  };

  if (!user) return null;

  return (
    <>
      <ModalHeader>
        <h2>Информация о пользователе</h2>
      </ModalHeader>
      <ModalContent>
        <div className="gap-4 flex items-center mb-10">
          <EditAvatar user={user} />
          <h3 className="text-2xl break-all">{user.username}</h3>
        </div>

        <div className="space-y-3">
          <EditProfile
            defaultValue={user.username}
            label="Имя"
            icon={<UserCircle2 strokeWidth="1" size="32" />}
            name="username"
          />
          <EditProfile isPassword label="Пароль" icon={<Lock strokeWidth="1" size="32" />} name="password" />
        </div>
      </ModalContent>
      <ModalFooter>
        <ConfirmButton
          modalName="logout"
          confirmText="Вы точно хотите выйти из аккаунта?"
          variant="secondary"
          className="w-full"
          onClick={onLogout}
        >
          <span>Выйти</span>
          <LogOut className="ml-3" />
        </ConfirmButton>
      </ModalFooter>
    </>
  );
};

export default UserInfo;
