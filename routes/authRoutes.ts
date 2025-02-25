import express from 'express'
import { register, login, googleLogin } from '../controllers/authController';


const router = express.Router()

router.post("/signup", register);
router.post("/login", login);

router.post("/google", googleLogin)

export default router;

