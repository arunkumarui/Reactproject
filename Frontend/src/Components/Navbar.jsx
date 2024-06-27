import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <>
        <div>
            <nav className='nav-header'>
                <h2 className='logo-text'>AK</h2>
                <ul className='menu-list'>
                    <Link to="/" >Home</Link>
                    <Link to="/QrCode" >QR COde</Link>
                    <Link to="/Crud">CRUD</Link>
                    <Link to="Contact">Contact</Link>
                </ul>
            </nav>
        </div>

        </>
    )
}

export default Navbar