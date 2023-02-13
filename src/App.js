import './App.css';
import Split from 'react-split';
import Editor from './components/Editor';
import Sidebar from './components/Sidebar';

import React from 'react';
import { nanoid } from 'nanoid';

function App() {
  const [notes, setNotes] = React.useState( () => JSON.parse( localStorage.getItem('notes') ) || [] );
  const [currentNoteId, setCurrentNoteId] = React.useState( notes[0] && notes[0].id );

  React.useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])

  const findCurrentNote = () => {
    return notes.find( n => n.id === currentNoteId ) || notes[0];
  }

  const updateNote = (text) => {
    setNotes( oldNotes => oldNotes.map( (n) => {
      if( n.id === currentNoteId ) 
        return { ...n, body: text }
      else 
        return n
    }) );
  }

  const deleteNote = (note) => {
    const newNotes = notes.filter( (n) => n.id !== note.id );
    console.log( newNotes );
    setNotes( oldNotes => oldNotes.filter( (n) => n.id !== note.id ) )
  }

  const createNewNote = () => {
    const newNote = {id: nanoid(), body: ""}
    setNotes( (prevNotes) => [newNote, ...prevNotes] );
    setCurrentNoteId( newNote.id );
  }

  return (
  <main>
    {
        notes.length > 0 
        ?
        <Split 
            sizes={[30, 70]} 
            direction="horizontal" 
            className="split"
        >
          <Sidebar
              notes={notes}
              currentNote={findCurrentNote()}
              setCurrentNoteId={setCurrentNoteId}
              newNote={createNewNote}
              deleteNote={deleteNote}
          />
          {
              currentNoteId && 
              notes.length > 0 &&
              <Editor 
                  currentNote={findCurrentNote()} 
                  updateNote={updateNote} 
              />
          }
        </Split>
        :
        <div className="no-notes">
            <h1>You have no notes</h1>
            <button 
                className="first-note" 
                onClick={createNewNote}
            >
                Create one now
            </button>
        </div>
        
    }
    </main>
  );
}

export default App;
