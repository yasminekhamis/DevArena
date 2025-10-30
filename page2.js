const tasks = JSON.parse(localStorage.getItem("task")) || [];
let nu = document.getElementById('nu');
let all_nu = document.getElementById('all_nu');
let process = document.getElementById("process");
let fin = document.getElementById("fin");
function renderStarredTasks() {
  fin.innerHTML = "";
  let count = 0;
  let total = 0;

  tasks.forEach((task, index) => {
    if (!task.starred) return; 

    total += 1;
    if (task.st === "completed") count++;

    const completed = task.st === "completed";

    fin.innerHTML += `
      <li>
        <div class="fin">
          <button class="pri" data-index="${index}"
            style="background-color:${completed ? 'black' : 'white'};
                   border-color:${completed ? 'black' : '#aaa'}"></button>
          <div>
            <h4 style="text-decoration:${completed ? 'line-through' : 'none'};
                       color:${completed ? 'gray' : 'black'};">
              ${task.title}
            </h4>
            <div id="work">
              <p id="t">${task.tag}</p>
              <p style="color: ${isTodayOrPast(task.due) ? '#ee4a4a' : '#000'};">
                <i class="fa-regular fa-calendar"></i> ${formatDate(task.due)}
              </p>
            </div>
          </div>
        </div>
        <button class="star" data-index="${index}">
          ${task.starred ? '<i class="fa-solid fa-star" style="color:#f5e000;"></i>' : ''}
        </button>
      </li>
    `;
  });
  nu.innerHTML = count;
  all_nu.innerHTML = total;
  process.innerHTML = `${total} tasks starred`; 

  activateStars();
  activateCompleteButtons();
}
function activateStars() {
  const stars = document.querySelectorAll(".star");
  stars.forEach((star) => {
    star.onclick = function () {
      const index = parseInt(this.getAttribute("data-index"), 10);
      if (!Number.isFinite(index) || !tasks[index]) return;

      tasks[index].starred = !tasks[index].starred;
      localStorage.setItem("task", JSON.stringify(tasks));
      renderStarredTasks();
    };
  });
}

function activateCompleteButtons() {
  document.querySelectorAll(".pri").forEach((btn) => {
    btn.onclick = function () {
      const index = parseInt(this.getAttribute("data-index"), 10);
      if (!Number.isFinite(index) || !tasks[index]) return;

      const task = tasks[index];
      task.st = (task.st === "completed") ? "pending" : "completed";
      localStorage.setItem("task", JSON.stringify(tasks));
      renderStarredTasks();
    };
  });
}

function formatDate(dateString) {
  if (!dateString) return "No date";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { day: "numeric", month: "long" });
}
function isTodayOrPast(dateString) {
  if (!dateString) return false;
  const today = new Date();
  const taskDate = new Date(dateString);
  today.setHours(0, 0, 0, 0);
  taskDate.setHours(0, 0, 0, 0);
  return taskDate <= today;
}
renderStarredTasks();
