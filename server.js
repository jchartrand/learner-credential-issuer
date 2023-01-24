import { build } from './app.js'
import { getConfig } from "./config.js";

const { port } = getConfig();

const run = async () => {
  const server = await build();
  server.listen(port, () => console.log(`Server is running on port ${port}`))
  /* server.listen(port, '::', (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  }); */
};

run();




