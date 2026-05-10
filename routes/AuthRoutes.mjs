import express from 'express'
import { registerController, loginController } from '../controller/AuthControlles.mjs'
import {loginValidator, registerValidator} from '../middleware/validationRules.mjs'
import { loginLimiter, registerLimiter } from '../middleware/rateLimit.mjs';

const router = express.Router();

router.post('/register', registerValidator, registerLimiter, registerController)
router.post('/login', loginLimiter, loginLimiter, loginController)

export default router;