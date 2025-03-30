const getSectionIds = (status) =>
  ({
    Pending: "pending-tasks",
    "In-progress": "inprogress-tasks",
    Completed: "completed-tasks",
  }[status]);

const appendTaskToSection = (task, status) => {
  const section = document.getElementById(getSectionIds(status));
  const ul = section.querySelector("ul");
  const li = document.createElement("li");
  li.textContent = task;
  li.classList = "list-items";
  ul.appendChild(li);
};

const appendTask = async () => {
  try {
    const response = await fetch("/getTask");
    if (response.status === 400) throw new Error("Failed to fetch tasks");

    const tasks = await response.json();

    document.querySelectorAll(".list").forEach((ul) => (ul.innerHTML = ""));

    tasks.forEach(({ task, status }) => appendTaskToSection(task, status));
  } catch (err) {
    alert(err.message);
  }
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  try {
    const response = await fetch("/postTask", {
      method: "POST",
      body: formData,
    });

    if (response.status === 400) throw new Error("Failed to add tasks");

    appendTask();
    event.target.reset();
  } catch (error) {
    alert(error.message);
  }
};

const main = () => {
  appendTask();
  document.getElementById("form").addEventListener("submit", handleSubmit);
};

globalThis.onload = main;
