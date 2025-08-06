import { Router } from 'express'
import {createNote , getNote ,updateNote} from '../controllers/notes.controller.js'

const router = Router()


// POST | /notes |  Create a new note
router.post('/' , createNote)
// GET |  /notes/:id |  Fetch note by ID
router.get('/:id' , getNote)

// PUT | /notes/:id |  Update note contents
router.put('/:id' ,updateNote)

export default router;