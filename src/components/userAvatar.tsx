import { FC, useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface Props {
  src: string;
  name: string;
  className?: string;
}

export const UserAvatar: FC<Props> = ({ name, src, className }) => {
  const fallback = useMemo(
    () =>
      name
        .split(" ")
        .slice(0, 2)
        .map((word) => word[0].toUpperCase())
        .reduce((prev, elem) => prev + elem),
    [name]
  );

  return (
    <Avatar className={className}>
      <AvatarImage src={src} alt={fallback} className="object-cover" />
      <AvatarFallback className="bg-accent selection:bg-transparent select-none">{fallback}</AvatarFallback>
    </Avatar>
  );
};
