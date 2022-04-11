const app = require('./app')

const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const Productos = require('./src/api/class/productos')
const storeProd = new Productos()

const historialChat = require('./src/api/class/historialChat')
const historial = new historialChat()

//VER ESTO
io.on('connection', async (socket) => {
    console.log('Un cliente se ha conectado');

    //productos
    socket.emit("productos", storeProd.getAllProductos())
    socket.on("guardarNuevoProducto", (nuevoProducto) => {

        storeProd.saveProductos(nuevoProducto)
        io.sockets.emit("productos", storeProd.getAllProductos())
    })
     
    //mensajes
    const messages = []
    socket.emit("messages", messages)

    socket.on("messegesNew", (nuevoMensaje) => {

        messages.push(nuevoMensaje)
        io.sockets.emit("messages", messages)
    })

    //historial mensajes
    const message = await historial.loadMessage()
    socket.emit('messages', message )
    
    socket.on('messegesNew', async data => {

        await historial.saveMessage(data)
        const message2 = await historial.loadMessage()
        io.sockets.emit('messages', message2 );
   });
});

module.exports = httpServer