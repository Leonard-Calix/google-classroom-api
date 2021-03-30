const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Instructor = require('../models/instructor');

//CRUD -- POST-GET-PUT-DELETE

// Crear nuevo instructor
router.post('/', async (req, res) => {

    const { body } = req;
    let newInstructor = Instructor(body);
    await newInstructor.save();
    res.send(newInstructor);

});

// Obtener todos los intructores
router.get('/', async (req, res) => {

    const id = req.params.id;
    let instructores = await Instructor.find({ }, { nombre: true, correo:true, imagen: true });
    res.send(instructores);

});

// // Obtener todas las Clases
// router.get('/', async (req, res) => {

//     let instructores = await Instructor.find();
//     res.send(instructores);

// });

// Obtener una Clase
router.get('/:id', async (req, res) => {

    const id = req.params.id;
    let instructores = await Instructor.findOne({ _id: id }, { clases: true, imagen: true, nombre:true });
    res.send(instructores);

});


// Agregar una Clase
router.put('/:id/clases', async (req, res) => {

    const id = req.params.id;
    const { body } = req;

    const result = await Instructor.updateOne({
        _id: mongoose.Types.ObjectId(id)
    },
        {
            $push: {
                clases: {
                    _id: mongoose.Types.ObjectId(),
                    nombreClase: body.nombreClase,
                    codigo: body.codigo,
                    seccion: body.seccion,
                    descripcion: body.descripcion,
                    participantes: [],
                    anuncios: [],
                    asignaciones: []
                }
            }
        });

    if (result.nModified == 1) {
        res.send({ ok: true, mensaje: 'Clases agregada con exito' });

    }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7

// Agregar participantes

router.put('/:id/clases/:idClase/participantes', async (req, res) => {

    const { id, idClase } = req.params;
    const { body } = req;

    const result = await Instructor.updateOne({
        _id: mongoose.Types.ObjectId(id),
        "clases._id": mongoose.Types.ObjectId(idClase)
    },
        {
            $push: {
                "clases.$.participantes": {
                    _id: mongoose.Types.ObjectId(),
                    nombre: body.nombre,
                    correo: body.correo,
                    imagen: body.imagen,
                }
            }
        });

    if (result.nModified == 1) {
        res.send({ ok: true, participante: body });
    }
});

// AGREGAR UN ANUNCIO

router.put('/:id/clases/:idClase/anuncios', async (req, res) => {

    const { id, idClase } = req.params;
    const { body } = req;

    const result = await Instructor.updateOne({
        _id: mongoose.Types.ObjectId(id),
        "clases._id": mongoose.Types.ObjectId(idClase)
    },
        {
            $push: {
                "clases.$.anuncios": {
                    _id: mongoose.Types.ObjectId(),
                    mensaje: body.mensaje,
                    fecha: new Date()
                }
            }
        });

    if (result.nModified == 1) {
        res.send({
            ok: true, anuncio: {
                mensaje: body.mensaje,
                fecha: new Date()
            }
        });
    }
});

// AGREGAR UN ASIGNACION

router.put('/:id/clases/:idClase/asignaciones', async (req, res) => {

    const { id, idClase } = req.params;
    const { body } = req;

    const result = await Instructor.updateOne({
        _id: mongoose.Types.ObjectId(id),
        "clases._id": mongoose.Types.ObjectId(idClase)
    },
        {
            $push: {
                "clases.$.asignaciones": {
                    _id: mongoose.Types.ObjectId(),
                    nombre: body.nombre,
                    descripcion: body.descripcion,
                    fecha_limite: body.fecha_limite,
                }
            }
        });

    if (result.nModified == 1) {
        res.send({
            ok: true, asignacion: body
        });
    }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// OBTENER LOS ANUNCIOS DE UNA CLASES

router.get('/:id/clases/:idClase/anuncios', async (req, res) => {

    const { id, idClase } = req.params;

    const dataAnuncios = await Instructor.findOne({
        _id: mongoose.Types.ObjectId(id),
        "clases._id": mongoose.Types.ObjectId(idClase)
    }, {
        "clases.$.anuncios": true
    });

    let { clases } = dataAnuncios;
    let { anuncios } = clases[0];

    res.send(anuncios);
});


// OBTENER LOS PARTICIPANTES DE UNA CLASES

router.get('/:id/clases/:idClase/participantes', async (req, res) => {

    const { id, idClase } = req.params;

    const data = await Instructor.findOne({
        _id: mongoose.Types.ObjectId(id),
        "clases._id": mongoose.Types.ObjectId(idClase)
    }, {
        "clases.$.participantes": true
    });

    let { clases } = data;
    let { participantes } = clases[0];

    res.send(participantes);
});

// OBTENER LOS ASIGNACIONES DE UNA CLASES

router.get('/:id/clases/:idClase/asignaciones', async (req, res) => {

    const { id, idClase } = req.params;

    const data = await Instructor.findOne({
        _id: mongoose.Types.ObjectId(id),
        "clases._id": mongoose.Types.ObjectId(idClase)
    }, {
        "clases.$.asignaciones": true
    });

    let { clases } = data;
    //let clases  = data.clases
    let { asignaciones } = clases[0];
    //let asignaciones = clases[0].asignaciones;

    res.send(asignaciones);
});

module.exports = router;


