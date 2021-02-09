'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Persona extends Model {
static get table(){
    return 'personas'
}
comentario () {
    return this.hasMany('App/Models/Comentario')
  }
}

module.exports = Persona
