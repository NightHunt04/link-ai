import { useEffect } from "react"
import Header from "./header/Header"
import LandingContent from "./landingContent/LandingContent"
import Cookies from "universal-cookie"
import { useNavigate } from "react-router-dom"

export default function LandingPage() {
  const cookies = new Cookies(null, { path: '/' })
  const navigate = useNavigate()
  // const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (cookies.get('user_uid') && cookies.get('user_email') && cookies.get('user_display_name'))
      navigate('/home')

  }, [])

  return (
    <div className={`w-full flex items-center justify-center flex-col md:gap-7 select-none`}>
        <Header />
        <LandingContent />
    </div>
  )
}
