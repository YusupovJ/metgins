import { ChangeEvent, FC } from "react";
import { UserAvatar } from "../userAvatar";
import { IMe } from "@/types";
import { Button } from "../ui/button";
import { Edit2 } from "lucide-react";
import { fileUpload } from "@/services/fileService";
import { AxiosError } from "axios";
import { onError } from "@/lib/onError";
import { useUserUpdate } from "@/hooks/useUser";
import { useMe } from "@/hooks/useAuth";

interface Props {
  user: IMe;
}

export const EditAvatar: FC<Props> = ({ user }) => {
  const { mutate: update } = useUserUpdate();
  const { refetch } = useMe();

  const onFileSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const { url } = await fileUpload(file);

        update(
          {
            id: user.id,
            user: { avatar: url },
          },
          { onSuccess: () => refetch() }
        );
      } catch (error) {
        if (error instanceof AxiosError) onError(error);
      }
    }
  };

  return (
    <div className="relative">
      <UserAvatar src={user.avatar} name={user.username} className="w-24 h-24 rounded-full object-cover text-5xl" />
      <Button variant="secondary" className="absolute bottom-0 right-0 w-6 h-6 p-1 rounded-full">
        <label htmlFor="select-avatar" className="p-1">
          <Edit2 size="12" />
        </label>
      </Button>
      <input
        id="select-avatar"
        type="file"
        accept="image/*"
        onChange={onFileSelect}
        multiple
        className="fixed top-0 left-0 invisible w-0 h-0 opacity-0"
      />
    </div>
  );
};
