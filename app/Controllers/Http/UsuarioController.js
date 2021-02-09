'use strict'
const user= use('App/Models/User')
const { validate  } = use('Validator')

class UsuarioController {
       ///////////////////////////////////////////
 // INSERTA NUEVOS REGISTROS
 async store({ request, response }) {
  const input = request.all()
  const rules = {
    email: 'required|email|unique:users,email',
    password:'required'
  }
  const validation = await validate(input, rules)
if(validation.fails()){
    return response.status(400).json(validation.messages())
}
 if (user.create(input)){
 return response.json(
     {
        rer:true,
        message:"registro insertado correctamente" 
     }
 )
   //VALIDACIONES
}
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
async index({response,params=id}){
    if (params.id)
    {
        return response.status(200).json(['Usuario',await user.findOrFail(params.id)]) 
    }
    else
    {
       return response.status(200).json(['Usuarios',await user.all()])
    }
}
///////////////////////////////////////////////////////////////////////////////////////////
async getUser({response, auth}){
return auth.getUser()
}
async Delete({response,params=id}){
    const Usuario = await user.findOrFail(params.id)
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
async login ({request, response, auth}){
    try {
      const {email, password} = request.all();

      const token = await auth.attempt(email, password);

      return token;

    } catch (error) {
      return response.status(500).send({error: error})
    }
  }
  
  show ({ auth, params }) {
    if (auth.user.id !== Number(params.id)) {
      return 'You cannot see someone else\'s profile'
    }
    return auth.user
  }

}
module.exports = UsuarioController
