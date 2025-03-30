import { getTask, postTask } from "./handlers/dynamicPages.js";
import { serveStatic } from "./handlers/staticPages.js";

const handleRoutes = (req) => {
  const GET = { "/getTask": getTask };

  const POST = { "/postTask": postTask };

  const routes = { GET, POST };

  return routes[req.method]?.[req._url.pathname] || serveStatic;
};

export const createHandler = (entries) => {
  return (req) => {
    req._url = new URL(req.url);
    req.context = entries;
    const routeHandler = handleRoutes(req);

    return routeHandler?.(req);
  };
};
