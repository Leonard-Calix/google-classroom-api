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

// Obtener las Clases
router.get('/', async (req, res) => {

    let instructores = await Instructor.find();
    res.send(instructores);

});

// Obtener una Clases
router.get('/:id', async (req, res) => {

    const id = req.params.id;
    let instructores = await Instructor.findOne({ _id: id }, {});
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
        res.send({mensaje : 'Clases agregada con exito'});

    }


});


module.exports = router;


