// public/app.js
// Client-side interactions: theme toggle, add/edit/delete via forms, AM/PM formatting.
// Works with redirect-based server responses (falls back to reload).

document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const themeKey = 'todo-theme';
  const current = localStorage.getItem(themeKey) || 'light';
  if (current === 'dark') body.classList.add('dark');

  // Elements
  const toggleLight = document.getElementById('themeLight');
  const toggleDark = document.getElementById('themeDark');
  const countsEl = document.getElementById('counts');
  const addForm = document.getElementById('addForm');
  const listEl = document.getElementById('list');

  // theme button states
  function updateToggleUI(){
    if (body.classList.contains('dark')) {
      toggleDark && toggleDark.classList.add('active');
      toggleLight && toggleLight.classList.remove('active');
    } else {
      toggleLight && toggleLight.classList.add('active');
      toggleDark && toggleDark.classList.remove('active');
    }
  }
  updateToggleUI();

  function setTheme(mode){
    if (mode === 'dark') body.classList.add('dark'); else body.classList.remove('dark');
    localStorage.setItem(themeKey, mode);
    updateToggleUI();
  }

  toggleLight && toggleLight.addEventListener('click', ()=> setTheme('light'));
  toggleDark && toggleDark.addEventListener('click', ()=> setTheme('dark'));

  // format time to AM/PM
  function formatAMPM(timeStr){
    if(!timeStr) return '';
    const parts = timeStr.split(':');
    if(parts.length < 2) return timeStr;
    let h = parseInt(parts[0],10), m = parts[1].padStart(2,'0');
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return `${h}:${m} ${ampm}`;
  }

  // Let the form submit naturally - no JavaScript intervention needed

  // AJAX checkbox toggle
  document.querySelectorAll(".checkbox").forEach(box => {
    box.addEventListener("click", async () => {
      const id = box.dataset.id;

      const res = await fetch(`/todos/${id}/toggle`, {
        method: "POST",
        headers: { "X-Requested-With": "XMLHttpRequest" }
      });

      const data = await res.json();

      if (data.ok) {
        // Toggle UI state
        const todo = box.closest(".todo");
        todo.classList.toggle("completed");
      }
    });
  });

  // Delete & toggle buttons: delegated event listener to list
  if (listEl) {
    listEl.addEventListener('click', async (e) => {
      const del = e.target.closest('[data-action="delete"]');
      if (del) {
        const id = del.dataset.id;
        if (!confirm('Delete this task?')) return;
        try {
          await fetch(`/todos/${id}/delete`, { method: 'POST' });
          window.location.reload();
        } catch (err) { console.error(err); alert('Delete failed') }
        return;
      }

      const tog = e.target.closest('[data-action="toggle"]');
      if (tog) {
        const id = tog.dataset.id;
        try {
          await fetch(`/todos/${id}/toggle`, { method: 'POST' });
          window.location.reload();
        } catch (err) { console.error(err); alert('Toggle failed') }
        return;
      }

      const edit = e.target.closest('[data-action="edit"]');
      if (edit) {
        const id = edit.dataset.id;
        // open edit UI: We'll use a simple prompt flow to avoid modal complexity
        const title = prompt('Edit task title', edit.dataset.task);
        if (title === null) return;
        const time = prompt('Time (HH:MM 24h)', edit.dataset.time || '');
        if (time === null) return;
        // Compose form and submit to /todos/:id/edit (server must support this route)
        try {
          await fetch(`/todos/${id}/edit`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({ task: title, time })
          });
          window.location.reload();
        } catch (err) { console.error(err); alert('Edit failed') }
        return;
      }
    });
  }

  // nice counts (if rendered server-side, they will exist) - keep them up to date if needed
  (function updateCountsFromDOM(){
    try {
      const total = document.querySelectorAll('.todo').length;
      const done = document.querySelectorAll('.todo.completed').length;
      const pending = total - done;
      if (countsEl) countsEl.textContent = `${total} total • ${done} done • ${pending} pending`;
    } catch(e){}
  })();

});