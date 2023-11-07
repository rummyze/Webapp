const inputElement = document.getElementById('title');
const createBtn = document.getElementById('create');
const listElement = document.getElementById('list');
const notes = [
    {
        title: 'TestName',
        stateOfComplications: false,
    },
    {
        title: 'NameTest1',
        stateOfComplications: true,
    }
];

function render() {
    listElement.innerHTML = '';
    if (notes.length === 0) {
        listElement.innerHTML = '<p>Add notes</p>';
    }
    notes.forEach((note, i) => {
        listElement.insertAdjacentHTML('beforeend', getNoteTemplate(note, i));
    });
}

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

function saveTitleEdit(index, value) {
    notes[index].title = value;
    render();
}

listElement.onclick = function (event) {
    const index = parseInt(event.target.dataset.index, 10);
    const type = event.target.dataset.type;

    if (!isNaN(index)) {
        if (type === 'toggle') {
            notes[index].stateOfComplications = !notes[index].stateOfComplications;
            render();
        } else if (type === 'remove') {
            notes.splice(index, 1);
            render();
        }
    }

    if (type === 'edit') {
        const note = notes[index];
        const input = document.createElement('input');
        input.type = 'text';
        input.value = note.title;
        input.classList.add('form-control');

        event.target.parentNode.replaceChild(input, event.target);
        input.focus();

        input.onblur = function() {
            saveTitleEdit(index, input.value);
        };
        input.onkeypress = function(e) {
            if (e.key === 'Enter') {
                saveTitleEdit(index, input.value);
            }
        };
    }
};

createBtn.onclick = function () {
    if (inputElement.value.length === 0) {
        return;
    }
    const newNote = {
        title: inputElement.value,
        stateOfComplications: false
    };
    notes.push(newNote);
    render();
    inputElement.value = '';
};

render();
