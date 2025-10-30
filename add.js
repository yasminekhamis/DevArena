
let title = document.getElementById('title');
let des = document.getElementById('des');
let due = document.getElementById('due');
let tag = document.getElementById('tag');
let st = document.getElementById('st');
let sub = document.getElementById('sub');
let rt = document.getElementById('rt');
let selectedPriority = "medium"; 
function selectpr(btn, level) {
  const buttons = document.querySelectorAll(".pr button");
  buttons.forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  selectedPriority = level;
  console.log("Priority selected:", selectedPriority);
}

let data = localStorage.task ? JSON.parse(localStorage.task) : [];

sub.onclick = function() {
  let one = {
    title: title.value,
    des: des.value,
    due: due.value,
    tag: tag.value,
    st: st.value
  };
  data.push(one);
  localStorage.setItem('task', JSON.stringify(data));
};

rt.onclick = function() {
  title.value = '';
  des.value = '';
  due.value = '';
  tag.value = '';
  st.value = '';
};

