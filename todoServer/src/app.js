import { getComment, postComment } from "./handlers/dynamicPages.js";
import { serveStatic } from "./handlers/staticPages.js";

const handleRoutes = (req) => {
  const GET = { "/getComment": getComment };

  const POST = { "/postComment": postComment };

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
