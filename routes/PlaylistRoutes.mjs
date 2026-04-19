import express from 'express';
import {
    obtenerPlaylistController,
    crearPlaylistController,
    eliminarPlaylistController,
    agregarCancionController,
    eliminarCancionController,
    editarPlaylistController,
    buscarPlaylists
} from '../controller/PlaylistController.mjs';

import { authenticateToken, hasPermission, esPropietario } from '../middleware/authMiddleware.mjs';
import {playlistValidator} from '../middleware/validationRules.mjs'
import { readLimiter, writeLimiter } from '../middleware/rateLimit.mjs';

const router = express.Router();

router.get('/buscar', authenticateToken, readLimiter, buscarPlaylists)

router.get('/:id', authenticateToken, readLimiter, hasPermission('read:playlists'), obtenerPlaylistController)

router.post('/crear', authenticateToken, writeLimiter, hasPermission('create:playlist'), playlistValidator, crearPlaylistController);
router.post('/:id/cancion/:idCancion', authenticateToken, writeLimiter, esPropietario, hasPermission('update:playlist') , agregarCancionController);

router.put('/actualizar/:id', authenticateToken, writeLimiter, esPropietario, hasPermission('update:playlist'), playlistValidator, editarPlaylistController);

router.delete('/:id/cancion/:idCancion', authenticateToken, writeLimiter, esPropietario, hasPermission('update:playlist') , eliminarCancionController)
router.delete('/eliminar/:id', authenticateToken, writeLimiter, esPropietario, hasPermission('delete:playlist') , eliminarPlaylistController)


export default router;