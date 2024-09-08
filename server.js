import server from "./index.js";
import { connectToDb } from "./src/config/db.js";
const PORT = process.env.PORT || 3000;
server.listen(PORT, async () => {
  await connectToDb();
  console.log(`server is running at port ${PORT}`);
});
