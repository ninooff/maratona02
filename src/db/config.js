const sqlite3 = require('sqlite3');
const { open } = require('sqlite'); // inves de pegar toda o modulo, importa apenas a funcionalidade desejada

module.exports = () => 
    open({
        filename: "./database.sqlite",
        driver: sqlite3.Database
    })

