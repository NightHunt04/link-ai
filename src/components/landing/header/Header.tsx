import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { provider } from "@/config/firebaseConfig"
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

export default function Header() {
  const handleSignin = () => {
    const auth = getAuth()
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result)
        console.log('cred', credential)
        const token = credential?.accessToken
        console.log('token', token)
        const user = result.user // Signed in user info
        console.log('user', user)
      }).catch((err) => {
        // const errorCode = err.code
        // const errorMessage = err.message
        // const email = err.customData.email
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
