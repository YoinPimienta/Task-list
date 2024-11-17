const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

const API_URL = './backend/task.php';

async function loadTasks() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Error al cargar las tareas');
    const tasks = await res.json();
    taskList.innerHTML = '';
    tasks.forEach(task => {
      const li = document.createElement('li');
      li.innerHTML = `${task.description} <button class="delete-btn" data-id="${task.id}">X</button>`;
      taskList.appendChild(li);
    });
  } catch (error) {
    console.error('Error al cargar las tareas:', error);
  }
}

taskForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  if (!taskText) return;

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify({ description: taskText }),
      headers: { 'Content-Type': 'application/json' }
    });
    if (!res.ok) throw new Error('Error al agregar la tarea');
    const task = await res.json();
    const li = document.createElement('li');
    li.innerHTML = `${task.description} <button class="delete-btn" data-id="${task.id}">X</button>`;
    taskList.appendChild(li);
    taskInput.value = '';
  } catch (error) {
    console.error('Error al agregar la tarea:', error);
  }
});

taskList.addEventListener('click', async (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const id = e.target.dataset.id;

    try {
      const res = await fetch(`${API_URL}?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Error al eliminar la tarea');
      e.target.parentElement.remove();
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  }
});

loadTasks();
