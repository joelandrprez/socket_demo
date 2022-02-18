const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app            = express();
        this.port           = process.env.PORT;
        this.usuariosPath   = '/api/usuarios';
        this.server         = require('http').createServer(this.app)
        this.io             = require('socket.io')(this.server)

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        //Socket
        this.sockets();
    }
    sockets(){
        this.io.on("connection", socket => {
            console.log('cliente conectado',socket.id);
            socket.on('disconnect',()=>{
                console.log('Desconectado');
            })
            socket.on('enviar-mensaje',(payload)=>{
                payload.msg='paso por el servidor'
                this.io.emit('enviar',payload)
            })
        })
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

    }
    routes() {
        // this.app.use( this.usuariosPath, require('../routes/usuarios'));
    }

    listen() {
        this.server.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;