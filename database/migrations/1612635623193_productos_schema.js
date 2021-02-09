'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductosSchema extends Schema {
  up () {
    this.create('productos', (table) => {
      table.increments()
      table.string('Foto')
      table.string('Nombre')
      table.string('Descripcion')
      table.date('Fechadeexpiracion')
      table.integer('Existenciadecantidad')
      table.integer('Persona').unsigned().references('Id').inTable('personas')
      table.timestamps()
    })
  }

  down () {
    this.drop('productos')
  }
}

module.exports = ProductosSchema
