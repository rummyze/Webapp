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

createBtn.onclick = function () {
    const newNote = {
        title: inputElement.value,
        stateOfComplications: false
    }
    if (inputElement.value.length === 0) {
        return
    }
    listElement.insertAdjacentHTML('beforeend', getNoteTemplate(newNote))
    inputElement.value = ''
}

function getNoteTemplate(note) {
    return `<li
      class="list-group-item d-flex justify-content-between align-items-center"
    >
      <span class="${note.stateOfComplications ? 'text-decoration-line-through' : ''}">${note.title}</span>
      <span>
        <span class="btn btn-small btn-success">&check;</span>
        <span class="btn btn-small btn-danger">&times;</span>
      </span>
    </li>`
}

const hello = {
  val1: "foo",
  val2: "bar",
  val3: function (params) {
    console.log("this: ", this);
  }
}

function closures() {
  const array = [1, 2, 3];
  
  setTimeout(() => {
    for (var index = 0; index < array.length; index++) {
      setTimeout(() => {
        console.log("index: ", index);
        console.log("x: ", array[index] + 4);
      }, 1000);
    }
  }, 1500);
}

closures();

function render() {
    // for (let i = 0; i < notes.length; i++) {
    //     listElement.insertAdjacentHTML('beforeend', getNoteTemplate(notes[i]))
    // }
  notes.forEach((item) => {
    listElement.insertAdjacentHTML('beforeend', getNoteTemplate(item))
  });
}
render()