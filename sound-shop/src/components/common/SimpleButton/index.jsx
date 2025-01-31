import './simpleBtn.css'
const SimpleButton = ({label, onClick}) =>{
    return (
        <div className="simple-btn" onClick={onClick}>
            {label}
        </div>
    )

}
export default SimpleButton