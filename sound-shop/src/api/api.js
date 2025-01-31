const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const REGISTER = '/api/users'
export const GETALLPRODUCTS = '/api/allProducts'
export const BUYNOW = '/api/buyNow/:userId'
export const GETMYORDERS = '/api/getMyOrders/:userId'
export const BUYPRODUCTS = '/api/buyProducts'
export const ADDTOCART = '/api/addToCart'
export const GETMYCART = '/api/getCartItems'
export const GETPRODUCTDETAILS = '/api/getProductById/:id'


export const apiRequestHandler = async (url, method, body) => {
    try {
        const options = {
            method: method
        }
        if(body){
            options.body = body
        }
        const response = await fetch(BASE_URL + url, options)
        console.log(response)
        return response.json()
    } catch(err){
        console.log(err)
    }
}
