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


const router = express.Router();

router.get('/buscar', authenticateToken, buscarCanciones)

router.get('/recientes', obtenerRecientesController)
router.get('/filtros', authenticateToken, hasPermission('read:canciones') , obtenerPorGeneroController)
router.get('/', obtenerTodasCancionesController);
router.get('/:id', authenticateToken, hasPermission('read:canciones') , obtenerCancionController);



router.post('/crear', authenticateToken, hasPermission('create:canciones') , crearCancionController);

router.put('/actualizar/:id', authenticateToken, hasPermission('update:canciones') , actualizarCancionController);

router.delete('/eliminar/:id', authenticateToken, hasPermission('delete:canciones') , eliminarCancionController)

export default router;