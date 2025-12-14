import mongoose from "mongoose";
import Permisos from '../models/PermisosModel.mjs'
import Role from '../models/Role.mjs'
import {connectDB} from '../config/dbConfig.mjs';


const initialPermissions = [
    {
        nombre: 'read:canciones',
        descripcion: 'Puede ver canciones'
    },
    {
        nombre: 'create:canciones',
        descripcion: 'Puede crear canciones'
    },
    {
        nombre: 'update:canciones',
        descripcion: 'Puede actualizar canciones'
    },
    {
        nombre: 'delete:canciones',
        descripcion: 'Puede eliminar canciones'
    },
    {
        nombre: 'read:playlists',
        descripcion: 'Puede ver playlist'     
    },
    {
        nombre: 'create:playlist',
        descripcion: 'Puede crear playlist'
    },
    {
        nombre: 'delete:playlist',
        descripcion: 'Puede eliminar playlist'
    }
];

const initialRoles = [
    {
        name: 'user',
        description: 'Usuario básico',
        permissions: ['read:canciones','read:playlists','create:playlist','delete:playlist']
    },
    {
        name: 'admin',
        description: 'Administrador del sistema',
        permissions: ['read:canciones', 'create:canciones', 'update:canciones', 'delete:canciones','read:playlists','create:playlist','delete:playlist']
    }
];

async function initializeRolesAndPermissions() {
    try {
        await connectDB()
        console.log('Conectado a MongoDB');

        // Limpiar colecciones existentes
        await Permisos.deleteMany({});
        await Role.deleteMany({});
        console.log('Colecciones limpiadas');

        // Crear permisos
        const createdPermissions = await Permisos.insertMany(initialPermissions);
        console.log('Permisos creados exitosamente');

        // Crear mapa de permisos
        const permissionsMap = createdPermissions.reduce((map, permission) => {
            map[permission.nombre] = permission._id;
            return map;
        }, {});

        // Crear roles con referencias a permisos
        const rolesToCreate = initialRoles.map(role => ({
            name: role.name,
            description: role.description,
            permissions: role.permissions.map(permName => permissionsMap[permName])
        }));

        await Role.insertMany(rolesToCreate);
        console.log('Roles creados exitosamente');

    } catch (error) {
        console.error('Error inicializando roles y permisos:', error);
    } finally {
        await mongoose.disconnect();
    }
}

initializeRolesAndPermissions();