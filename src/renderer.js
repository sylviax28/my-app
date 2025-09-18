let courseNames = [];

function createCourse() {
  document.getElementById('courseInput').style.display = 'inline-block';
  document.getElementById('saveBtn').style.display = 'inline-block';
}

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('courseInput');
  const saveBtn = document.getElementById('saveBtn');
  const container = document.getElementById('course-container');

  if (input && saveBtn && container) {
    const storedCourses = JSON.parse(localStorage.getItem('courses')) || [];
    storedCourses.forEach(course => {
      courseNames.push(course);
      addCourseToDOM(course, container);
    });

    saveBtn.onclick = () => {
      const courseName = input.value.trim();
      if (courseName) {
        if (courseNames.some(name => name.toLowerCase() === courseName.toLowerCase())) {
          alert("Course Already Exists.");
          return;
        }
        courseNames.push(courseName);
        localStorage.setItem('courses', JSON.stringify(courseNames));
        addCourseToDOM(courseName, container);

        input.value = '';
        input.style.display = 'none';
        saveBtn.style.display = 'none';
      }
    };

    container.addEventListener('click', function (e) {
      if (e.target.classList.contains('delete-course')) {
        const courseDiv = e.target.parentElement;
        const courseLink = courseDiv.querySelector('a');
        const courseName = courseLink.textContent;

        courseDiv.remove();
        courseNames = courseNames.filter(name => name !== courseName);
        localStorage.setItem('courses', JSON.stringify(courseNames));
      }
    });
  }

  function addCourseToDOM(courseName, container) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('course-entry');

    const link = document.createElement('a');
    link.href = `course.html?course=${encodeURIComponent(courseName)}`;
    link.textContent = courseName;
    link.style.marginRight = '10px';
    link.style.backgroundColor = '#ffe8e8';

    const span = document.createElement('span');
    span.textContent = '\u00d7';
    span.classList.add('delete-course');
    span.style.cursor = 'pointer';

    wrapper.style.marginBottom = '12px';

    wrapper.appendChild(link);
    wrapper.appendChild(span);
    container.appendChild(wrapper);
  }

  // --- To-Do List ---
  const inputBox = document.getElementById("input-box");
  const addBtn = document.getElementById("addbutton");
  const listContainer = document.getElementById("list-container");

  if (inputBox && addBtn && listContainer) {
    function showTasks() {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      listContainer.innerHTML = "";
      tasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task.text;
        if (task.checked) li.classList.add("checked");
        const span = document.createElement("span");
        span.textContent = "\u00d7";
        li.appendChild(span);
        listContainer.appendChild(li);
      });
    }
    


    function saveData() {
      const tasks = [];
      listContainer.querySelectorAll("li").forEach(li => {
        tasks.push({
          text: li.childNodes[0].nodeValue.trim(),
          checked: li.classList.contains("checked")
        });
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function addTask() {
      const taskText = inputBox.value.trim();
      if (taskText === '') {
        alert("You must write something");
        return;
      }
      const li = document.createElement("li");
      li.textContent = taskText;
      const span = document.createElement("span");
      span.textContent = "\u00d7";
      li.appendChild(span);
      listContainer.appendChild(li);
      inputBox.value = '';
      saveData();
    }

    addBtn.addEventListener('click', addTask);

    listContainer.addEventListener("click", function (e) {
      if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
      } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
      }
    });

    showTasks();
  }

  // --- Grade Calculator ---
  const tableBody = document.getElementById('grade-table-body');
  if (tableBody) {
    for (let i = 0; i < 7; i++) {
      const row = document.createElement('tr');
      row.innerHTML = i === 0
        ? `<td><input type="text" placeholder="e.g. Quiz 1"></td>
           <td><input type="number" class="grade" min="0" max="100" placeholder="e.g. 90"></td>
           <td><input type="number" class="weight" min="0" max="100" placeholder="e.g. 10"></td>`
        : `<td><input type="text" class="assignments"></td>
           <td><input type="number" class="grade" min="0" max="100"></td>
           <td><input type="number" class="weight" min="0" max="100"></td>`;

      tableBody.appendChild(row);
    }
  }
});

function calculateGrade() {
  const grades = document.querySelectorAll('.grade');
  const weights = document.querySelectorAll('.weight');
  let totalWeighted = 0;
  let totalWeight = 0;

  for (let i = 0; i < grades.length; i++) {
    const gradeValue = parseFloat(grades[i].value);
    const weightValue = parseFloat(weights[i].value);
    if (!isNaN(gradeValue) && !isNaN(weightValue)) {
      totalWeighted += gradeValue * weightValue;
      totalWeight += weightValue;
    }
  }

  const resultElem = document.getElementById('result');
  if (totalWeight === 0) {
    alert("Please enter at least one valid grade and weight.");
  } else {
    const finalGrade = (totalWeighted / totalWeight).toFixed(2);
    alert(`Final Grade: ${finalGrade}%`);
  }
}

function addRow() {
  const info = document.getElementById('grade-table-body');
  if (info) {
    const newrow = document.createElement('tr');
    newrow.innerHTML = `
      <td><input type="text"></td>
      <td><input type="number" class="grade" min="0" max="100"></td>
      <td><input type="number" class="weight" min="0" max="100"></td>`;
    info.appendChild(newrow);
  }
}

function clearGrade() {
  const grades = document.querySelectorAll('.grade');
  const weights = document.querySelectorAll('.weight');
  const texts = document.querySelectorAll('input[type="text"]');
  grades.forEach(input => input.value = '');
  weights.forEach(input => input.value = '');
  texts.forEach(input => input.value = '');
}
