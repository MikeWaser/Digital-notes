import axios from 'axios';

interface WriteNote {
  username: string;
  title: string;
  note: string;
}

const note:WriteNote = {
  username: 'maiqen',
  title: "Första anteckningen",
  note: "Min första anteckning"
}

const uploadBtn :HTMLButtonElement = document.querySelector(".uploadBtn") as HTMLButtonElement;
const nameInput :HTMLInputElement= document.querySelector(".inputBoxwriterName") as HTMLInputElement;
uploadBtn?.addEventListener("click" , () => {
  // postData(note);
  fetchData('maiqen')
   handleData("maiqen")
}) 

async function postData(note: WriteNote) {
    const url = 'https://o6wl0z7avc.execute-api.eu-north-1.amazonaws.com/api/notes';

    try {
        const response = await axios.post(url, note);
        console.log('Response from API:', response.data);
        return response.data
    } catch (error) {
        console.error('Error posting data:', error);
    }
}

async function fetchData(username:string) {
  const url = `https://o6wl0z7avc.execute-api.eu-north-1.amazonaws.com/api/notes/${username}`;

  try {
      const response = await axios.get(url);
      console.log('Data from API:', response.data);
      return response.data
  } catch (error) {
      console.error('Error fetching data:', error);
  }
}


/* async function getData() {
    const response = await fetch("https://o6wl0z7avc.execute-api.eu-north-1.amazonaws.com/api/notes/:username");
    console.log(response);
}

getData();
 */
async function handleData(input:string){
  const notes = await fetchData(input)
  //const namefield:HTMLElement = "document etc etc"
 console.log(notes.notes[0].note)
}

/* for(){
  textField.innerText = 
  titleField
  nameField
} */
/* interface Note {
    id: string;
    username: string;
    title: string;
    note: string;
    createdAt: Date;
  } */
  
 /*  // Funktion för att hämta anteckningar från API:et
  async function getNotes(username: string): Promise<Note[]> {
    const response = await fetch(`https://o6wl0z7avc.execute-api.eu-north-1.amazonaws.com/api/notes/${username}`);
    const data: Note[] = await response.json();
    return data;
  }
  
  // Funktion för att skapa en ny anteckning
  async function createNote(note: Note): Promise<void> {
    const response = await fetch("https://o6wl0z7avc.execute-api.eu-north-1.amazonaws.com/api/notes", {
      method: "POST",
      body: JSON.stringify(note),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Failed to create note');
    }
  }
  
  // Funktion för att uppdatera en befintlig anteckning
  async function updateNote(id: string, updatedNote: Partial<Note>): Promise<void> {
    const response = await fetch(`https://o6wl0z7avc.execute-api.eu-north-1.amazonaws.com/api/notes/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedNote),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Failed to update note');
    }
  }
  
  // Funktion för att ta bort en anteckning
  async function deleteNote(id: string): Promise<void> {
    const response = await fetch(`https://o6wl0z7avc.execute-api.eu-north-1.amazonaws.com/api/notes/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete note');
    }
  }
  
  // Funktion för att rendera anteckningar i DOM:en
  function renderNotes(notes: Note[]): void {
    const noteContainer = document.querySelector('.notesContainer');
    noteContainer.innerHTML = ""; // Rensa tidigare innehåll i container
  
    notes.forEach(note => {
      const noteElement = document.createElement('div');
      noteElement.classList.add('noteItem');
      noteElement.innerHTML = `
        <h3>${note.title}</h3>
        <p><strong>Writer:</strong> ${note.username}</p>
        <p>${note.note}</p>
        <p><strong>Created At:</strong> ${note.createdAt}</p>
      `;
      noteContainer.appendChild(noteElement);
    });
  }
  
  // Lyssna på klickhändelser för redigering av anteckningar
  document.addEventListener('click', async (event) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains('editBtn')) {
      const noteElement = target.parentElement.parentElement; // Anteckningens DOM-element
      const title = noteElement.querySelector('.noteTitle h3').textContent;
      const writer = noteElement.querySelector('.noteTitle p').textContent;
      const noteText = noteElement.querySelector('.note p').textContent;
      
      // Visa ett prompt-fönster för att låta användaren redigera anteckningen
      const updatedTitle = prompt("Enter updated title:", title);
      const updatedWriter = prompt("Enter updated writer:", writer);
      const updatedNoteText = prompt("Enter updated note text:", noteText);
  
      // Uppdatera anteckningen om användaren har angett nya värden och klickade på OK
      if (updatedTitle !== null && updatedWriter !== null && updatedNoteText !== null) {
        const updatedNote: Partial<Note> = { title: updatedTitle, username: updatedWriter, note: updatedNoteText };
        await updateNote(noteElement.dataset.id, updatedNote);
        
        // Hämta alla anteckningar igen för att uppdatera gränssnittet
        const updatedNotes = await getNotes(updatedWriter);
        renderNotes(updatedNotes);
      }
    }
  });
  
  // Exempelanvändning:
  async function exampleUsage() {
    const writer = "user123"; // Anta att detta är användarens namn
    const notes = await getNotes(writer); // Hämta användarens anteckningar
    renderNotes(notes); // Rendera anteckningarna i DOM:en
  }
  
  exampleUsage(); // Anrop för att demonstrera användningen
   */