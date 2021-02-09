'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Producto extends Model {
    static get table(){
        return 'productos'
    }
    comentario () {
        return this.hasMany('App/Models/Comentario')
      }
}

module.exports = Producto
