var mysql = require("mysql");

const POOL = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    database: "projects",
    user: "gestor",
    password: "1qazZAQ!"
});

if (POOL!=null)
    console.log("Connexió establerta i pool creat");

module.exports=POOL;