const moment = require('moment')
const insertMensaje = require('../../db/SQLite3/insert')
const selectMensajes = require('../../db/SQLite3/select')
 
class historialChat{
//    constructor(route){
//        this.message= [];
//    }
 
    async loadMessage(){
        try{
            const listaMensajes = await selectMensajes()
            return listaMensajes
        }catch(e){
            //throw new Error(`Se produjo un error en loadMessage: ${e.message}`)
            console.log(e)
        }
    }

   async saveMessage(data){
        try{
           const newMessage = {
               email: data.email,
               textoMensaje: data.textoMensaje,
               date: moment().format('L LTS')
           }
           await insertMensaje(newMessage)
           return newMessage
        }catch(e){
            throw new Error(`Se produjo un error al guardar un nuevo mensaje: ${e.message}`)
        }
    }
}
 
module.exports = historialChat