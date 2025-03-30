const extractData = async (req) => {
  const formData = await req.formData();
  const task = formData.get("task");
  const status = formData.get("status");

  if (!task || !status) return null;

  return { task, status };
};

const getTask = (req) => {
  return new Response(JSON.stringify(req.context), {
    headers: { "Content-Type": "application/json" },
  });
};

const postTask = async (req) => {
  const data = await extractData(req);
  if (!data) {
    return new Response("Invalid data", { status: 400 });
  }
  req.context.unshift(data);

  return new Response("added", {
    status: 201,
  });
};

export { getTask, postTask };
