import { useEffect, useState } from "react"
import Header from "./header/Header"
import LandingContent from "./landingContent/LandingContent"
import Cookies from "universal-cookie"
import { useNavigate } from "react-router-dom"
import { checkUserSetProfile } from "@/utils/checkUserSetProfile"

export default function LandingPage() {
  const cookies = new Cookies(null, { path: '/' })
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const checkSetProfile = async () => {
        const res = await checkUserSetProfile(cookies.get('user_email'))

        if (res) navigate('/home')
        else navigate(`/set-profile/${cookies.get('user_uid')}`)
        return  
    }

    if (cookies.get('user_uid') && cookies.get('user_email') && cookies.get('user_display_name'))
      checkSetProfile()
    else setVisible(true)

  }, [])

  return (
    <div className={`w-full ${visible ? 'flex': 'hidden'} items-center justify-center flex-col md:gap-7 select-none`}>
        <Header />
        <LandingContent />
    </div>
  )
}
