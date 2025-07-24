import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getProfile, updateProfile } from '../service/user'
import { setProfile } from '../redux/profileSlice'

function Profile() {
  const token = useSelector((state) => state.auth.token)
  const user = useSelector((state) => state.profile.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editedFirstName, setEditedFirstName] = useState('')
  const [editedLastName, setEditedLastName] = useState('')

  useEffect(() => {
    if (!token) {
      navigate('/sign-in')
      return
    }

    const fetchData = async () => {
      try {
        const userData = await getProfile(token)
        dispatch(setProfile(userData))
        setLoading(false)
      } catch (err) {
        console.error('Error:', err.message)
        navigate('/sign-in')
      }
    }

    fetchData()
  }, [token, navigate, dispatch])

  const handleEdit = () => {
    setEditedFirstName(user.firstName)
    setEditedLastName(user.lastName)
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const handleSave = async () => {
    try {
      const updatedUser = await updateProfile(token, editedFirstName, editedLastName)
      dispatch(setProfile(updatedUser))
      setIsEditing(false)
    } catch (err) {
      alert('Failed to update profile: ' + err.message)
    }
  }

  if (loading || !user) {
    return (
      <main className="main bg-dark">
        <p style={{ color: 'white' }}>Loading...</p>
      </main>
    )
  }

  return (
    <main className="main bg-dark">
      <div className="header">
        {isEditing ? (
          <>
            <h1>Edit Name</h1>
            <div>
                <input
                    type="text"
                    value={editedFirstName}
                    onChange={(e) => setEditedFirstName(e.target.value)}
                    placeholder="First Name"
                    className="edit-name-input"
                />
                <input
                    type="text"
                    value={editedLastName}
                    onChange={(e) => setEditedLastName(e.target.value)}
                    placeholder="Last Name"
                    className="edit-name-input"
                />
                </div>
                <div className="edit-name-actions">
                <button className="edit-button" onClick={handleSave}>Save</button>
                <button className="cancel-button" onClick={handleCancel}>Cancel</button>
                </div>
          </>
        ) : (
          <>
            <h1>
              Welcome back<br />
              {user.firstName} {user.lastName}!
            </h1>
            <button className="edit-button" onClick={handleEdit}>Edit Name</button>
          </>
        )}
      </div>

      <h2 className="sr-only">Accounts</h2>

      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>

      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>

      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  )
}

export default Profile
