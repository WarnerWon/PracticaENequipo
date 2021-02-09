'use strict'
const persona= use('App/Models/Persona')
const { validate  } = use('Validator')
const Database = use('Database')
const Helpers = use('Helpers')

class PersonaController {
    async store({ request, response,auth }) {
        
        const profilePic = request.file('Foto', {
            types: ['image'],
            extnames: ['png','jpg']
          })
        
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
        
        await profilePic.move(Helpers.publicPath('avatar'), {
            name: request.input('Nombre') + '.jpg',
            overwrite: true
        })

        input['Foto'] = input['Nombre'] + '.jpg'

        var contador = 0;
        const p= await Database.select('Usuario').from('personas')
        for (const valor of p) 
        {
            if(auth.user.id==valor.Usuario)
            {
               contador=1;
            }
        }
        if(contador==0){
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
        return response.json({rer:true,message:"Ya se creo anteriormente"})
    }
   
      
    
      async index({response,params=id,auth}){
    
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

    

module.exports = PersonaController
