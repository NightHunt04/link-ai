import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { checkUserSetProfile } from '@/utils/checkUserSetProfile'

export default function Home() {
  const cookies = new Cookies(null, { path: '/' })
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const checkSetProfile = async () => {
        const res = await checkUserSetProfile(cookies.get('user_email'))

        console.log(res)

        if (res) setVisible(true)
        else navigate(`/set-profile/${cookies.get('user_uid')}`)
        return  
    }
    
    if (!cookies.get('user_uid') && !cookies.get('user_email') && !cookies.get('user_display_name')) 
      navigate('/')

    else 
      checkSetProfile()
    
  }, [])

  return (
    <div className={`w-full h-full ${visible ? 'flex': 'hidden'} flex-col items-center justify-center`}>
        Home
    </div>
  )
}
