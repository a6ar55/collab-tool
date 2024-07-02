import express from 'express'
import { signin, signup, google } from '../controllers/authController.js';

const router = express.Router();

router.post('/signin',signin);
router.post('/google',google);
router.post('/signup',signup)

export default router;