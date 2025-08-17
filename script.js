// Run after the HTML has fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // 1) Select DOM elements
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList  = document.getElementById('task-list');

  // --- Local Storage helpers ---
  // Read tasks array from Local Storage (returns [] if none)
  function getTasks() {
    return JSON.parse(localStorage.getItem('tasks') || '[]');
  }

  // Save tasks array back to Local Storage
  function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // 2) Create a <li> element with text and a Remove button, and wire up handlers
  function createTaskElement(taskText) {
    const li = document.createElement('li');
    li.textContent = taskText;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    // Use classList.add (as previously requested)
    removeBtn.classList.add('remove-btn');

    // When clicked, remove from DOM and Local Storage
    removeBtn.addEventListener('click', () => {
      // Remove from DOM
      taskList.removeChild(li);

      // Remove ONE matching entry from Local Storage
      const tasks = getTasks();
      const idx = tasks.indexOf(taskText);
      if (idx > -1) {
        tasks.splice(idx, 1);
        saveTasks(tasks);
      }
    });

    li.appendChild(removeBtn);
    return li;
  }

  /**
   * 3) addTask
   * - Can be called with a string (taskTextParam) OR will read from the input
   * - Optionally persists to Local Storage (save=true by default)
   */
  function addTask(taskTextParam, save = true) {
    const taskText = (typeof taskTextParam === 'string'
      ? taskTextParam
      : taskInput.value
    ).trim();

    if (taskText === '') {
      alert('Please enter a task.');
      return;
    }

    // Create and append DOM element
    const li = createTaskElement(taskText);
    taskList.appendChild(li);

    // Save to Local Storage if requested
    if (save) {
      const tasks = getTasks();
      tasks.push(taskText);
      saveTasks(tasks);
    }

    // If we added from the input, clear & refocus it
    if (typeof taskTextParam !== 'string') {
      taskInput.value = '';
      taskInput.focus();
    }
  }

  // 4) Load tasks from Local Storage and populate the list (no duplicate saving)
  function loadTasks() {
    const storedTasks = getTasks();
    storedTasks.forEach(taskText => addTask(taskText, false));
  }

  // 5) Attach event listeners
  addButton.addEventListener('click', () => addTask());
  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') addTask();
  });

  // 6) Initialize from Local Storage on page load
  loadTasks();
});

