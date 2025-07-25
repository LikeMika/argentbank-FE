import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Profile from './pages/Profile'
import Home from './pages/Home'
import SignIn from './pages/SignIn'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
         <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App