import React from "react";

function getNoteTitle(body) {
  const titleCandidate = body.split("\n")[0].replaceAll("#",'').trim();
  return titleCandidate === "" ? "New item" : titleCandidate;
}

export default function Sidebar( {notes, newNote, setCurrentNoteId, currentNote, deleteNote} ) {

  const printNotes = notes.map( n => <li 
    className={`sidebar--note title ${currentNote.id === n.id ? "selected-note" : ""}`}
    key={n.id} 
    onClick={()=>setCurrentNoteId(n.id)}
    >
      <h3>{getNoteTitle(n.body)}</h3>
      <button 
        className="button-note red" 
        onClick={() => {if(window.confirm('Do you really want to delete this note?')) deleteNote(n)}}>-</button>
    </li>
  )

  return (
    <section className="pane sidebar">
      <div className="sidebar--header">
        <h1>My Notes</h1>
        <div><button className="button-note" onClick={newNote}>+</button></div> 
      </div>
      <ul>
        {printNotes}
      </ul>
    </section>
  )
}