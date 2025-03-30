import _ from "lodash";

const readFile = async (fileName) => await Deno.readFile(`./public${fileName}`);

const getResponse = (page, type) => {
  const headers = { "content-type": type };

  return new Response(page, { headers });
};

const MIMEtype = {
  css: "text/css",
  html: "text/html",
  js: "application/javascript",
};

const filePath = (path) => (path === "/" ? "/index.html" : path);

const extension = (path) => _.last(path.split("."));

const notFound = () => new Response("404 Not Found", { status: 404 });

const getPathDetails = (req) => {
  const path = filePath(req._url.pathname);
  const type = extension(path);

  return [path, type];
};

const serveStatic = async (req) => {
  const [path, type] = getPathDetails(req);

  try {
    const data = await readFile(path);

    return getResponse(data, MIMEtype[type]);
  } catch {
    return notFound(req);
  }
};

export { serveStatic };
