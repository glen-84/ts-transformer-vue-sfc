import Koa from "koa";
import path from "path";
import serve from "koa-static";

const app = new Koa();

app.use(serve(path.join(__dirname, "../../client/public")));

const serverPort = 4275;

app.listen(serverPort);
