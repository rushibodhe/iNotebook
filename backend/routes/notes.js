const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');





// ROUTE 1: Get all the notes: GET ("api/notes/fetchallnotes") Login required:
router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {

        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    }

    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }
})




// ROUTE 2: Add a new notes using: POST ("api/notes/addnote") Login required:
router.post('/addnote', fetchuser,

    [
        body('title', 'Title length must be atleast 3 characters').isLength({ min: 3 }),
        body('description', 'Description must be at least 5 characters').isLength({ min: 5 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { title, description, tag } = req.body;

            const note = new Note({
                title, description, tag, user: req.user.id
            })

            const savedNote = await note.save();
            res.json(savedNote)
        }
        catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error")
        }
    })







// ROUTE 3: Update an existing notes using: "PUT" ("api/notes/updatenote") Login required:

router.put('/updatenote/:id', fetchuser,
    async (req, res) => {
        const { title, description, tag } = req.body;
        try {



            const newNote = {};


            if (title) { newNote.title = title };


            if (description) { newNote.description = description };


            if (tag) { newNote.tag = tag };





            let note = await Note.findById(req.params.id);

            if (!note) { return res.status(404).send("Not found") }

            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("Not allowed")
            }





            note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
            res.send({ note });
        }
        catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error")
        }
    })






// ROUTE 4: Delete an existing notes using: "DELETE" ("api/notes/deletenote") Login required:
router.delete('/deletenote/:id', fetchuser,

    async (req, res) => {
        try {
            let note = await Note.findById(req.params.id);

            if (!note) { return res.status(404).send("Not found") }

            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("Not allowed")
            }




            note = await Note.findByIdAndDelete(req.params.id)
            res.send({ "Success": "Note has been deleted", note: note });
        }
        catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error")
        }
    })


module.exports = router 