'use strict'

const Comentario= use('App/Models/Comentario')
const { validate  } = use('Validator')

class ComentarioController {

    async store({ request, response }) {
        const input = request.all()
        const rules = {
            Titulo: 'required|min:2|max:60',
            persona: 'required',
            producto: 'required',
            Texto: 'required',
        }
        const validation = await validate(input, rules)
        if(validation.fails()){
            return response.status(400).json(validation.messages())
        }
        if (Comentario.create(input)){
            return response.json({
                    rer:true,
                    message:"registro insertado correctamente" 
                }
            )
        }
    }

    async index({response,params=id}){
        if (params.id)
        {
            return response.status(200).json(['Comentario',await Comentario.findOrFail(params.id)]) 
        }
        else
        {
           return response.status(200).json(['Coemntario',await Comentario.all()])
        }
    }
    
    async Delete({response,params=id}){

        const comentario = await Comentario.findOrFail(params.id)
        if (await comentario.delete()){
            return response.json({
                   rer:true,
                   message:"registro eliminado correctamente" 
                }
            )
        }
    }

    async Update ({request, response, params=id}){

        const input = request.all()
        
        const rules = {
            Titulo: 'required|min:2|max:60',
            persona: 'required',
            producto: 'required',
            Texto: 'required',
        }
        const validation = await validate(input, rules)
        if(validation.fails()){
            return response.status(400).json(validation.messages()) 
        }

        if (await Comentario.query().where('id',params.id).update(input)){
            return response.status(200).json(['Actualizado',await Comentario.findOrFail(params.id)])
        }
    }    
}    


module.exports = ComentarioController
