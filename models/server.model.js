const express = require('express')
const cors = require('cors');
const express_fileupload = require('express-fileupload');

// const { dbconnection } = require('../database/config.db')

class Server {
    constructor(){
        this.app = express()
        this.port = process.env.PORT        

        this.server = require('http').createServer(this.app)
        
        //Todo: Conectar a la base de datos
        // this.connectDB()

        //Todo: Middlewares
        this.middlewares()

        //Todo: rutas de la aplicacion
        this.routes()
        
    }

    // async connectDB(){
    //     await dbconnection()
    // }

    middlewares(){
        // CORS
        this.app.use(cors({
            origin: '*', // Puedes ajustar esto según tus necesidades
            methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
            credentials: true,
        }));

        // Lectura y parseo del body
        this.app.use(express.json())

        // Directorio publico
        //this.app.use(express.static('public'))

        this.app.use(express_fileupload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }    

    routes(){ //todo: Rutas 
        this.app.use(process.env.BASE_URL_UPLOADS, require('../routes/uploads.routes'))
        this.app.use(process.env.BASE_URL_GENERATE_PDF, require('../routes/generate_file.router'))
        // // this.app.use(this.paths.buscar, require('../routes/search.routes'))
        // this.app.use(process.env.BASE_URL_PRODUCTOS, require('../routes/products.routes'))
        // this.app.use(process.env.BASE_URL_TIPOPRODUCTO, require('../routes/tipo_producto.routes'))
        // this.app.use(process.env.BASE_URL_TIPOEMPRENDIMIENTO, require('../routes/tipo_emprendimiento.routes'))
        // this.app.use(process.env.BASE_URL_EMPRENDIMIENTO, require('../routes/emprendimiento.routes'))
        // this.app.use(process.env.BASE_URL_TIPOENTREGA, require('../routes/tipo_entrega.routes'))
        // this.app.use(process.env.BASE_URL_ROL, require('../routes/role.routes'))
        // this.app.use(process.env.BASE_URL_UPLOADS, require('../routes/uploads.routes'))
        // this.app.use(process.env.BASE_URL_USUARIO, require('../routes/user.routes'))
        // this.app.use(process.env.BASE_URL_ESTATUS, require('../routes/estatus.routes'))
        // this.app.use(process.env.BASE_URL_CENTROSUNIVERSITARIOS, require('../routes/centros_universitarios.routes'))
    }

    listen() {
        this.server.listen(this.port, () => console.log(`Example app listening on port ${this.port}`))
    }
}

module.exports = Server