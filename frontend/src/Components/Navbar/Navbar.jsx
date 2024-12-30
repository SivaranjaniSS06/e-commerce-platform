import React, { useContext, useState } from 'react' //6.9k (gzipped: 2.7k)
import './Navbar.css'
import logo from '../Assets/logo1.jpeg'
import cart_icon from '../Assets/cart_icon.jpeg'
import { Link, useLocation } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
//import dropdown_icon from '../Assets/dropdown.jpeg'

const Navbar = () => {

    const [menu, setMenu] = useState("shop") ;
    const {getTotalCartItems} = useContext(ShopContext);
    // const menuRef = useRef();

    // const dropdown_toogle = (e) =>{
    //     if (!menuRef.current) return;
    //     menuRef.current.classList.toggle('nav-menu-visible');
    //     e.target.classList.toggle('open');
    // }
    return (
        <div className='navbar'>
            <div className="nav-logo">
                <img src={logo} alt="" />
                <p>DECATHLON</p>
            </div>
            {/* <img onClick={dropdown_toogle} src={dropdown_icon} alt="" /> */}
            <ul className = "nav-menu">
                <li onClick={()=>{setMenu("shop")}}><Link style={{ textDecoration: 'none'}} to='/'>Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("mens")}}><Link style={{ textDecoration: 'none'}} to='/mens'>Men</Link>{menu==="mens"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("womens")}}><Link style={{ textDecoration: 'none'}} to='/womens'>Women</Link>{menu==="womens"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("kids")}}><Link style={{ textDecoration: 'none'}} to='/kids'>Kids</Link>{menu==="kids"?<hr/>:<></>}</li>
            </ul>
            <div className="nav-login-cart">
                <Link to='/login'><button>Login</button></Link>
                <Link to='/cart'><img src={cart_icon} alt="" /></Link>
                <div className='nav-cart-count'>{getTotalCartItems()}</div>
            </div>

        </div>
    )
}

export default Navbar