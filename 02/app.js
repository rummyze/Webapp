// Получение элементов интерфейса
const inputElement = document.getElementById('title');
const createBtn = document.getElementById('create');
const listElement = document.getElementById('list');
const sortOptions = document.getElementById('sortOptions');
const filterValue = document.querySelector('input[name="filter"]:checked').value;

// Загрузка заметок или установка начального значения
let notes = loadNotes();
render();

// Функция загрузки заметок
function loadNotes() {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
}

// Функция сохранения заметок
function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

function render() {
    listElement.innerHTML = ''; // Очистка списка перед добавлением новых элементов
    let filteredNotes = filterNotes(filterValue, notes);
    filteredNotes.forEach((note, index) => {
        const noteElement = document.createElement('li');
        noteElement.innerHTML = getNoteTemplate(note, index);
        noteElement.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center', 'note-item');
        // Добавляем элемент в DOM
        listElement.appendChild(noteElement);
        // Теперь добавляем класс для анимации появления
        setTimeout(() => {
            noteElement.classList.add('show');
        }, 10); // небольшая задержка, чтобы CSS успел отреагировать
    });
}


// Функция фильтрации заметок
function filterNotes(filterValue, notes) {
    if (filterValue === 'all') {
        return notes;
    }
    const isCompleted = filterValue === 'completed';
    return notes.filter(note => note.stateOfComplications === isCompleted);
}

// События фильтрации
document.querySelectorAll('input[name="filter"]').forEach(input => {
    input.addEventListener('change', render);
});

// Событие сортировки
sortOptions.addEventListener('change', function () {
    const sortOption = this.value;
    sortNotes(sortOption);
    render();
});

// Функция сортировки заметок
function sortNotes(sortOption) {
    if (sortOption === 'title') {
        notes.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === 'date') {
        notes.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortOption === 'completion') {
        notes.sort((a, b) => (a.stateOfComplications === b.stateOfComplications) ? 0 : a.stateOfComplications ? -1 : 1);
    }
}

// Функция для создания HTML-шаблона заметки
function getNoteTemplate(note, index) {
    return `
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
        </span>`;
}

// Создание новой заметки
createBtn.addEventListener('click', function () {
    const title = inputElement.value.trim();
    if (title) {
        const newNote = {
            title, stateOfComplications: false, createdAt: new Date().toISOString()
        };
        notes.push(newNote);
        saveNotes();
        render();
        inputElement.value = '';
    }
});

// Обработка кликов на заметках
listElement.addEventListener('click', function (event) {
    const index = parseInt(event.target.dataset.index, 10);
    const type = event.target.dataset.type;
    if (isNaN(index)) return;
    switch (type) {
        case 'toggle':
            toggleCompletion(index)
            break;
        case'remove':
            removeNote(index);
            break;
        case'edit':
            editNoteTitle(event, index);
            break;
    }
});

function toggleCompletion(index) {
    notes[index].stateOfComplications = !notes[index].stateOfComplications;
    saveNotes();
    render();
}

function removeNote(index) {
    notes.splice(index, 1);
    saveNotes();
    render();
}

function editNoteTitle(event, index) {
    const note = notes[index];
    const input = document.createElement('input');
    input.type = 'text';
    input.value = note.title;
    input.classList.add('form-control');
    event.target.parentNode.replaceChild(input, event.target);
    input.focus();

    input.onblur = () => saveTitleEdit(index, input.value);
    input.onkeydown = (e) => {
        if (e.key === 'Enter') {
            saveTitleEdit(index, input.value);
        }
    };
}

function saveTitleEdit(index, value) {
    notes[index].title = value;
    saveNotes();
    render();
}
