
const tasks = JSON.parse(localStorage.getItem("task")) || [];
const today = new Date();
const todayStr = today.toISOString().split("T")[0];


const finToday = document.getElementById('tod_fin');
const finTomorrow = document.getElementById('to_fin');
const finWeek = document.getElementById('th_fin');
const finOverdue = document.getElementById('ov_fin');

const tod_num = document.getElementById('tod_num');
const to_num = document.getElementById('to_num');
const th_num = document.getElementById('th_num');
const ov_num = document.getElementById('ov_num');
let total=document.getElementById('total');



const startOfWeek = new Date(today);
startOfWeek.setDate(today.getDate() - today.getDay() + 1); 
const endOfWeek = new Date(startOfWeek);
endOfWeek.setDate(startOfWeek.getDate() + 6);
function getDateDiff(dateStr) {
  const taskDate = new Date(dateStr);
  const diff = (taskDate - today) / (1000 * 60 * 60 * 24);
  return Math.floor(diff);
}
tasks.forEach((task, index) => {
  const completed = task.st === "completed";
  const starred = task.starred === true; 
  const taskDate = new Date(task.due);
  const taskDateStr = taskDate.toISOString().split("T")[0];

  let container;
  const options = { day: 'numeric', month: 'short' }; 
  const dateLabel = taskDate.toLocaleDateString('en-US', options);
  if (taskDateStr === todayStr) {
    container = finToday;
  } else if (getDateDiff(task.due) === 1) {
    container = finTomorrow;
  } else if (taskDate > today && taskDate >= startOfWeek && taskDate <= endOfWeek) {
    container = finWeek;
  } else if (taskDate < today) {
    container = finOverdue;
  } else {
    return;
  }
  const dateColor = (taskDate <= today) ? "#ee4a4a" : "black";
  container.innerHTML += `
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
            <p style="color: ${dateColor};">
              <i class="fa-regular fa-calendar"></i> ${dateLabel}
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
tod_num.innerHTML = ` ${finToday.querySelectorAll("li").length}`;
to_num.innerHTML = ` ${finTomorrow.querySelectorAll("li").length}`;
th_num.innerHTML = ` ${finWeek.querySelectorAll("li").length}`;
ov_num.innerHTML = ` ${finOverdue.querySelectorAll("li").length}`;
let count=finOverdue.querySelectorAll("li").length+finWeek.querySelectorAll("li").length+finTomorrow.querySelectorAll("li").length+finToday.querySelectorAll("li").length;
total.innerHTML=`${count} tasks scheduled`
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
    });
  });
}
