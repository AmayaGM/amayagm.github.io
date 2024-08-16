let notes = [];
let currentIndex = null;

document.getElementById('addNoteBtn').addEventListener('click', () => {
    currentIndex = null;
    showModal('Add Note');
});

document.getElementById('saveNoteBtn').addEventListener('click', () => {
    const title = document.getElementById('noteTitle').value;
    const description = document.getElementById('noteDescription').value;

    if (currentIndex === null) {
        notes.push({ title, description });
    } else {
        notes[currentIndex] = { title, description };
    }
    closeModal();
    renderNotes();
});

document.getElementById('closeModal').addEventListener('click', () => {
    closeModal();
});

function showModal(title) {
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('noteTitle').value = '';
    document.getElementById('noteDescription').value = '';
    document.getElementById('noteModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('noteModal').style.display = 'none';
}

function renderNotes() {
    const container = document.getElementById('notesContainer');
    container.innerHTML = '';

    notes.forEach((note, index) => {
        const noteDiv = document.createElement('div');
        noteDiv.className = 'note';

        noteDiv.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.description}</p>
            <span class="edit-btn" onclick="editNote(${index})">✏️</span>
            <span class="delete-btn" onclick="deleteNote(${index})">🗑️</span>
        `;

        container.appendChild(noteDiv);
    });
}

function editNote(index) {
    currentIndex = index;
    document.getElementById('noteTitle').value = notes[index].title;
    document.getElementById('noteDescription').value = notes[index].description;
    showModal('Edit Note');
}

function deleteNote(index) {
    notes.splice(index, 1);
    renderNotes();
}
