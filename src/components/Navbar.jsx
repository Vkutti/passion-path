import { useNavigate } from 'react-router-dom'
import '../css/Navbar.css'


function Navbar() {
    const navigate = useNavigate() 
    function goHome() {
        navigate("/");
    }


    return (
        <div className="navbar">
            <div onClick={goHome} className="text-holder">
                <h1 className='primary-title'>PassionPath</h1>
            </div>
            <div className="btn-holder">
                <button className="tertiary-btn">Log In</button>
                <button className="primary-btn">Sign Up</button>
            </div>
        </div>
    )
}

export default Navbar