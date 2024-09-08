import server from "./index.js";
import { connectToDb } from "./src/config/db.js";

server.listen(process.env.PORT ?? 4000, async () => {
  await connectToDb();
  console.log("server is listening on port 4000");
});
