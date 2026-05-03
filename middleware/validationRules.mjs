import {body, validationResult} from 'express-validator'

const validateResults = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    next();
}

export const registerValidator = [
    body('email')
    .notEmpty().withMessage('Email es requerido')
    .isEmail().withMessage('Formato de email invalido'),
    body('password')
    .notEmpty().withMessage('Contraseña es requerida')
    .isLength({min:8}).withMessage('Contraseña debe tener al menos 8 caracteres'),
    body('username')
    .trim()
    .notEmpty().withMessage('Username requerido'),
    validateResults
]

export const loginValidator = [
  body('email')
    .notEmpty().withMessage('Email es requerido')
    .isEmail().withMessage('Formato de email invalido'),

  body('password')
    .notEmpty().withMessage('Contraseña es requerida'),

  validateResults
];

export const playlistValidator = [
    body('nombre').notEmpty().withMessage('Nombre de playlist requerido'),
    body('imagen')
    .optional({checkFalsy: true})
    .matches(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))$/i)
    .withMessage('Debes ingresar una URL de imagen válida (http/https y extensión .jpg, .png, etc.)'),
    validateResults
]

export const musicValidator = [
    body('titulo').notEmpty().withMessage('Titulo es requerido'),
    body('artista').notEmpty().withMessage('Artista es requerido'),
    body('album').notEmpty().withMessage('Album es requerido'),
    body('duracion')
    .notEmpty().withMessage('Duracion es requerido')
    .toInt()
    .isInt({ gt: 0 }).withMessage('Duración debe ser mayor a 0'),
    body('generos')
    .notEmpty().withMessage("Generos es requerido")
    .customSanitizer(value =>{
        if(typeof value == 'string'){
            return value.split(',').map(item => item.trim()).filter(Boolean);
        }
        if(Array.isArray(value)){
            return value.map(item => (typeof item === 'string' ? item.trim() : item)).filter(Boolean);
        }

        return value || [];
        
    })
    .isArray({min:1}).withMessage("Debe existir al menos un genero"),
    body('imagen')
    .notEmpty().withMessage("Imagen es requerida")
    .matches(/^https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg)$/i).withMessage("Debes ingresar una URL de imagen válida (http/https y extensión .jpg, .png, etc.)"),
    body('url')
    .notEmpty().withMessage("URL es requerido")
    .matches(/^(https?:\/\/.*\.(?:mp3|wav|ogg))$/i).withMessage('Debes ingresar una URL de audio válida (http/https y extensión .mp3, .wav, .ogg)'),
    validateResults
] 