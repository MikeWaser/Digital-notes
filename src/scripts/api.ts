import { Note, ApiResponse } from "./interface";
import axios from "axios";

const baseUrl =
  "https://o6wl0z7avc.execute-api.eu-north-1.amazonaws.com/api/notes";

export async function fetchNotesByUsername(username: string): Promise<Note[]> {
  console.log({ username });
  const response = await axios.get(`${baseUrl}/${username}`);
  return response.data.notes;
}

export async function addNote(note: Note): Promise<Response> {
  return await axios.post(baseUrl, note, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function updateNoteById(
  id: string,
  updatedNote: Partial<Note>
): Promise<void> {
  // console.log(updatedNote);
  // console.log(id);
 try {

 
  let response = await axios.put(`${baseUrl}/${id}`, updatedNote, {});
  console.log(response);
  
} catch(error){
    console.log(error);
    
}
  // console.log(response);
}

export async function deleteNoteById(id: string): Promise<void> {
  try {
    await axios.delete(`${baseUrl}/${id}`);
  } catch (error) {
    console.log(error);
  }
}

/* funktioner
export async function fetchNotesByUsername(username: string): Promise<Note[]> {
  console.log({username});
  const response = await fetch(`${baseUrl}/${username}`);
  const data: ApiResponse = await response.json();
  return data.notes;
}

export async function addNote(note: Note): Promise<Response> {
  return await fetch(baseUrl, {
    method: 'POST',
    body: JSON.stringify(note),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function updateNoteById(id: string, updatedNote: Partial<Note>): Promise<void> {
  await fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updatedNote),
    headers: {
      'Content-Type': 'application/json',
    },
  });
} 

export async function deleteNoteById(id: string): Promise<void> {
  await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
  });
}
*/
