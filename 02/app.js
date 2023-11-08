// Получение элементов интерфейса
const inputElement = document.getElementById('title');
const createBtn = document.getElementById('create');
const listElement = document.getElementById('list');

// Загрузка заметок или установка начального значения
function loadNotes() {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
}

// Сохранение заметок в localStorage
function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Отображение заметок на странице
function render() {
    listElement.innerHTML = '';
    notes.forEach((note, i) => {
        listElement.insertAdjacentHTML('beforeend', getNoteTemplate(note, i));
    });
}

// Создание HTML-шаблона заметки
function getNoteTemplate(note, index) {
    return `<li class="list-group-item d-flex justify-content-between align-items-center">
        <span class="${note.stateOfComplications ? 'text-decoration-line-through' : ''}"
              data-index="${index}"
              data-type="edit">${note.title}</span>
        <span>
            <button class="btn btn-small btn-${note.stateOfComplications ? 'warning' : 'success'}"
                    data-index="${index}"
                    data-type="toggle">&#10003;</button>
            <button class="btn btn-small btn-danger"
                    data-index="${index}"
                    data-type="remove">&#10005;</button>
        </span>
    </li>`;
}

// Изменение заголовка заметки
function saveTitleEdit(index, value) {
    notes[index].title = value;
    saveNotes();
    render();
}

// Обработка кликов на заметках
listElement.onclick = function (event) {
    const index = parseInt(event.target.dataset.index, 10);
    const type = event.target.dataset.type;

    if (!isNaN(index)) {
        if (type === 'toggle') {
            notes[index].stateOfComplications = !notes[index].stateOfComplications;
            saveNotes();
            render();
        } else if (type === 'remove') {
            notes.splice(index, 1);
            saveNotes();
            render();
        } else if (type === 'edit') {
            const note = notes[index];
            const input = document.createElement('input');
            input.type = 'text';
            input.value = note.title;
            input.classList.add('form-control');
            event.target.parentNode.replaceChild(input, event.target);
            input.focus();

            input.onblur = function () {
                saveTitleEdit(index, input.value);
            };
            input.addEventListener('keydown', function (e) {
                if (e.key === 'Enter') {
                    saveTitleEdit(index, input.value);
                    e.preventDefault();
                }
            });
        }
    }
};

// Создание новой заметки
createBtn.onclick = function () {
    if (inputElement.value.length === 0) {
        return;
    }
    const newNote = {
        title: inputElement.value, stateOfComplications: false
    };
    notes.push(newNote);
    saveNotes();
    render();
    inputElement.value = '';
};

// Инициализация приложения
const notes = loadNotes();
render();
