import { ThemeProvider } from '@/components/theme-provider'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './components/landing/LandingPage'
import Home from './components/home/Home'
// import { useEffect } from 'react'
// import Cookies from 'universal-cookie'
// import { useNavigate } from 'react-router-dom'
import SetProfile from './components/setProfile/SetProfile'
import NotFound from './components/notFound/NotFound'

function App() {
  // const cookies = new Cookies(null, { path: '/' })
  // const navigate = useNavigate()

  // useEffect(() => {
  //   if (cookies.get('user_uid') && cookies.get('user_email') && cookies.get('user_display_name')) 
  //     navigate('/home')
  //   else navigate('/') 
  // }, [])

  return (
    <ThemeProvider>
      <div className="font-inter w-full max-h-screen flex items-start justify-center relative">
        <div className='w-[95%] h-full sm:w-[90%] md:w-[75%] lg:w-[50%] flex flex-col items-center justify-center'>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/home' element={<Home />} />
            <Route path='/set-profile/:uid' element={<SetProfile />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
