import React from 'react'
import { useContext } from 'react'
import noteContext from '../context/noteContext';
import { useState } from 'react';

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [newNote, setnewNote] = useState({ title: "", description: "", tag: "" })



    const handleClick = (e) => {
        e.preventDefault();
        addNote(newNote.title, newNote.description, newNote.tag)
        setnewNote({ title: "", description: "", tag: "" })
        props.showAlert("success", "Note added successfully!")
    }



    const onChange = (e) => {
        setnewNote({ ...newNote, [e.target.name]: e.target.value })
    }


    return (
        <div className="container my-3">
            <h2>Add a Note</h2>

            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={newNote.title} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />

                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={newNote.description} onChange={onChange} minLength={5} required />

                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={newNote.tag} onChange={onChange} minLength={5} required />

                </div>
                <button disabled={newNote.title.length < 5 || newNote.description.length < 5} type="submit" onClick={handleClick} className="btn btn-primary">Add note</button>
            </form>
        </div>
    )
}

export default AddNote