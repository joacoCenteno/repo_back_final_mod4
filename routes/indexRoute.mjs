import SongRoutes from './SongRoutes.mjs';
import PlaylistRoutes from './PlaylistRoutes.mjs';
import AuthRoutes from './AuthRoutes.mjs'
import UserRoutes from './UserRoutes.mjs'
import express from 'express';

const router = express.Router();

router.use('/canciones', SongRoutes)
router.use('/playlists', PlaylistRoutes)
router.use('/auth', AuthRoutes)
router.use('/user', UserRoutes)

export default router;