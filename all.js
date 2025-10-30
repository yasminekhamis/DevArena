document.addEventListener("DOMContentLoaded", () => {
  const tasks = JSON.parse(localStorage.getItem("task")) || [];

  const workList = document.getElementById("work_fin");
  const personalList = document.getElementById("pers_fin");
  const workNum = document.getElementById("work_num");
  const persNum = document.getElementById("pers_num");
  const total = document.getElementById("total");

  const allBtn = document.getElementById("allBtn");
  const workBtn = document.getElementById("workBtn");
  const personalBtn = document.getElementById("personalBtn");

  let currentFilter = "all";

  function renderTasks() {
    workList.innerHTML = "";
    personalList.innerHTML = "";

    let filteredTasks = tasks;
    if (currentFilter === "work") {
      filteredTasks = tasks.filter(t => t.tag?.toLowerCase() === "work");
    } else if (currentFilter === "personal") {
      filteredTasks = tasks.filter(t => t.tag?.toLowerCase() === "personal");
    }

    filteredTasks.forEach((task, index) => {
      const completed = task.st === "completed";
      const starred = task.starred === true;
      const taskDate = new Date(task.due);
      const today = new Date();

      const isTodayOrPast = taskDate <= new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const dateColor = isTodayOrPast ? "red" : "#2c2c2cff";

      const formattedDate = taskDate.toLocaleString('en-US', { month: 'short', day: 'numeric' });


      const li = document.createElement("li");
      li.innerHTML = `
        <div class="fin">
          <button class="pri" data-index="${index}"
            style="background-color:${completed ? 'black' : 'white'};
                   border-color:${completed ? 'black' : '#aaa'}"></button>
          <div>
            <h4 style="text-decoration:${completed ? 'line-through' : 'none'};
                       color:${completed ? 'gray' : 'black'};">
              ${task.title}
            </h4>
            <p style="color:${dateColor}; font-size:13px; margin-top:4px;">
              ${formattedDate}
            </p>
           
          </div>
        </div>
        <button class="star" data-index="${index}">
          ${starred ? '<i class="fa-solid fa-star" style="color:#f5e000;"></i>' : ''}
        </button>
      `;

      if (task.tag === "work") workList.appendChild(li);
      if (task.tag === "personal") personalList.appendChild(li);
    });

    updateCounters();
    activateButtons();
    activateStars();
  }

  function updateCounters() {
    const workCount = tasks.filter(t => t.tag === "work").length;
    const persCount = tasks.filter(t => t.tag === "personal").length;
    const totalCount = tasks.length;

    workNum.textContent = ` ${workCount}`;
    persNum.textContent = ` ${persCount}`;
    total.textContent = `${totalCount} tasks total`;
  }


  function activateButtons() {
    document.querySelectorAll(".pri").forEach(btn => {
      btn.addEventListener("click", () => {
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

  
  function activateStars() {
    document.querySelectorAll(".star").forEach(star => {
      const index = star.getAttribute("data-index");
      const task = tasks[index];

      star.addEventListener("click", () => {
        task.starred = !task.starred;
        star.innerHTML = task.starred
          ? '<i class="fa-solid fa-star" style="color:#f5e000;"></i>'
          : '';

        localStorage.setItem("task", JSON.stringify(tasks));
      });
    });
  }

 
  function setActive(btn) {
    document.querySelectorAll(".pr button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  }

  allBtn.addEventListener("click", () => {
    currentFilter = "all";
    setActive(allBtn);
    renderTasks();
  });

  workBtn.addEventListener("click", () => {
    currentFilter = "work";
    setActive(workBtn);
    renderTasks();
  });

  personalBtn.addEventListener("click", () => {
    currentFilter = "personal";
    setActive(personalBtn);
    renderTasks();
  });

  renderTasks();
});
