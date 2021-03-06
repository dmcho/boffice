// require("browser-env")();

const render = require("./render").default;
const manifest = require("../../../build/asset-manifest.json");

function buildHtml({ html, preloadedState }) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
    <meta name="theme-color" content="#000000">
    <link rel="manifest" href="/manifest.json">
    <link rel="shortcut icon" href="/favicon.ico">
    <title>React App</title>
    <link href="/static/css/app.339db884.css" rel="stylesheet">
    <link href="/${manifest["app.css"]}" rel="stylesheet">
  </head>
  
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root">${html}</div>
    <script>
      window.__PRELOADED_STATE__ = ${preloadedState}
    </script>
    <script type="text/javascript" src="/${manifest["vendor.js"]}"></script>
    <script type="text/javascript" src="/${manifest["app.js"]}"></script>
  </body>
  
  </html>`;
}

module.exports = async ctx => {
  try {
    const rendered = await render(ctx);
    ctx.body = buildHtml(rendered); // 임시코드; 추후 구`현예정
  } catch (e) {
    ctx.body = buildHtml({});
  }
};
