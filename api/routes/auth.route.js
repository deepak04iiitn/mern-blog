import express from 'express';
import { google, signin, signup } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup' , signup);           // we use post method when we want to create something
router.post('/signin' , signin);
router.post('/google' , google);

export default router;