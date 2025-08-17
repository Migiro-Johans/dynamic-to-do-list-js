// Run after the HTML has fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Select DOM elements
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList  = document.getElementById('task-list');

  function addTask() {
    const taskText = taskInput.value.trim();

    // If empty, prompt user to enter a task
    if (taskText === '') {
      alert('Please enter a task.');
      return;
    }

    // Create list item for the task
    const li = document.createElement('li');
    li.textContent = taskText;

    // Create remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    // Use classList.add as required
    removeBtn.classList.add('remove-btn');

    // On click, remove this task item from the list
    removeBtn.addEventListener('click', () => {
      taskList.removeChild(li);
    });

    // Assemble and add to the DOM
    li.appendChild(removeBtn);
    taskList.appendChild(li);

    // Clear and refocus input
    taskInput.value = '';
    taskInput.focus();
  }

  // Add task when the button is clicked
  addButton.addEventListener('click', addTask);

  // Add task on Enter keypress in the input field
  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  });
});
