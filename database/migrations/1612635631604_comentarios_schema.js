'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ComentariosSchema extends Schema {
  up () {
    this.create('comentarios', (table) => {
      table.increments()
      table.string('Titulo')
      table.integer('persona').unsigned().references('Id').inTable('personas')
      table.integer('producto').unsigned().references('Id').inTable('productos')
      table.string('Texto')

      table.timestamps()
    })
  }

  down () {
    this.drop('comentarios')
  }
}

module.exports = ComentariosSchema
