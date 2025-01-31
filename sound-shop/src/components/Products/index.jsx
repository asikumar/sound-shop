import { useEffect, useState } from "react"
import Product from "./Product"

const Products = () =>{
    const [products, setProducts] = useState([])
    useEffect(()=>{},[])

    return (
        <>
        {products.map((product)=>{
            return <Product link={''} description={''} image={''} cost={''}/>
        })}
        </>
    )
}
export default Products