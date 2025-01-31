import { useNavigate } from "react-router"
import './button.css'
const Button = ({
    title,
    callback,
    link
}) => {
    const navigate = useNavigate()
    const onClickHandler = (e)=>{
        e.preventDefault()
        if(link){
            navigate(link)
            return
        }
        callback(e)
    }
    return (
        <div className='btn-container' onClick={onClickHandler}>
            [ <span className="btn-title">{title}</span> ]
        </div>
    )
}
export default Button