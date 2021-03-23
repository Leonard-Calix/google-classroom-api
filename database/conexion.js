var mongoose = require("mongoose");
var servidor = "localhost:27017";
var nombreBaseDatos ="classroom";

class Database{
    constructor(){
        this.conectar();
    }

    conectar(){
        mongoose.connect(`mongodb://${servidor}/${nombreBaseDatos}`, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        .then(()=>{
            console.log("Se conecto a la base de datos...");
        })
        .catch(error=>{
            console.error(JSON.stringify(error));   
        });
    }
}

module.exports = new Database();