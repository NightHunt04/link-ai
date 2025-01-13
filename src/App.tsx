import { ThemeProvider } from '@/components/theme-provider'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './components/landing/LandingPage'

function App() {
  return (
    <ThemeProvider>
      <div className="w-full h-screen flex items-start justify-center relative">
        <div className='w-[95%] sm:w-[90%] md:w-[75%] lg:w-[50%]'>
          <Routes>
            <Route path='/' element={<LandingPage />} />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
