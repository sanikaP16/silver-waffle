import { createHandler } from "./src/app.js";

const main = (port) => {
  const entries = [];

  Deno.serve({ port }, createHandler(entries));
};

main(8000);
