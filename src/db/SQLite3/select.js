const { options } = require ('./optionsSQLite3')
const knex = require('knex')(options)

async function selectMensajes() {
    
    const list = await knex.from('mensajes').select('*')
    return list
}

module.exports = selectMensajes