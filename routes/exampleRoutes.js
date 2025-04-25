import express from 'express';
import { loadHome, chooseAddress, } from '../controllers/exampleController.js';

const router = express.Router();

router.get('/', loadHome);

router.post('/submitnew', chooseAddress)



export default router;