import Product from "App/Models/Products";
import Cart from "App/Models/Cart";
import User from "App/Models/User";


export default class productRepository {
    constructor() {
    }

    public async createProducts(products: { id: number; name: string; image: string; stock: number; price: number; is_active: boolean; }[]): Promise<any> {
     
       try {
      
      const response = await Product.insertMany(
        products
        );

            
      if(response){
        return response
      }
    } catch (error) {
        return error
    }
  
      
    }
  
    public async listproducts(search): Promise<any> {
 
          try {
            console.log(search)
  
            let query:any = { is_active: true };

            if (search) {
              query.name = { $regex: search, $options: 'i' };
            }
      
            const products = await Product.find(query);

            

  
      return products
          
    } catch (error) {
     return error;
    }
    }


    public async addToCart(items, user_id): Promise<any> {
      try {

        // const cart = await Cart.findOne({ user_id: user_id }).sort({createdAt:-1})

    
        let total_price = 0; 
    
        for (const { id, quantity } of items) {
             
  
          const product:any = await Product.findById(id)

    
          //quantity is lessthan the stock
          if ( product.stock >= quantity ) {
            const price = product.price;
            total_price += price * quantity;
        } else {
            return { error: 'product is not available' };
        }
        
        
        }
        if(user_id){
          await User.findOne({_id:user_id})
   
        
        
     
        const isCartExist = await Cart.create({
          items: items,
          user_id: user_id,
          total_price: total_price, 

        });
      
        if (!isCartExist) {
         
          return 'failed cart';
        }
    
      
        return { isCartExist };
      }
      } catch (error) {
      
        return error;
      }
    }


    public async deleteCart(user_id): Promise<any> {
      try {
        const cart = await Cart.deleteOne({ user_id: user_id });
    
        if (cart.deletedCount === 0) {
          return false
        }
    
        return true // Return success message
      } catch (error) {
        return false // Wrap error in a meaningful response
      }
    }
    



   


    public async getCart(user_id): Promise<any> {
      try {
         const cart=await Cart.find({user_id:user_id})
          
         if(cart){
          return cart
         }else{
          return "cart is not available"
         }
      
      } catch (error) {
      
        return error;
      }
    }




    


    

    public async updateCart( quantity ): Promise<any> {
 
    try {
      
   
      const isCartExist = await Cart.updateOne({
        quantity:quantity
      })
      if(!isCartExist){
        return 'your updation is failed'
      }
            
      let Response = { isCartExist };
  
      return Response
    }
   catch (error) {
      return false;
  }
}
}
