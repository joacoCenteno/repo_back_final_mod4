import express from 'express'
import { registerController, loginController, forgotPasswordController, resetPasswordController } from '../controller/AuthControlles.mjs'
import {loginValidator, registerValidator} from '../middleware/validationRules.mjs'
import { loginLimiter, registerLimiter, forgotPasswordLimiter } from '../middleware/rateLimit.mjs';

const router = express.Router();

router.post('/register', registerValidator, registerLimiter, registerController)
router.post('/login', loginValidator, loginLimiter, loginController)
router.post('/forgot-password', forgotPasswordLimiter, forgotPasswordController)
router.post('/reset-password/:token', resetPasswordController)

export default router;