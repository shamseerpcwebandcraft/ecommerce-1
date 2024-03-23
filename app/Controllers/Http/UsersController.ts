 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

//  import { makeJsonResponse, APIResponse } from '../../../utils/JsonResponse'
 import UserRegistrationValidator from 'App/Validators/UserRegistrationValidator'

 import UserLoginValidator from 'App/Validators/UserLoginValidator'
 import userRepository from 'App/Repositories/userRepository'


export default class UsersController {
    private userRepository: userRepository

    constructor() {
        this.userRepository = new userRepository()
      }
      public async registration(ctx: HttpContextContract) {
        console.log("hey registration");
      
        try {
          // Validate request data
          const { username, email, password } = await ctx.request.validate(UserRegistrationValidator);
      
          // Call repository method to register user
          const registrationResponse = await this.userRepository.registration(username, email, password);
      
          if (!registrationResponse) {
            ctx.response.status(422).json({status:422,messege:"failed to register user"});
          } else {
            ctx.response.status(201).json({status:201,messege:"user registration successfully"});
          }
        } catch (error) {
          console.error('Error registering user:', error);
          ctx.response.status(500).send('Internal server error');
        }
      }
      
      



public async login(ctx:HttpContextContract){
  console.log("hey login")


  
    let { email,password} = await ctx.request.validate(UserLoginValidator)
  
    const useerLoginResponse = await this.userRepository.login(email,password)
  
    if (!useerLoginResponse) {
        ctx.response.status(422).send('invalid credentials')
    } else {
      

        ctx.response.status(201).json({ status: 201, message: 'User login successfully', data: useerLoginResponse });
    
 }
}



}



