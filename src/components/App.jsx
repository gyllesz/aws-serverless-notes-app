import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    try {
      const response = await fetch(`${API_URL}/notes`);
      const data = await response.json();

      if (response.ok) {
        setNotes(data);
      } else {
        console.error("Failed to fetch notes:", data);
      }
    } catch (error) {
      console.error("Error calling GET /notes:", error);
    }
  }

  async function addNote(newNote) {
    try {
      const response = await fetch(`${API_URL}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: newNote.title,
          content: newNote.content
        })
      });

      const data = await response.json();

      if (response.ok) {
        setNotes(prevNotes => {
          return [...prevNotes, data.note];
        });
      } else {
        console.error("Failed to save note:", data);
      }
    } catch (error) {
      console.error("Error calling POST /notes:", error);
    }
  }

  async function deleteNote(noteId) {
    try {
      const response = await fetch(`${API_URL}/notes/${noteId}`, {
        method: "DELETE"
      });

      const data = await response.json();

      if (response.ok) {
        setNotes(prevNotes => {
          return prevNotes.filter(noteItem => {
            return noteItem.noteId !== noteId;
          });
        });
      } else {
        console.error("Failed to delete note", data);
      }
    } catch (error) {
      console.error("Error calling DELETE API:", error);
    }
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map(noteItem => {
        return (
          <Note
            key={noteItem.noteId}
            id={noteItem.noteId}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;