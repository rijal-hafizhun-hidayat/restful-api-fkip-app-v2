import { web } from "./app/web";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3000;

web.listen(port, () => {
  console.info("app start in port " + port);
});
