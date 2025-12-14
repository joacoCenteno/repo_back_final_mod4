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


const router = express.Router();

router.get('/buscar', authenticateToken, buscarPlaylists)

router.get('/:id', authenticateToken, hasPermission('read:playlists') , obtenerPlaylistController)

router.post('/crear', authenticateToken, hasPermission('create:playlist') , crearPlaylistController);
router.post('/:id/cancion/:idCancion', authenticateToken, esPropietario, hasPermission('update:playlist') , agregarCancionController);

router.put('/actualizar/:id', authenticateToken, esPropietario, hasPermission('update:playlist') , editarPlaylistController);

router.delete('/:id/cancion/:idCancion', authenticateToken, esPropietario, hasPermission('update:playlist') , eliminarCancionController)
router.delete('/eliminar/:id', authenticateToken, esPropietario, hasPermission('delete:playlist') , eliminarPlaylistController)


export default router;