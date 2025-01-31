import Styles from './index.module.scss'
import { NavLink } from 'react-router'
import { CartContext } from '../../context/Cart'
import { useContext } from 'react'
const Header = () =>{
    const {cartItems} = useContext(CartContext)
    return (
            <header className={Styles["header-container"]}>
                <div className={Styles["logo"]}>
                    <div>VibeStore</div>
                </div>
                <div className={Styles["menu"]}>
                    <NavLink to='/'>Home</NavLink>
                    <NavLink to='/products'>Shop</NavLink>
                    <NavLink to='/help'>Help</NavLink>
                </div>
                <div className={Styles["right-panel"]}>
                    <div className=''>Log In</div>
                    <NavLink to='/cart'>
                        <span>Cart <span className={Styles['cart-count']}>{cartItems}</span></span>
                    </NavLink>
                </div>
            </header>
    )
}
export default Header