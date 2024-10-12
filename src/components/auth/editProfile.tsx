import { Check, Edit } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { IUpdateUserData } from "@/types";
import { useUserUpdate } from "@/hooks/useUser";
import { useAuthStore } from "@/store/auth";
import { useMe } from "@/hooks/useAuth";

interface Props {
  defaultValue?: string;
  label?: string;
  isPassword?: boolean;
  icon?: ReactNode;
  name: keyof IUpdateUserData;
}

export const EditProfile: FC<Props> = ({ defaultValue, label, isPassword, icon, name }) => {
  const [disabled, setDisabled] = useState(true);
  const ref = useRef<HTMLInputElement>(null);
  const { mutate: update } = useUserUpdate();
  const { user } = useAuthStore();
  const { refetch } = useMe();

  const handler = () => {
    if (!disabled && user) {
      const value = ref.current?.value;

      update(
        {
          id: user?.id,
          user: { [name]: value },
        },
        {
          onSuccess: () => {
            setDisabled(true);
            refetch();
          },
        }
      );

      return;
    }

    setDisabled(false);
  };

  useEffect(() => {
    if (!disabled) ref.current?.focus();
  }, [disabled]);

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-3 items-center">
        {icon}
        <span>{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <Input
          ref={ref}
          type={isPassword ? "password" : "text"}
          className="bg-background text-base w-[150px] placeholder:text-white text-right disabled:cursor-auto border-t-0 border-x-0 disabled:border-0 p-0 disabled:opacity-100"
          disabled={disabled}
          onKeyDown={(e) => e.key === "Enter" && handler()}
          placeholder={isPassword && disabled ? "••••••••" : ""}
          defaultValue={defaultValue}
        />
        <Button className="p-2 h-fit" variant="secondary" onClick={handler}>
          {disabled ? <Edit size="16" /> : <Check size="16" />}
        </Button>
      </div>
    </div>
  );
};
