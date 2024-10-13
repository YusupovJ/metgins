import { Auth, Chat, NotFound, Users } from "@/pages";
import { IRoutes } from "@/types";

export const routes: IRoutes[] = [
  {
    id: 1,
    path: "/",
    component: <Auth />,
  },
  {
    id: 2,
    path: "*",
    component: <NotFound />,
  },
  {
    id: 3,
    path: "/chat",
    component: <Chat unselected />,
  },
  {
    id: 4,
    path: "/chat/:id",
    component: <Chat />,
  },
  {
    id: 4,
    path: "/users",
    component: <Users />,
  },
];
