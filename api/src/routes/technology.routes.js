import express from 'express';
import { questionTechnology } from '../controllers/technology.controller.js';

const router = express.Router();

router.post('/question', questionTechnology)

export default router