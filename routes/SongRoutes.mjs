import express from 'express';
import {
    obtenerCancionController,
    obtenerTodasCancionesController,
    crearCancionController,
    eliminarCancionController,
    actualizarCancionController,
    obtenerPorGeneroController,
    obtenerRecientesController,
    buscarCanciones
} from '../controller/SongController.mjs';

import { authenticateToken, hasPermission } from '../middleware/authMiddleware.mjs';
import {musicValidator} from '../middleware/validationRules.mjs'
import { writeLimiter, readLimiter } from '../middleware/rateLimit.mjs';

const router = express.Router();

router.get('/buscar', authenticateToken, readLimiter, buscarCanciones)

router.get('/recientes', obtenerRecientesController)
router.get('/filtros', authenticateToken, readLimiter, hasPermission('read:canciones') , obtenerPorGeneroController)
router.get('/', obtenerTodasCancionesController);
router.get('/:id', authenticateToken, readLimiter, hasPermission('read:canciones') , obtenerCancionController);



router.post('/crear', authenticateToken, writeLimiter, hasPermission('create:canciones'), musicValidator, crearCancionController);

router.put('/actualizar/:id', authenticateToken, writeLimiter, hasPermission('update:canciones'), musicValidator, actualizarCancionController);

router.delete('/eliminar/:id', authenticateToken, writeLimiter, hasPermission('delete:canciones') , eliminarCancionController)

export default router;