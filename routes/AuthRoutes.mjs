import express from 'express'
import { registerController, loginController, logoutController } from '../controller/AuthControlles.mjs'
import {loginValidator, registerValidator} from '../middleware/validationRules.mjs'
import { loginLimiter, registerLimiter } from '../middleware/rateLimit.mjs';

const router = express.Router();

router.post('/register', registerValidator, registerLimiter, registerController)
router.post('/login', loginLimiter, loginLimiter, loginController)
router.post('/logout', logoutController)

export default router;