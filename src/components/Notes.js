import React, { useEffect } from 'react'
import { useState } from 'react';
import { useRef } from 'react';
import { useContext } from 'react'
import noteContext from '../context/noteContext';
import AddNote from './AddNote';
import Noteitem from './Noteitem';
import { useNavigate } from 'react-router-dom'


const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;

    const navigate = useNavigate();


    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes()
        }
        else {
            navigate('/login')
        }
        // eslint-disable-next-line
    }, [])


    const ref = useRef(null)

    const refClose = useRef(null)


    const [newNote, setnewNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })



    const updateNote = (currentNote) => {

        ref.current.click()



        setnewNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })





    }


    const handleClick = (e) => {
        console.log('Updating the note...', newNote);

        e.preventDefault();


        editNote(newNote.id, newNote.etitle, newNote.edescription, newNote.etag);


        refClose.current.click()


        props.showAlert("success", "Note edited successfully!")
    }


    const onChange = (e) => {
        setnewNote({ ...newNote, [e.target.name]: e.target.value })
    }


    const { showAlert } = props
    return (
        <>

            <AddNote showAlert={showAlert} />

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>

                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={newNote.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={newNote.edescription} onChange={onChange} minLength={5} required />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={newNote.etag} onChange={onChange} minLength={5} required />

                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>

                            <button disabled={newNote.etitle.length < 5 || newNote.edescription.length < 5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className='row my-3'>
                <h2>Your Notes</h2>

                <div className="container">
                    {notes.length === 0 && 'No notes to display'}
                </div>

                {notes.map((note, index) => {
                    return <Noteitem key={index} note={note} updateNote={updateNote} showAlert={showAlert} />

                })}
            </div>
        </>
    )
}

export default Notes