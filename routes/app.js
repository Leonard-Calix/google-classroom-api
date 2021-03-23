const express = require('express');
const router = express.Router();

//CRUD -- POST-GET-PUT-DELETE

router.get('/', (req, res)=>{
    res.send({ mensaje : 'GET'});
});

router.post('/', (req, res)=>{
    res.send({ mensaje : 'POST'});
});

router.put('/', (req, res)=>{
    res.send({ mensaje : 'PUT'});
});

router.delete('/', (req, res)=>{
    res.send({ mensaje : 'DELETE'});
});

module.exports = router;


