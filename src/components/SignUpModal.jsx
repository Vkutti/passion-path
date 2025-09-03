import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import '../css/Auth.css'

function SignUpModal({ isOpen, onClose, onSwitchToSignIn }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  
  const { signUp } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      setLoading(false)
      return
    }

    const { error } = await signUp(email, password)
    
    if (error) {
      setError(error.message)
    } else {
      setMessage('Check your email for a confirmation link!')
      // Don't close modal immediately, let user see the success message
    }
    
    setLoading(false)
  }

  if (!isOpen) return null

  return (
    <div className="modal-background" onClick={onClose}>
      <div className="modal-card-bg auth-modal" onClick={(e) => e.stopPropagation()}>
      
        
        <div className="auth-container">
          <h2>Sign Up</h2>
          {error && <div className="error-message">{error}</div>}
          {message && <div className="success-message">{message}</div>}
          
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
            
            <div className="form-group">
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="auth-input"
              />
            </div>
            
            <button 
              type="submit" 
              className="primary-btn auth-btn" 
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>
          
          <div className="auth-switch">
            <p>Already have an account? <button 
              type="button" 
              className="switch-link" 
              onClick={onSwitchToSignIn}
            >
              Sign In
            </button></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpModal
