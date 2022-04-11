const selectProductos = require('../../db/mariaDB/select')
const insertProducto = require('../../db/mariaDB/insert')

class ContenedorProductos{
    // constructor(){
    //     // this.products = []
    // }

    async getAllProductos(){
        try {
            return await selectProductos()
        } catch(error){
            throw new Error(`Se produjo un error en getAllProductos: ${error.message}`)
        }
    }

    async saveProductos(producto){
        try{
            const newProducto = {
                title: producto.title,
                price: producto.price,
                url: producto.url,
            }
            await insertProducto(newProducto)
            return newProducto

        } catch(error){
            throw new Error(`Se produjo un error al guardar el nuevo producto: ${error.message}`)
        }
    }

    // getById(idProducto){
    //     try {
    //         return this.products.find(prod => prod.id == parseInt(idProducto))
    //     } catch(error){
    //         throw new Error('Hubo un error al buscar')
    //     }
    // }


    // update(idProducto, title, price){
    //     try {
    //         const product = {
    //             title: title,
    //             price: price,
    //             thumbnail: "imagen",
    //             id: idProducto
    //         } ;
    //         const updateI = this.products.findIndex((prod) => prod.id == idProducto)
    //         this.products[updateI] = product;
    //         return product;
    //     } catch(error){
    //         throw new Error(`Ocurrió un error al actualizar: ${error.message}`)
    //     }
    // }

    // delete(idProducto){
    //     try {
    //         const deleteI = this.products.findIndex((prod) => prod.id === idProducto)

    //         if (deleteI === -1 ){
    //             return -1
    //         } else{
    //             const deleteData = this.products.splice(deleteI,1)
    //             return deleteData
    //         }
    //     }catch (error) {
    //         console.log("Error " + error)
    //     }
    // }
}

module.exports = ContenedorProductos
