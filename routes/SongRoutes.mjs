import express from 'express';
import {
    obtenerCancionController,
    obtenerTodasCancionesController,
    crearCancionController,
    eliminarCancionController,
    actualizarCancionController,
    obtenerPorGeneroController
} from '../controller/SongController.mjs';


const router = express.Router();

router.get('/canciones/filtros', obtenerPorGeneroController)
router.get('/canciones', obtenerTodasCancionesController);
router.get('/cancion/:id', obtenerCancionController);


router.post('/cancion/crear', crearCancionController);

router.put('/cancion/actualizar/:id', actualizarCancionController);

router.delete('/cancion/eliminar/:id', eliminarCancionController)

export default router;