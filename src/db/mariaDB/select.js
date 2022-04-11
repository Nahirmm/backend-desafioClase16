const { options } = require ('./optionsMariaDB')
const knex = require('knex')(options)

async function selectProductos() {
    await knex.from('productos').select('*')
        .then((rows) => {
            for (row of rows) {
                console.log(`${row['id']} ${row['title']} ${row['price']} ${row['url']}`);
            }
            return rows
        }).catch((err) => { console.log(err); throw err });
}



module.exports = selectProductos