import { useAuthStore } from "@/store/auth";
import { ModalContent, ModalFooter, ModalHeader } from "../ui/modal";
import { ConfirmButton } from "../ui/confirmButton";
import { useLogout } from "@/hooks/useAuth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { delLocalStorage } from "@/lib/utils";
import { useModalStore } from "@/store/modal";
import { LogOut } from "lucide-react";

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
      <ModalContent className="gap-4 flex flex-col items-center">
        <img src={user.avatar} alt={user.username} className="w-60 h-60 rounded-full object-cover" />
        <h3 className="text-2xl">{user.username}</h3>
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
