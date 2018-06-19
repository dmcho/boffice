import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter, matchPath } from "react-router";
import { Provider } from "react-redux";
import configure from "store/configure";
import routes from "./routes";
import axios from "axios";
import transit from "transit-immutable-js";

import App from "./App";

const render = async ctx => {
  const { url, origin } = ctx; // 요청에서 URL 을 받아옵니다.

  axios.defaults.baseURL = origin;

  // 요청이 들어올때마다 새 스토어를 만듭니다
  const store = configure();

  const promises = [];

  routes.forEach(route => {
    const match = matchPath(url, route);
    if (!match) return;
    const { component } = route;
    const { preload } = component;
    if (!preload) return;
    const { params } = match;
    const promise = preload(store.dispatch, params);
    promises.push(promise);
  });

  try {
    await Promise.all(promises);
  } catch (e) {}

  // renderToString 은 렌더링된 결과물을 문자열로 만들어줍니다.
  // 서버에서는 BrowserRouter 대신에 StaticRouter 를 사용합니다.
  const html = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </Provider>
  );

  const preloadedState = JSON.stringify(
    transit.toJSON(store.getState())
  ).replace(/</g, "\\u003c");

  return { html, preloadedState };
};

export default render;
