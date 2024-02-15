import { Note, ApiResponse } from './interface';

const BASE_URL = 'https://o6wl0z7avc.execute-api.eu-north-1.amazonaws.com/api/notes';

export async function fetchNotesByUsername(username: string): Promise<Note[]> {
  const response = await fetch(`${BASE_URL}/${username}`);
  const data: ApiResponse = await response.json();
  return data.data;
}

export async function addNote(note: Note): Promise<void> {
  await fetch(BASE_URL, {
    method: 'POST',
    body: JSON.stringify(note),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function updateNoteById(id: string, updatedNote: Partial<Note>): Promise<void> {
  await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updatedNote),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function deleteNoteById(id: string): Promise<void> {
  await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
}
