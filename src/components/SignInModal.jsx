import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import '../css/Auth.css'

function SignInModal({ isOpen, onClose, onSuccessfulLogin, onSwitchToSignUp }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const { signIn } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await signIn(email, password)
    
    if (error) {
      setError(error.message)
    } else {
      // Call the success callback if provided, otherwise just close
      if (onSuccessfulLogin) {
        onSuccessfulLogin()
      } else {
        onClose()
      }
    }
    
    setLoading(false)
  }

  if (!isOpen) return null

  return (
    <div className="modal-background" onClick={onClose}>
      <div className="modal-card-bg auth-modal" onClick={(e) => e.stopPropagation()}>
        
        <div className="auth-container">
          <h2>Sign In</h2>
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="auth-input"
              />
            </div>
            
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="auth-input"
              />
            </div>
            
            <button 
              type="submit" 
              className="primary-btn auth-btn" 
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
          
          <div className="auth-switch">
            <p>Don't have an account? <button 
              type="button" 
              className="switch-link" 
              onClick={onSwitchToSignUp}
            >
              Sign Up
            </button></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignInModal
