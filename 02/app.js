const inputElement = document.getElementById('title')
const createBtn = document.getElementById('create')
const listElement = document.getElementById('list')
const notes = [
    {
        title: 'TestName',
        stateOfComplications: false,
    },
    {
        title: 'NameTest1',
        stateOfComplications: true,
    }
]
listElement.onclick = function (event) {
    if (event.target.dataset.index) {
        const index = parseInt(event.target.dataset.index)
        const type = event.target.dataset.type
        if (type === 'toggle') {
            notes[index].stateOfComplications = !notes[index].stateOfComplications
        } else if (type === 'remove') {
            notes.splice( index, 1)
        }
        render()
    }
}

createBtn.onclick = function () {
    const newNote = {
        title: inputElement.value,
        stateOfComplications: false
    }
    if (inputElement.value.length === 0) {
        return
    }
    notes.push(newNote)
    render()
    // listElement.insertAdjacentHTML('beforeend', getNoteTemplate(newNote))
    inputElement.value = ''
}

function getNoteTemplate(note, index) {
    return `<li
      class="list-group-item d-flex justify-content-between align-items-center"
    >
      <span class="${note.stateOfComplications ? 'text-decoration-line-through' : ''}">${note.title}</span>
      <span>
      <span class="btn btn-small btn-${note.stateOfComplications ? 'warning' : 'success'}" data-index="${index}" data-type="toggle">&check;</span>
      <span class="btn btn-small btn-danger" data-index="${index}" data-type="remove">&times;</span>
      </span>
    </li>`
}

function render() {
    listElement.innerHTML = ''
    for (let i = 0; i < notes.length; i++) {
        listElement.insertAdjacentHTML('beforeend', getNoteTemplate(notes[i], i))
    }
    // for (let note of notes) {
    //     listElement.insertAdjacentHTML('beforeend', getNoteTemplate(note))
    // }
}

render()