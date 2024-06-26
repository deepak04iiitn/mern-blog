import express from 'express';
import { test } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/test' , test);         // logic for test is written in controllers to make it look clean

export default router;