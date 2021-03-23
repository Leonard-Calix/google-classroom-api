const exprees = require('express');
const cors = require('cors');
const database = require('./database/conexion');

const app = exprees();

app.use(exprees.urlencoded({extended: true}));
app.use(exprees.json());
app.use(cors());
app.use(exprees.static('public'));

// importar rutas
var rutaApp = require('./routes/app');
var rutaInstructor = require('./routes/instructor');


// Usar rutas
app.use('/app', rutaApp);
app.use('/instructor', rutaInstructor);


app.listen(3000, ()=>{ console.log('Server on port http://localhost:3000') });