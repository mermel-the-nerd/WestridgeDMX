import express from 'express';
import { loadHome, addInstrument, confirmChange} from '../controllers/controller.js';

const router = express.Router();

router.get('/', loadHome);

router.post('/submitnew', addInstrument)
router.get('/confirm/:id', confirmChange)



export default router;