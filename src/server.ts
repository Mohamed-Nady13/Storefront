import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import productRoutes from "./handlers/product-handler";
import ordertRoutes from "./handlers/order-handler";
import userRoutes from "./handlers/user-handler";

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

app.use(bodyParser.json());

productRoutes(app);
ordertRoutes(app);
userRoutes(app);

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
