import asyncComponent from "lib/asyncComponent";

export const ListPage = asyncComponent(() => import("./ListPage"));
export const NotFoundPage = asyncComponent(() => import("./NotFoundPage"));
