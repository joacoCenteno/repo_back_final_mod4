import express from 'express';
import {
  obtenerInformacionUsuarioController,
  crearUsuarioController,
  actualizarUsuarioController,
  eliminarUsuarioController
} from '../controller/UserController.mjs';


import { authenticateToken, hasPermission } from '../middleware/authMiddleware.mjs';


const router = express.Router();

router.get('/me', authenticateToken, obtenerInformacionUsuarioController)

router.post('/crear', authenticateToken, hasPermission('create:usuario') , crearUsuarioController);

router.put('/actualizar/:id', authenticateToken, hasPermission('update:usuario') , actualizarUsuarioController);

router.delete('/eliminar/:id', authenticateToken, hasPermission('delete:usuario') , eliminarUsuarioController)



export default router;