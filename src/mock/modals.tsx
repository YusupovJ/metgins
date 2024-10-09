import { IModalList } from "@/types";
import { NewChat, UserInfo } from "@/components/modals";

export const modalsList: IModalList[] = [
  {
    id: 2,
    component: <NewChat />,
    props: {
      name: "newchat",
    },
  },
  {
    id: 4,
    component: <UserInfo />,
    props: {
      name: "userinfo",
    },
  },
];
