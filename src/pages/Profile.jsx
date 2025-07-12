import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Profile() {
  const token = useSelector((state) => state.auth.token)
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (!token) {
      navigate('/sign-in')
      return
    }

    const fetchUserProfile = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/v1/user/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })

        const data = await response.json()
        if (response.ok) {
          setUser(data.body)
        } else {
          console.error('Error fetching profile:', data.message)
          navigate('/sign-in')
        }
      } catch (err) {
        console.error('Error:', err)
        navigate('/sign-in')
      }
    }

    fetchUserProfile()
  }, [token, navigate])

  if (!user) {
    return <div className="main bg-dark"><p style={{ color: 'white' }}>Loading...</p></div>
  }

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back<br />
          {user.firstName} {user.lastName}!
        </h1>
        <button className="edit-button">Edit Name</button>
      </div>
      {/* Tu peux ajouter d'autres sections ici */}
    </main>
  )
}

export default Profile
