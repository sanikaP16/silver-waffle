const appendTd = (tr, data) => {
  const td = document.createElement("td");
  td.textContent = data;
  tr.appendChild(td);
};

const appendRow = ({ task, status }) => {
  const tr = document.createElement("tr");
  appendTd(tr, task);
  appendTd(tr, status);

  return tr;
};

const appendTask = async () => {
  const response = await fetch("/getTask");
  const tasks = await response.json();
  const tbody = document.getElementById("tbody");
  tbody.textContent = "";

  tasks.forEach((task) => tbody.appendChild(appendRow(task)));
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);

  await fetch("/postTask", {
    method: "POST",
    body: formData,
  });

  appendTask();
  event.target.reset();
};

const main = () => {
  appendTask();
  document.getElementById("form").addEventListener("submit", handleSubmit);
};

globalThis.onload = main;
