'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Comentario extends Model {
    static get table(){
        return 'comentarios'
    }
    Personas () {
        return this.belongsToMany('App/Models/Persona')
      }
      Productos () {
        return this.belongsToMany('App/Models/Producto')
      }
}

module.exports = Comentario
