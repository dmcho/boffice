import { ListPage, NotFoundPage } from "pages";

export default [
  {
    name: "Home",
    path: "/",
    exact: true,
    component: ListPage,
    level: 0
  },
  {
    component: NotFoundPage
  }
];
