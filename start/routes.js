'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('User/','UsuarioController.store')//.middleware(['cantidad'])
Route.post('login/','UsuarioController.login')//.middleware(['cantidad'])

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.group(()=>{
  Route.get('show/:id?','UsuarioController.getUser')
  Route.get('User/:id?','UsuarioController.index')
  Route.delete('User/:id','UsuarioController.Delete')

  Route.post('Persona/','PersonaController.store')
  Route.get('Persona/:id?','PersonaController.index')
  Route.delete('Persona/:id','PersonaController.Delete')
  Route.put('Persona/:id','PersonaController.Update')
  
  Route.post('Producto/','ProductoController.store')
  Route.get('Producto/:id?','ProductoController.index')
  Route.delete('Producto/:id','ProductoController.Delete')
  Route.put('Producto/:id','ProductoController.Update')

  Route.post('Comentario/','ComentarioController.store')
  Route.get('Comentario/:id?','ComentarioController.index')
  Route.delete('Comentario/:id','ComentarioController.Delete')
  Route.put('Comentario/:id','ComentarioController.Update')

}).middleware('auth');