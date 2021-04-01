/*npm i nodemon -D, o -D representa uma dependencia de desenvolvimento,ou seja, só nessa pasta ira funcionar */
/*npm i ejs, modelo de pagina(template) */

/*virou uma function*/
const express = require("express")
const server = express()
const routes = require("./routes")

//template ejs
server.set("view engine", 'ejs')

//habilitar arquivos statics
server.use(express.static("public"))

//usar o req.body
server.use(express.urlencoded({extended: true}))

//routes
server.use(routes)

server.listen(3000, () => console.log('rodando'))