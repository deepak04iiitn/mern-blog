import express from 'express';
import { signup } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup' , signup);           // we use post method when we want to create something

export default router;