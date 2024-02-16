export interface Note {
    id: string;
    username: string;
    title: string;
    note: string;
    createdAt: Date;
  }
  
  export interface ApiResponse {
    notes: Note[];
  }
  