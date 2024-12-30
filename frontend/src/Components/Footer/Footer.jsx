import React from 'react'
import './Footer.css'
import footer_logo from '../Assets/logo1.jpeg'
import insta_icon from '../Assets/insta.jpeg'
import pintester_icon from '../Assets/pintester.jpeg'
import whatsapp_icon from '../Assets/whatsapp.jpeg'

const Footer = () =>{
    return(
        <div className='footer'>
            <div className='footer-logo'>
                <img src={footer_logo} alt="" />
                <p>DECATHLON</p>
            </div>
            <ul className='footer-links'>
                <li>Company</li>
                <li>Products</li>
                <li>Offices</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
            <div className='footer-social-icon'>
                <div className='footer-icons-container'>
                    <img src={insta_icon} alt="" />
                </div>
                <div className='footer-icons-container'>
                    <img src={pintester_icon} alt="" />
                </div>
                <div className='footer-icons-container'>
                    <img src={whatsapp_icon} alt="" />
                </div>
            </div>
            <div className='footer-copyright'>
                <hr />
                <p>Copyright @ 2024 - All Right Reserved.</p>
            </div>
        </div>
    )
}
export default Footer