document.addEventListener('DOMContentLoaded', () => {
    const noteForm = document.getElementById('noteForm');
    const notesList = document.getElementById('notesList');

    function fetchNotes() {
        fetch('notes.php?action=fetch')
            .then(response => response.json())
            .then(data => {
                notesList.innerHTML = '';
                data.forEach(note => {
                    const listItem = document.createElement('li');
                    listItem.innerHTML = `${note.content} <button data-id=\"${note.id}\" class=\"deleteBtn\">Delete</button>`;
                    notesList.appendChild(listItem);
                });
            });
    }

    noteForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const noteContent = document.getElementById('note').value;

        fetch('notes.php?action=add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: noteContent })
        })
            .then(() => {
                noteForm.reset();
                fetchNotes();
            });
    });

    notesList.addEventListener('click', (event) => {
        if (event.target.classList.contains('deleteBtn')) {
            const noteId = event.target.getAttribute('data-id');

            fetch(`notes.php?action=delete&id=${noteId}`, { method: 'DELETE' })
                .then(() => fetchNotes());
        }
    });

    fetchNotes();
});
