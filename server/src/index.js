require("dotenv").config();

const Koa = require("koa");
const Router = require("koa-router");

const path = require("path");
const serve = require("koa-static");

const { SSR_PORT: port = 4000 } = process.env;
const staticPath = path.join(__dirname, "../../build");
const ssr = require("./ssr");

const app = new Koa();
const router = new Router();

router.use("/", ssr);

app.use(router.routes()).use(router.allowedMethods());
app.use(serve(staticPath));
app.use(ssr);

app.use(router.route);

app.listen(port, () => {
  console.log("listening to port", port);
});
