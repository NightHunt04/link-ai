import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { provider } from "@/config/firebaseConfig"
import { getAuth, signInWithPopup } from 'firebase/auth'
import Cookies from 'universal-cookie'
import { useNavigate } from "react-router-dom"
import { checkIsUserSigned } from "@/utils/checkIsUserSigned"
import { signNewUser } from "@/utils/signNewUser"
import { useLinkContext } from "@/context/linkContext"

export default function Header() {
  const linkContext = useLinkContext()
  const cookies = new Cookies(null, { path: '/' })
  const navigate = useNavigate()

  const handleSignin = () => {
    const auth = getAuth()
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user // Signed in user info

        let date = new Date("2025-01-13T22:00:00+05:30")

        // expires (1 day)
        date.setTime(date.getTime() + (24 * 60 * 60 * 1000))

        cookies.set('user_email', user.email)
        cookies.set('user_display_name', user.displayName)
        cookies.set('user_display_picture', user.photoURL)
        cookies.set('user_uid', user.uid)

        // check wether the user is already signed or not
        if (user.email && await checkIsUserSigned(user.email)) 
          navigate('/home')
        else {
          if (user.email && user.uid && user.displayName) {
            signNewUser({ email: user.email, uid: user.uid, displayName: user.displayName })
            linkContext?.setIsNew(true)
            navigate(`/set-profile/${user.uid}`)
          } else {
            console.error('Something went wrong while signing in')
          }
        }

        // console.log('user', user)
        // console.log(cookies.get('user_display_picture'))
      }).catch((err) => {
        console.error('something went wrong', err)
      })
  }

  return (
    <div className="px-5 py-6 md:py-4 flex items-center w-full justify-between">
        <h1 className="font-bold text-2xl">LINK.</h1>
        <div className="flex items-center justify-center gap-2">
            <ModeToggle />
            <Button onClick={handleSignin} variant='outline' className="flex items-center justify-center gap-1 text-sm">
              <img src="/assets/google.png" alt="." className="w-4 h-4 rounded-full" />
              <p>Signin</p>
            </Button>
        </div>
    </div>
  )
}
