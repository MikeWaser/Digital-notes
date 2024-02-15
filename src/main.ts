// Importera funktioner och gränssnitt från andra filer
import { fetchNotesByUsername, addNote, deleteNoteById } from './api';
import { Note } from './interface';

// Hämta DOM-element från HTML-dokumentet
const noteForm = document.getElementById('note-form') as HTMLFormElement;
const usernameInput = document.getElementById('usernameInput') as HTMLInputElement;
const fetchNotesBtn = document.getElementById('fetch-notes-btn') as HTMLButtonElement;
const notesContainer = document.getElementById('notes-container') as HTMLDivElement;

// Skapa gränssnittet för en anteckning och dess motsvarande DOM-element
interface NoteElement {
  note: Note;
  element: HTMLDivElement;
}

// Funktion för att hämta anteckningar från API:et
async function fetchNotes(username: string): Promise<Note[]> {
  try {
    return await fetchNotesByUsername(username);
  } catch (error) {
    console.error(error);
    return []; // Returnera en tom array om det uppstår ett fel
  }
}

// Funktion för att rendera anteckningar på sidan
function renderNotes(notes: Note[]): void {
  notesContainer.innerHTML = ''; // Rensa innehållet i behållaren för anteckningar
  const noteElements: NoteElement[] = []; // Skapa en tom array för att lagra anteckningselement

  // Skapa ett DOM-element för varje anteckning och lägg till det i behållaren
  notes.forEach((note) => {
    const noteElement = document.createElement('div');
    noteElement.classList.add('note');
    noteElement.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.note}</p>
      <button class="delete-btn" data-id="${note.id}">Delete</button>
    `;
    notesContainer.appendChild(noteElement); // Lägg till det skapade DOM-elementet i behållaren
    noteElements.push({ note, element: noteElement }); // Lägg till anteckningselementet i arrayen
  });

  // Lägg till händelselyssnare för att ta bort anteckningar när delete-knappen klickas på
  noteElements.forEach(({ note, element }) => {
    const deleteBtn = element.querySelector('.delete-btn') as HTMLButtonElement;
    deleteBtn.addEventListener('click', async () => {
      await deleteNoteById(note.id); // Ta bort anteckningen från API:et
      const updatedNotes = await fetchNotes(note.username); // Hämta uppdaterade anteckningar
      renderNotes(updatedNotes); // Rendera de uppdaterade anteckningarna på sidan
    });
  });
}

// Funktion för att validera inmatningsdata innan en ny anteckning läggs till
function validateNoteInput(username: string, title: string, content: string): boolean {
  if (!username || !title || !content) {
    alert('Please fill in all fields.'); // Visa ett meddelande om något fält är tomt
    return false; // Returnera falskt om valideringen misslyckas
  }

  // Här kan du lägga till ytterligare valideringslogik om det behövs

  return true; // Returnera sant om valideringen lyckas
}

// Lägg till en händelselyssnare för formuläret för att lägga till nya anteckningar
noteForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Förhindra standardbeteendet för formuläret

  // Hämta innehållet från formulärfälten
  const username = (document.getElementById('note-user') as HTMLInputElement).value.trim();
  const title = (document.getElementById('note-title') as HTMLInputElement).value.trim();
  const content = (document.getElementById('note-content') as HTMLTextAreaElement).value.trim();

  // Validera inmatningsdata
  if (!validateNoteInput(username, title, content)) {
    return; // Avbryt om valideringen misslyckas
  }

  // Skapa en ny anteckning med inmatningsdata
  const newNote: Note = {
    id: '',
    username,
    title,
    note: content,
    createdAt: new Date(),
  };

  await addNote(newNote); // Lägg till den nya anteckningen i databasen
  const notes = await fetchNotes(username); // Hämta uppdaterade anteckningar
  renderNotes(notes); // Rendera de uppdaterade anteckningarna på sidan
  noteForm.reset(); // Återställ formuläret
});

// Lägg till en händelselyssnare för knappen för att hämta anteckningar
fetchNotesBtn.addEventListener('click', async () => {
  const username = usernameInput.value.trim(); // Hämta användarnamnet från input-fältet
  const notes = await fetchNotes(username); // Hämta anteckningar för det angivna användarnamnet
  renderNotes(notes); // Rendera de hämtade anteckningarna på sidan
});

/* import { fetchNotesByUsername, addNote, updateNoteById, deleteNoteById } from './api';

import { Note } from './interface';

document.addEventListener('DOMContentLoaded', async () => {
  const noteForm = document.getElementById('note-form') as HTMLFormElement;
  const usernameInput = document.getElementById('usernameInput') as HTMLInputElement;
  const fetchNotesBtn = document.getElementById('fetch-notes-btn') as HTMLButtonElement;
  const notesContainer = document.getElementById('notes-container');

  fetchNotesBtn.addEventListener('click', async () => {
    const username = usernameInput.value.trim();
    const notes = await fetchNotesByUsername(username);
    renderNotes(notes);
  });

  noteForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = (document.getElementById('note-user') as HTMLInputElement).value.trim();
    const title = (document.getElementById('note-title') as HTMLInputElement).value.trim();
    const content = (document.getElementById('note-content') as HTMLTextAreaElement).value.trim();

    if (!username || !title || !content) {
      alert('Please fill in all fields.');
      return;
    }

    const newNote: Note = {
      id: '',
      username,
      title,
      note: content,
      createdAt: new Date(),
    };

    await addNote(newNote);
    const notes = await fetchNotesByUsername(username);
    renderNotes(notes);
    noteForm.reset();
  });

  function renderNotes(notes: Note[]): void {
    notesContainer.innerHTML = '';
    notes.forEach((note) => {
      const noteElement = document.createElement('div');
      noteElement.classList.add('note');
      noteElement.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.note}</p>
        <button class="delete-btn" data-id="${note.id}">Delete</button>
      `;
      notesContainer.appendChild(noteElement);

      const deleteBtn = noteElement.querySelector('.delete-btn');
      deleteBtn.addEventListener('click', async () => {
        await deleteNoteById(note.id);
        const updatedNotes = await fetchNotesByUsername(note.username);
        renderNotes(updatedNotes);
      });
    });
  }
}); */