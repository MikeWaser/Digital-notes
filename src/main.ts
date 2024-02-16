import {
  addNote,
  fetchNotesByUsername,
  updateNoteById,
  deleteNoteById,
} from "./api";

/* 
// Skicka POST-förfrågan för att lägga till en anteckning
const newNote = {
  username: "maiqen",
  title: "Första anteckningen",
  note: "Min första anteckning",
};

let postResponse = await fetch(
  "https://o6wl0z7avc.execute-api.eu-north-1.amazonaws.com/api/notes",
  {
    method: "POST",
    body: JSON.stringify(newNote),
    headers: {
      "Content-Type": "application/json",
    },
  }
);

// Konvertera svaret till JSON-format och konsollogga det
let postResult = await postResponse.json();
console.log("POST Response:", postResult);
 */

document.querySelector(".saveBtn")?.addEventListener("click", async () => {
  try {
    // Hämta värdena från input-fälten
    const userInput: HTMLInputElement = document.getElementById(
        "note-user"
      ) as HTMLInputElement;
    const titleInput: HTMLInputElement = document.getElementById(
      "note-title"
    ) as HTMLInputElement;
    const contentInput: HTMLTextAreaElement = document.getElementById(
      "note-content"
    ) as HTMLTextAreaElement;
   
    // Skapa en ny anteckning baserad på Note-interfacet och input-fälten
    const newNote: Note = {
      username: userInput.value,
      title: titleInput.value,
      note: contentInput.value,
    };

    // Skicka en POST-förfrågan för att lägga till den nya anteckningen
    const response = await addNote(newNote);
    if (response.ok) {
        console.log('Ny anteckning lagd!');
    } else {
        console.error('failed to add note. Status:', response.status);
        
    }

    // Konvertera svaret till JSON-format
    let result = await response.json();
    console.log("New note created:", result);

    // Om det krävs, gör något med det nya anteckningens resultat här

    // Återställ input-fälten efter att anteckningen har skickats
    titleInput.value = "";
    contentInput.value = "";
    userInput.value = "";
  } catch (error) {
    console.error("Error creating note:", error);
  }
});

// Hämta användarens anteckningar
let fetchResponse = await fetch(
  "https://o6wl0z7avc.execute-api.eu-north-1.amazonaws.com/api/notes/maiqen"
);

// Konvertera svaret till JSON-format och konsollogga det
let fetchResult = await fetchResponse.json();
console.log("Fetch Response:", fetchResult);

// Händelselyssnare för knappen
document
  .getElementById("fetch-notes-btn")!
  .addEventListener("click", async function () {
    try {
      const usernameInput = (
        document.getElementById("usernameInput") as HTMLInputElement
      ).value;

      // Om användarnamnet finns, kan du göra det önskade, t.ex. hämta anteckningar för användaren
      const notes = await fetchNotesByUsername(usernameInput);
      const container = document.getElementById(
        "notes-container"
      ) as HTMLDivElement;

      container.innerHTML = ""; // Clear existing notes
      notes.forEach((note) => {
        const noteElement = document.createElement("div");
        noteElement.classList.add("note");
        noteElement.setAttribute("id", `note-${note.id}`); // Lägg till ett unikt ID baserat på anteckningens ID från API:en

        // Skapa innehållet för varje anteckningselement
        noteElement.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.note}</p>
            <small>Date: ${note.createdAt}</small>
            <button class = "editBtn">EDIT</button>
            <button class="deleteBtn" data-note-id="${note.id}">&#x2715</button>
        `;

        // Lägg till händelselyssnare för raderingsknapparna
        document.addEventListener("click", async function (event) {
          if (event.target.classList.contains("deleteBtn")) {
            const noteId = event.target.getAttribute("data-note-id"); // Hämta anteckningens ID från data-attributet

            try {
              // Anropa deleteNoteById-funktionen för att radera anteckningen från servern
              await deleteNoteById(noteId);
              console.log(`Note with ID ${noteId} deleted successfully.`);

              // Ta bort anteckningselementet från DOM:en
              const noteElement = event.target.closest(".note");
              if (noteElement) {
                noteElement.remove();
              }
            } catch (error) {
              console.error("Error deleting note:", error);
            }
          }
        });

        // Lägg till anteckningselementet till DOM:en
        document.getElementById("notes-container")?.appendChild(noteElement);
      });
      /* 
      notes.forEach((note) => {
        const noteElement = document.createElement("div");
        noteElement.classList.add("noteBox");

        noteElement.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.note}</p>
            <small>Date: ${note.createdAt}</small>
            <button class = "editBtn">EDIT</button>
            <button id="deleteBtn" data-note-id="${note.id}">&#x2715</button>
        
          `;
        container.appendChild(noteElement);
      }); */
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  });

/* const updateNote = {
  note: "Detta är min uppdaterade text",
};

let response = await fetch(
  "https://o6wl0z7avc.execute-api.eu-north-1.amazonaws.com/api/notes/21312dadad",
  {
    method: "PUT",
    body: JSON.stringify(updateNote), // Gör om till ett JSON objekt
    headers: {
      "Content-Type": "application/json", // Berätta för servern att det vi skickar med är ett JSON objekt
    },
  }
); // Det sista är ett unikt id som är kopplat till en anteckning
console.log(updateNote); */

/* import { Note, ApiResponse } from "./interface";

async function fetchNoteById(id: string): Promise<Note> {
  // Implement your logic to fetch a note by its ID
  // For example, you can make a fetch request to your backend API
  // This is just a placeholder implementation
  return { id: "1", title: "Note Title", note: "Note Text" };
}

async function updateNoteById(
  id: string,
  updatedNote: Partial<Note>
): Promise<void> {
  // Implement your logic to update a note by its ID
  // For example, you can make a fetch request to your backend API
  // This is just a placeholder implementation
  console.log("Updated note:", updatedNote);
}

document.addEventListener("click", async function (event) {
  if (event.target.classList.contains("editBtn")) {
    const editBtn = event.target as HTMLElement;
    const noteId = editBtn.dataset.id;
    if (!noteId) {
      console.error("Error: Missing note ID");
      return;
    }
    try {
      // Fetch the specific note for editing based on its ID
      const note = await fetchNoteById(noteId);
      // Get the note element that should be edited
      const noteElement = editBtn.parentElement as HTMLElement;
      const noteContent = noteElement.querySelector(".note") as HTMLElement;

      // Make the note content editable
      noteContent.contentEditable = "true";
      noteContent.focus();

      // Add a keydown listener to save changes when the user presses Enter
      noteContent.addEventListener("keydown", async function (e) {
        if (e.key === "Enter") {
          e.preventDefault(); // Prevent the default behavior to avoid line breaks

          // Unmark the note content as editable and save the note
          noteContent.contentEditable = "false";
          const updatedNoteContent = noteContent.textContent || ""; // Get the updated content
          const updatedNote: Partial<Note> = { note: updatedNoteContent };
          await updateNoteById(noteId, updatedNote); // We assume noteId is not null or undefined here
        }
      });
    } catch (error) {
      console.error("Error updating note:", error);
      // Handle any potential errors here
    }
  }
}); */

/*  const deleteButtons = document.getElementById('deleteBtn');

  deleteButtons.forEach(button => {
    button.addEventListener('click', async () => {
        // Hämta anteckningens id från data-id-attributet
        const noteId = button.getAttribute('data-id');
        if (noteId) {
            try {
                // Anropa deleteNoteById-funktionen med anteckningens id
                await deleteNoteById(noteId);
                console.log(`Note with ID ${noteId} deleted successfully.`);
                // Ta bort anteckningen från DOM:en
                const parentNote = button.parentElement;
                if (parentNote) {
                    parentNote.remove();
                }
            } catch (error) {
                console.error(`Failed to delete note with ID ${noteId}.`, error);
            }
        }
    });
});
 */
/* async function deleteNote() {
    try {
      await deleteNoteById('your_note_id_here');
      console.log('Note deleted successfully.');
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  }
  
  // Anropa deleteNote-funktionen
  deleteNote(); */

/* async function deleteNote(id: string | null): Promise<void> {
    // Construct the URL for the delete request
    const URL: string = `https://o6wl0z7avc.execute-api.eu-north-1.amazonaws.com/api/notes/${id}`;
    try {
        // Send a DELETE request to the API to delete a note
        const response = await fetch(URL, {
            method: 'DELETE'
        });

        // Check if the response was successful
        if (response.ok) {
            console.log('Note deleted successfully.');
        } else {
            // If not successful, throw an error
            throw new Error('Failed to delete note.');
        }
    } catch (error) {
        // Log any errors that may occur during the request
        console.error('Error deleting note:', error);
    }
}

  document.querySelectorAll(".deleteBtn").forEach((deleteButton) => {
    deleteButton.addEventListener("click", () => {
        // Find the parent node of the delete button
        const parentNode = deleteButton.parentNode as HTMLElement;
        
        // Get the note ID attribute from the parent node
        const noteID = parentNode?.getAttribute("note-id");

        // Call the deleteNote function with the note ID
        deleteNote(noteID);

        // Remove the parent node (article) from the DOM
        parentNode?.remove();
    });
}); */

/*  document.addEventListener('DOMContentLoaded', function () {
    // Händelsehanterare för klick på delete-btn
    document.getElementById('delete-btn')!.addEventListener('click', function () {
        // URL för att göra en DELETE-begäran
        const baseUrl = 'https://o6wl0z7avc.execute-api.eu-north-1.amazonaws.com/api/notes';

        // Använd fetch API för att göra en DELETE-begäran
        fetch(baseUrl, {
            method: 'DELETE',
        })
        .then(response => {
            // Kontrollera svarsstatus för att avgöra om begäran lyckades
            if (response.ok) {
                alert('Note deleted successfully.');
            } else {
                alert('Failed to delete note.');
            }
        })
        .catch(error => {
            console.error('Error deleting note:', error);
            alert('An error occurred while deleting note.');
        });
    });
});
 */

/* // Importera funktioner och gränssnitt från andra filer
import { fetchNotesByUsername, addNote, deleteNoteById } from './api';
import { Note } from './interface';

// Hämta DOM-element från HTML-dokumentet
const newNote :HTMLFormElement = document.getElementById('newNote') as HTMLFormElement;
const usernameInput :HTMLInputElement = document.getElementById('usernameInput') as HTMLInputElement;
const fetchNotesBtn : HTMLButtonElement = document.getElementById('fetch-notes-btn') as HTMLButtonElement;
const notesContainer : HTMLDivElement = document.getElementById('notes-container') as HTMLDivElement;

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
newNote.addEventListener('submit', async (event) => {
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
}); */

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
