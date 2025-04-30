import express from 'express';
import { loadHome, addInstrument, confirmChange, deleteInstrument} from '../controllers/controller.js';

const router = express.Router();

router.get('/', loadHome);

router.post('/submitnew', addInstrument)
router.get('/confirm/:id', confirmChange)
router.get('/delete/:id', deleteInstrument)



export default router;