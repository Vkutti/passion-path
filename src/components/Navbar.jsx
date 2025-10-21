import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useState, useEffect } from 'react'
import SignInModal from './SignInModal'
import SignUpModal from './SignUpModal'
import '../css/Navbar.css'


function Navbar() {
    const navigate = useNavigate() 
    const { user, signOut } = useAuth()
    const [showSignInModal, setShowSignInModal] = useState(false)
    const [showSignUpModal, setShowSignUpModal] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth <= 768)
        }

        checkIsMobile()
        window.addEventListener('resize', checkIsMobile)

        return () => window.removeEventListener('resize', checkIsMobile)
    }, [])

    useEffect(() => {
        if (!isMobile) {
            setIsMobileMenuOpen(false)
        }
    }, [isMobile])

    function goHome() {
        navigate("/");
        setIsMobileMenuOpen(false)
    }

    function goSaved() {
        navigate("/saved");
        setIsMobileMenuOpen(false)
    }

    const handleSignOut = async () => {
        await signOut()
        navigate('/')
        setIsMobileMenuOpen(false)
    }

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    return (
        <>
            <div className={`navbar ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
                <div onClick={goHome} className="text-holder">
                    <h1 className='primary-title'>PassionPath</h1>
                </div>

                {isMobile ? (
                    <div className="mobile-nav-container">
                        <button className="hamburger-btn" onClick={toggleMobileMenu}>
                            <span className={`hamburger-line ${isMobileMenuOpen ? 'active' : ''}`}></span>
                            <span className={`hamburger-line ${isMobileMenuOpen ? 'active' : ''}`}></span>
                            <span className={`hamburger-line ${isMobileMenuOpen ? 'active' : ''}`}></span>
                        </button>
                    </div>
                ) : (
                    <div className="btn-holder">
                        {user ? (
                            <>
                                <span className="user-email">{user.email}</span>
                                <button className="tertiary-btn" onClick={goSaved}>Saved</button>
                                <button className="primary-btn" onClick={handleSignOut}>Sign Out</button>
                            </>
                        ) : (
                            <>
                                <button className="tertiary-btn" onClick={() => setShowSignInModal(true)}>Log In</button>
                                <button className="primary-btn" onClick={() => setShowSignUpModal(true)}>Sign Up</button>
                            </>
                        )}
                    </div>
                )}
            </div>

            {isMobile && (
                <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                    <div className="mobile-menu-content">
                        {user ? (
                            <>
                                <div className="mobile-user-email">{user.email}</div>
                                <button className="mobile-nav-btn" onClick={goSaved}>Saved</button>
                                <button className="mobile-nav-btn primary" onClick={handleSignOut}>Sign Out</button>
                            </>
                        ) : (
                            <>
                                <button className="mobile-nav-btn" onClick={() => {
                                    setShowSignInModal(true)
                                    setIsMobileMenuOpen(false)
                                }}>Log In</button>
                                <button className="mobile-nav-btn primary" onClick={() => {
                                    setShowSignUpModal(true)
                                    setIsMobileMenuOpen(false)
                                }}>Sign Up</button>
                            </>
                        )}
                    </div>
                </div>
            )}
            
            <SignInModal 
                isOpen={showSignInModal} 
                onClose={() => setShowSignInModal(false)}
                onSwitchToSignUp={() => {
                    setShowSignInModal(false);
                    setShowSignUpModal(true);
                }}
            />
            <SignUpModal 
                isOpen={showSignUpModal} 
                onClose={() => setShowSignUpModal(false)}
                onSwitchToSignIn={() => {
                    setShowSignUpModal(false);
                    setShowSignInModal(true);
                }}
            />
        </>
    )
}

export default Navbar