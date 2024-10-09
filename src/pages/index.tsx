import { lazy } from "react";

export const Auth = lazy(() => import("./auth"));
export const Chat = lazy(() => import("./chat"));
export const NotFound = lazy(() => import("./notFound"));
