'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PersonasSchema extends Schema {
  up () {
    this.create('personas', (table) => {
      table.increments()
      table.string('Foto')
      table.string('Nombre')
      table.string('ApellidoPaterno')
      table.string('ApellidoMaterno')
      table.string('Sexo')
      table.integer('Edad')
      table.integer('Telefono')
      table.integer('Usuario').unsigned().references('Id').inTable('users')


      table.timestamps()
    })
  }

  down () {
    this.drop('personas')
  }
}

module.exports = PersonasSchema
