import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import productRepository from 'App/Repositories/productRepository'
import { HttpStatusCodes } from 'App/utils/HttpStatuses'
import { APIResponse, makeJsonResponse } from 'App/utils/JsonResponse'
import UserCartValidator from 'App/Validators/UserCartValidator'

import ProductListingValidator from 'App/Validators/ProductListingValidator'

export default class ProductsController {
    private productRepository: productRepository

    constructor() {
        this.productRepository = new productRepository()
      }

      public async addproduct(ctx:HttpContextContract){
           const products=[{
              
                id: 1,
                name: 'iphone 6',
                image:'iphone6.jpg',
                stock:6,
                price:20000,
                is_active:true
           }
              ,
              {
              
                id: 1,
                name: 'sumsung s24',
                image:'iphone6.jpg',
                stock:6,
                price:20000,
                is_active:true
           },
           {
              
            id: 1,
            name: 'iqoo neo 7',
            image:'iphone6.jpg',
            stock:6,
            price:20000,
            is_active:true
       },
       {
              
        id: 1,
        name: 'oppo f23',
        image:'iphone6.jpg',
        stock:6,
        price:20000,
        is_active:true
   },

            ]

            const response= await this.productRepository.createProducts(products)

            if(response){
              ctx.response.status(201).json(response)
            }
           }


   public async listproduct(ctx:HttpContextContract){
    let httpStatusCode: number = HttpStatusCodes.HTTP_VALIDATION_ERROR
    let isSuccess: boolean = false
    let response: APIResponse

    let { search } = await ctx.request.validate(ProductListingValidator)
  
    const productListingResponse = await this.productRepository.listproducts(search)
  
    if (!productListingResponse) {
      response = makeJsonResponse('no products available', {}, {}, httpStatusCode)
    } else {
        httpStatusCode = HttpStatusCodes.HTTP_OK;
        isSuccess = true;
        response = makeJsonResponse(
          "product listing successfully",
          productListingResponse,
          {},
          httpStatusCode,
          isSuccess
        );
    ctx.response.status(httpStatusCode).json(response)
       
  
   }
  
  }


  public async addToCart(ctx:HttpContextContract){
    let httpStatusCode: number = HttpStatusCodes.HTTP_VALIDATION_ERROR
    let isSuccess: boolean = false
    let response: APIResponse
    const user_id= ctx.request.user.userId
  
    let { items } = await ctx.request.validate(UserCartValidator)

    const addtoCartResponse = await this.productRepository.addToCart( items,user_id )
    console.log(addtoCartResponse)
    if(addtoCartResponse.error){
      // response = makeJsonResponse(addtoCartResponse.error, {}, {}, httpStatusCode)
      response = addtoCartResponse.error
      console.log("response",response)
      ctx.response.status(httpStatusCode).json({response})
    }
  
    if (!addtoCartResponse) {
      response = makeJsonResponse('no product available in cart', {}, {}, httpStatusCode)
    } else if(!addtoCartResponse.error) {
        httpStatusCode = HttpStatusCodes.HTTP_OK;
        isSuccess = true;
        response = makeJsonResponse(
          "cart listing successfully",
          addtoCartResponse,
          {},
          httpStatusCode,
          isSuccess
        );
  
        ctx.response.status(httpStatusCode).json(response);
  
   }

   
  
  }



 

  public async deleteCart(ctx:HttpContextContract){
    let httpStatusCode: number = HttpStatusCodes.HTTP_VALIDATION_ERROR
    let isSuccess: boolean = false
    let response: APIResponse
    const user_id= ctx.request.user.userId
  
  
    const updateCartResponse = await this.productRepository.deleteCart( user_id )
    if(updateCartResponse.error){

      response = updateCartResponse.error
      ctx.response.status(httpStatusCode).json({response})
    }
  
    if (!updateCartResponse) {
      response = makeJsonResponse('no cart available', {}, {}, httpStatusCode)
    } else {
        httpStatusCode = HttpStatusCodes.HTTP_OK;
        isSuccess = true;
        response = makeJsonResponse(
          "delete user cart successfully",
          updateCartResponse,
          {},
          httpStatusCode,
          isSuccess
        );
    ctx.response.status(httpStatusCode).json(response)
       
  
   }
  
  }

  public async getCart(ctx:HttpContextContract){
    let httpStatusCode: number = HttpStatusCodes.HTTP_VALIDATION_ERROR
    let isSuccess: boolean = false
    let response: APIResponse
    const user_id= ctx.request.user.userId
  
    //let { items } = await ctx.request.validate(UserCartValidator)
    const getUserCartResponse = await this.productRepository.getCart( user_id )
  
    if (!getUserCartResponse) {
      response = makeJsonResponse('cart is not available', {}, {}, httpStatusCode)
    } else {
        httpStatusCode = HttpStatusCodes.HTTP_OK;
        isSuccess = true;
        response = makeJsonResponse(
          "cart listing successfully",
          getUserCartResponse,
          {},
          httpStatusCode,
          isSuccess
        );
    ctx.response.status(httpStatusCode).json(response)
       
  
   }
  
  }
  public async updateCart(ctx:HttpContextContract){
    let httpStatusCode: number = HttpStatusCodes.HTTP_VALIDATION_ERROR
    let isSuccess: boolean = false
    let response: APIResponse
    const user_id= ctx.request.user.userId
  
    let { quanitity } = await ctx.request.validate(UserCartValidator)
    const getUserCartResponse = await this.productRepository.updateCart( user_id,quantity )
  
    if (!getUserCartResponse) {
      response = makeJsonResponse('cart is not available', {}, {}, httpStatusCode)
    } else {
        httpStatusCode = HttpStatusCodes.HTTP_OK;
        isSuccess = true;
        response = makeJsonResponse(
          "cart updation successfully",
          getUserCartResponse,
          {},
          httpStatusCode,
          isSuccess
        );
    ctx.response.status(httpStatusCode).json(response)
       
  
   }
  
  }






 



}
