
const date = new Date();
const options = { weekday: 'long', month: 'long', day: 'numeric' };
const formattedDate = date.toLocaleDateString('en-US', options);
document.getElementById('date').textContent = formattedDate;

const tasks = JSON.parse(localStorage.getItem("task")) || [];
const today = new Date().toISOString().split("T")[0];

let num = document.getElementById('num');
let all_num = document.getElementById('all_num');
let fin = document.getElementById('fin');
let bar = document.getElementById('bar');

let count = 0;
let total = 0;

for (let i = 0; i < tasks.length; i++) {
  let task = tasks[i];
  if (task.due === today) {
    total++;
    if (task.st === "completed") {
      count++;
    }
  }
}
num.innerHTML = count;
all_num.innerHTML = total;

let percent = total > 0 ? (count / total) * 100 : 0;
bar.style.width = percent + "%";
bar.style.backgroundColor = "#1c1d1c";


tasks.forEach((task, index) => {
  if (task.due !== today) return; 

  const completed = task.st === "completed";
  const starred = task.starred === true; 

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
            <p style="color: #ee4a4a;">
              <i class="fa-regular fa-calendar"></i> today
            </p>
          </div>
        </div>
      </div>
      <button class="star" data-index="${index}">
        ${starred ? '<i class="fa-solid fa-star" style="color: #f5e000;"></i>' : ''}
      </button>
    </li>
  `;
});

activateStars();
activateButtons();

function activateStars() {
  const stars = document.querySelectorAll(".star");
  stars.forEach(star => {
    star.addEventListener("click", function () {
      const index = star.getAttribute("data-index");
      const task = tasks[index];
      task.starred = !task.starred;
      star.innerHTML = task.starred
        ? '<i class="fa-solid fa-star" style="color: #f5e000;"></i>'
        : '';
      localStorage.setItem("task", JSON.stringify(tasks));
    });
  });
}

function activateButtons() {
  document.querySelectorAll(".pri").forEach(btn => {
    btn.addEventListener("click", function() {
      const index = btn.getAttribute("data-index");
      const task = tasks[index];
      const title = btn.nextElementSibling.querySelector("h4");

      if (task.st === "completed") {
        task.st = "pending";
        title.style.textDecoration = "none";
        title.style.color = "black";
        btn.style.backgroundColor = "white";
        btn.style.borderColor = "#aaa";
      } else {
        task.st = "completed";
        title.style.textDecoration = "line-through";
        title.style.color = "gray";
        btn.style.backgroundColor = "black";
        btn.style.borderColor = "black";
      }

      localStorage.setItem("task", JSON.stringify(tasks));
      updateProgress();
    });
  });
}

function updateProgress() {
  let done = 0;
  let totalTasks = 0;
  for (let task of tasks) {
    if (task.due === today) {
      totalTasks++;
      if (task.st === "completed") done++;
    }
  }
  num.innerHTML = done;
  all_num.innerHTML = totalTasks;
  let percent = totalTasks > 0 ? (done / totalTasks) * 100 : 0;
  bar.style.width = percent + "%";
}
