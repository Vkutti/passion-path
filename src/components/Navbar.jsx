import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useState } from 'react'
import SignInModal from './SignInModal'
import SignUpModal from './SignUpModal'
import '../css/Navbar.css'


function Navbar() {
    const navigate = useNavigate() 
    const { user, signOut } = useAuth()
    const [showSignInModal, setShowSignInModal] = useState(false)
    const [showSignUpModal, setShowSignUpModal] = useState(false)
    
    function goHome() {
        navigate("/");
    }

    const handleSignOut = async () => {
        await signOut()
        navigate('/')
    }

    return (
        <>
            <div className="navbar">
                <div onClick={goHome} className="text-holder">
                    <h1 className='primary-title'>PassionPath</h1>
                </div>
                <div className="btn-holder">
                    {user ? (
                        <>
                            <span className="user-email">{user.email}</span>
                            <button className="tertiary-btn" onClick={handleSignOut}>Sign Out</button>
                        </>
                    ) : (
                        <>
                            <button className="tertiary-btn" onClick={() => setShowSignInModal(true)}>Log In</button>
                            <button className="primary-btn" onClick={() => setShowSignUpModal(true)}>Sign Up</button>
                        </>
                    )}
                </div>
            </div>
            
            <SignInModal 
                isOpen={showSignInModal} 
                onClose={() => setShowSignInModal(false)} 
            />
            <SignUpModal 
                isOpen={showSignUpModal} 
                onClose={() => setShowSignUpModal(false)} 
            />
        </>
    )
}

export default Navbar