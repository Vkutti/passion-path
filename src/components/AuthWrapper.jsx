import { useAuth } from '../contexts/AuthContext'
import ModelCreate from '../pages/ModelCreate'
import ResultsPage from '../pages/ResultsPage'
import ProtectedRoute from './ProtectedRoute'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import SavedItems from '../pages/SavedItems'

function AuthWrapper() {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <span className="spinner"></span>
      </div>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<ModelCreate />} />
      <Route 
        path="/results" 
        element={
          <ProtectedRoute>
            <ResultsPage />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/saved" 
        element={
          <ProtectedRoute>
            <SavedItems />
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AuthWrapper
