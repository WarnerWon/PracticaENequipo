'use strict'

const comentario= use('App/Models/Comentario')
const { validate  } = use('Validator')

class ComentarioController {

    async store({ request, response }) {
        const input = request.all()
        const rules = {
            Nombre: 'required|min:2|max:60',
            ApellidoPaterno: 'required|min:2|max:60',
            ApellidoMaterno: 'required|min:2|max:60',
            Sexo: 'required|max:1',
            Edad: 'required',
            Telefono: 'required',
            Usuario:'required'
        }
        const validation = await validate(input, rules)
        if(validation.fails()){
            return response.status(400).json(validation.messages())
        }
        if (persona.create(input)){
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
            return response.status(200).json(['Persona',await persona.findOrFail(params.id)]) 
        }
        else
        {
           return response.status(200).json(['Personas',await persona.all()])
        }
    }
    ///////////////////////////////////////////////////////////////////////////////////////////
    async Delete({response,params=id}){

        const Usuario = await persona.findOrFail(params.id)
        await Usuario.delete()
    
        if (Usuario.delete()){
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
            ApellidoPaterno: 'required|min:2|max:60',
            ApellidoMaterno: 'required|min:2|max:60',
            Sexo: 'required|max:1',
            Edad: 'required',
            Telefono: 'required',
            Usuario:'required'
        }
        const validation = await validate(input, rules)
        if(validation.fails()){
            return response.status(400).json(validation.messages()) 
        }

        await persona.query().where('id',params.id).update(input)

        if (persona.query().where('id',params.id).update(input)){
            return response.status(200).json(['Actualizado',await persona.findOrFail(params.id)])
        }
    }    
}    


module.exports = ComentarioController
