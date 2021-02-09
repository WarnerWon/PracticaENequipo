'use strict'
const producto= use('App/Models/Producto')
const { validate  } = use('Validator')
class ProductoController {
    async store({ request, response }) {
        const input = request.all()
        const rules = {
            Nombre: 'required|min:2|max:60',
            Descripcion: 'required|min:2|max:60',
            Fechadeexpiracion: 'required|min:2|max:60',
            Existenciadecantidad	: 'required|max:1',
            Persona: 'required',
          }
          const validation = await validate(input, rules)
        if(validation.fails()){
            return response.status(400).json(validation.messages())
        }
       if (producto.create(input)){
       return response.json(
           {
              rer:true,
              message:"registro insertado correctamente" 
           }
       )
         //VALIDACIONES
      }
      }
      async index({response,params=id}){
        if (params.id)
        {
            return response.status(200).json(['Producto',await producto.findOrFail(params.id)]) 
        }
        else
        {
           return response.status(200).json(['Productos',await producto.all()])
        }
    }
    ///////////////////////////////////////////////////////////////////////////////////////////
    async Delete({response,params=id}){
        const productos = await producto.findOrFail(params.id)
        await productos.delete()
    
        if (productos.delete()){
            return response.json(
                {
                   rer:true,
                   message:"registro eliminado correctamente" 
                }
            )
        }
    }
    async Update ({request, response, params=id}){
        const input = request.all()
        const rules = {
            Nombre: 'required|min:2|max:60',
            Descripcion: 'required|min:2|max:60',
            Fechadeexpiracion: 'required|min:2|max:60',
            Existenciadecantidad	: 'required|max:1',
            Persona: 'required',
          }
          const validation = await validate(input, rules)
         if(validation.fails()){
             return response.status(400).json(validation.messages()) 
         }

        await producto.query().where('id',params.id).update(input)

        if (producto.query().where('id',params.id).update(input)){
        return response.status(200).json(['Actualizado',await producto.findOrFail(params.id)])
        }
    }  
    
    }      

module.exports = ProductoController
