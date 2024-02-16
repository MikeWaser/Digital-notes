import {
  addNote,
  fetchNotesByUsername,
  updateNoteById,
  deleteNoteById,
} from "./api";
import { Note } from "./interface";

/* post test
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

/* // Hämta användarens anteckningar
let fetchResponse = await fetch(
  "https://o6wl0z7avc.execute-api.eu-north-1.amazonaws.com/api/notes/maiqen"
);

// Konvertera svaret till JSON-format och konsollogga det
let fetchResult = await fetchResponse.json();
console.log("Fetch Response:", fetchResult); 

 */

document.querySelector(".saveBtn")?.addEventListener("click", async (event) => {
  try {
    // Hämta värdena från input-fälten
    event.preventDefault();
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
    console.log(newNote);
    // Skicka en POST-förfrågan för att lägga till den nya anteckningen
    const response = await addNote(newNote);
    if (response.data.success) {
      console.log("Ny anteckning lagd!");
    } else {
      console.error("failed to add note. Status:", response.status);
    }

    // Konvertera svaret till JSON-format
    let result = response;
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
// Lägg till en händelsehanterare
document
  .getElementById("fetch-notes-btn")!
  .addEventListener("click", async function () {
    try {
      const usernameInput = (
        document.getElementById("usernameInput") as HTMLInputElement
      ).value;

      // Om användarnamnet finns hämtas anteckningar för användaren
      console.log(usernameInput);
      const notes = await fetchNotesByUsername(usernameInput);
      renderNotes(await notes);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  });

const renderNotes = async (notes: Array<any>) => {
  const container = document.getElementById(
    "notes-container"
  ) as HTMLDivElement;

  container.innerHTML = ""; // rensar notes
  notes.forEach((note) => {
    const noteElement = document.createElement("div");
    noteElement.classList.add("note");
    noteElement.setAttribute("id", `note-${note.id}`); // Lägg till ett ID

    // Skapa innehållet för varje anteckning
    let h3El = document.createElement("h3");
    h3El.innerText = note.title;
    noteElement.appendChild(h3El);
    let pEl = document.createElement("p");
    pEl.innerText = note.note;
    noteElement.appendChild(pEl);
    let editBtn = document.createElement("button");
    // editBtn.innerText = 'Date: ' + note.createdAt;
    editBtn.innerText = "EDIT";
    noteElement.appendChild(editBtn);
    editBtn.addEventListener("click", async () => {
      let newMsg = prompt();
      let newNote: object = { note: newMsg };
      await updateNoteById(note.id, newNote);
      // ännu en fetch på alla användarens anteckningar
      const usernameInput = (
        document.getElementById("usernameInput") as HTMLInputElement
      ).value;
      const updatedNotes = await fetchNotesByUsername(usernameInput);
      renderNotes(await updatedNotes);
    });

    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = `&#x2715`;
    noteElement.appendChild(deleteBtn);
    deleteBtn.addEventListener("click", async () => {
      try {
        // Anropa deleteNoteById-funktionen för att radera anteckningen från servern
        await deleteNoteById(note.id);
        console.log(`Note with ID ${note.id} deleted successfully.`);

        // Ta bort anteckningselementet från DOM:en
        const noteElement = deleteBtn.closest(".note");
        if (noteElement) {
          noteElement.remove();
        }
      } catch (error) {
        console.error("Error deleting note:", error);
      }
    });

    // Lägg till anteckningselementet till DOM:en
    document.getElementById("notes-container")?.appendChild(noteElement);
  });
};
