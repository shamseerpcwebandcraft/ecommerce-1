import User from "App/Models/User";
import jwt from 'jsonwebtoken';
import Env from '@ioc:Adonis/Core/Env'
import Hash from '@ioc:Adonis/Core/Hash'







export default class userRepository {
    constructor() {
    }

    public async registration(username, email, password): Promise<any> {
      try {
       

        // Validate input parameters here if needed
           
        // Hash the password
        console.log(password)
        const hashedPassword = await Hash.make(password)
        console.log(password)
        console.log("hash yahya",hashedPassword)
    
        // Create the user
        const user = await User.create({
          username: username,
          email: email,
          password: hashedPassword,
        })
        console.log(user)
    
        return user
      
      } catch (error) {
        // Log the error for debugging purposes
        console.error('Error registering user:', error)
    
        // You can throw an error here instead if you prefer
        return false
      }
    }
    


    
    public async login(email,password): Promise<any> {
      try {
        console.log("machaa")
        // Find the user by email

        const user:any = await User.findOne({email: email});
        console.log("kannan==",user)
        console.log(user[0])
        if (!user) {
          console.error('User not found');
          return false // Return null if user not found
        }
    
        // Verify the password
        const isPasswordValid = await Hash.verify(user.password, password);

          // verified
        if(isPasswordValid){
       
    
        // Generate JWT token
        const payload = {
          user_id: user.id,
          email: user.email,
        };
        const token = jwt.sign(payload, Env.get('JWT_SECRET'), { expiresIn: '5d' });
    
        return token;
      }else{
        return false
      } 
      } catch (error) {
        console.error('Error logging in:', error);
        return null; // Return null on error
      }
    }
    
  }
    
    
