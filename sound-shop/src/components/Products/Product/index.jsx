import { useNavigate, useParams } from 'react-router'
import './product.css'
import SimpleButton from '../../common/SimpleButton'
import { useEffect, useState } from 'react'
const Product = ({image, description, cost, showAddToCart=true,link}) =>{
    const navigate = useNavigate()
    const {product} = useParams()
    const [imageURL, setImageURL] = useState(image)
    const [desc, setDescription] = useState(description)
    const [amount, setAmount] = useState(cost)
    const [count, setCount] = useState(0)

    useEffect(()=>{

    }, [product])
    

    return (
        <section>
            <div className={`product-container ${product ? 'top-margin' : ''}`}>
                <div onClick={()=>!product && navigate(link ?? '/products')}><img eager src={`../../../../assets/images/${imageURL}`}/></div>
                <div className="description">{desc}</div>
                <div className='cost-container'>
                    <div className="amount">{amount}</div>
                    {(showAddToCart) && 
                        <div className="add-to-cart">
                            <SimpleButton label={'-'} onClick={()=>{count > 0 && setCount(count-1)}}/>
                            <input readOnly value={count}/>
                            <SimpleButton label={'+'} onClick={()=>{setCount(count+1)}}/>
                        </div>
                    }
                </div>
                {product && 
                    <div className="add-to-cart">
                        <SimpleButton label={'Add to Cart'}/>
                        <SimpleButton label={'Buy Now'}/>
                    </div>
                }
            </div>
        </section>
    )
}
export default Product