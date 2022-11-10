import NoteContext from "./noteContext";
import { useState } from "react";


const NoteState = (props) => {

    const host = "http://localhost:5000";


    const notesInitial = [
    ]


    const [notes, setNotes] = useState(notesInitial)


    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json();
        console.log(json);
        setNotes(json);

    }


    const addNote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();




        setNotes(notes.concat(note))
    }





    // Creating deleteNote function:
    const deleteNote = async (id) => {
        console.log('Deleted the note with id: ', id);

        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });

        const json = response.json();
        console.log(json);

        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes);
    }






    // Creating editNote function:
    const editNote = async (id, title, description, tag) => {

        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });

        const json = await response.json();

        console.log(json);



        // Creating deep copy of notes jene karun notes jar edit zalya tar tya immediately frontend la display hotil using forloop:
        let editedNote = JSON.parse(JSON.stringify(notes));

        // Logic to edit in clientside:
        for (let index = 0; index < editedNote.length; index++) {
            const element = editedNote[index];


            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
                break;
            }
        }
        setNotes(editedNote)

    }






    return (
        <NoteContext.Provider value={{ notes, getNotes, addNote, deleteNote, editNote }} >
            {props.children}
        </NoteContext.Provider >
    )
}
export default NoteState  