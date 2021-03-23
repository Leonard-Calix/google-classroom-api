const { model, Schema } = require('mongoose');

let instructor = new Schema({
    nombre: String,
    correo: String,
    imagen: String,
    clases: { type: Array, default: [] }
});

module.exports = model('Instructor', instructor);