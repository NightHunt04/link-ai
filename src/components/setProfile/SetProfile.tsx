import { useEffect, useState } from "react"
import Cookies from "universal-cookie"
import { useNavigate } from "react-router-dom"
import { checkUserSetProfile } from "@/utils/checkUserSetProfile"
import ReactEmojis from '@souhaildev/reactemojis'
import Text from '@carefully-coded/react-text-gradient'
import { Button } from "../ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function SetProfile() {
    const [pfp, setPfp] = useState('/assets/default-pfp.jpg')
    const [error, setError] = useState(false)
    const cookies = new Cookies(null, { path: '/' })
    const [username, setUsername] = useState(cookies.get('user_display_name'))
    const [bio, setBio] = useState('')
    const navigate = useNavigate()

    const handleOpenFileDialog = () => {
        setError(false)
        let input = document.createElement('input')
        input.type = 'file'
        input.onchange = (_) => {
            // @ts-ignore
            let file =   Array.from(input.files)[0]
            
            if (file.name.split('.')[1] !== 'jpg' && file.name.split('.')[1] !== 'jpeg' && file.name.split('.')[1] !== 'png' && file.name.split('.')[1] !== 'gif' && file.name.split('.')[1] !== 'bmp')
                setError(true)
            else {
                if (file) {
                    const reader = new FileReader()
                    reader.onload = () => {
                        if (reader.result) {
                            setPfp(reader.result as string)
                        }
                    }
                    reader.readAsDataURL(file)
                }
            }
        }
        input.click();
    }

    useEffect(() => {
        const checkSetProfile = async () => {
            const res = await checkUserSetProfile(cookies.get('user_email'))

            if (res) 
                navigate('/home')
            return  
        }

        if (!cookies.get('user_uid') && !cookies.get('user_email') && !cookies.get('user_display_name')) {
            navigate('/') 
            return
        } 

        // check wether the user has already set profile
        checkSetProfile()
    }, [])

  return (
    <div className={`w-[95%] md:w-[70%] flex flex-col mt-10 items-center justify-center`}>
        <h3 className="w-full justify-center text-center font-bold text-4xl mb-1 flex items-center gap-1">
            Hey,&nbsp;<span className="font-extrabold">
                <Text gradient={{ from: '#ff1b6b', to: '#45caff'}} animate animateDuration={1500}>
                    {cookies.get('user_display_name').substring(0, 10)}
                </Text>    
            </span>
                
            <ReactEmojis
                className="rotate-[25deg]"
                emoji="👋"
                style={{ width: 50, height: 50 }}
            />
        </h3>
        <h3 className="font-bold text-3xl text-center">Set Up Your Profile</h3>

        <div className="flex flex-col items-center justify-center w-[90%] mb-14 md:w-[70%] gap-10 mt-10">
            <div className="w-full flex flex-col items-center justify-center gap-1">
                <p className="w-full text-center font-semibold p-3 border rounded-lg">Step 1: Set Profile Picture</p>
                <div className="px-3 py-6 rounded-lg flex items-center justify-center flex-col relative w-full text-center border">
                    <p className="font-medium">Change your profile picture</p>
                    <p className="text-xs text-gray-400 mb-5">Every other real user will able to see your profile picture</p>

                    <div onClick={handleOpenFileDialog} className="flex flex-col items-center overflow-hidden justify-center">
                        <img src={pfp} alt="pfp" className="hover:brightness-50 transition-all w-40 h-40 rounded-full " />
                    </div>

                    <Button onClick={handleOpenFileDialog} variant='outline' className="mt-3">Change picture</Button>
                    <Button onClick={() => setPfp('/assets/default-pfp.jpg')} variant='outline' className="mt-3 text-center">Keep default picture</Button>
                </div>
            </div>

            <div className="w-full flex flex-col items-center justify-center gap-1">
                <p className="w-full text-center font-semibold p-3 border rounded-lg">Step 2: Set Username</p>
                <p className="text-xs text-gray-400 mb-1">Default is kept from your account, you can change it by editing it</p>
                <Input 
                    type="text" 
                    placeholder='Username'
                    value={username}
                    onChange={e => setUsername(e.target.value)} />
            </div>

            <div className="w-full flex flex-col items-center justify-center gap-1">
                <p className="w-full text-center font-semibold p-3 border rounded-lg">Step 3: Set up your bio</p>
                <Textarea 
                    rows={6} 
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                    placeholder="Your bio here (MAX CHARACTERS: 200) (about yourself or anything, or idk, who cares)" />
            </div>
        </div>

        <Button variant='outline' className="bg-green-500 text-white font-semibold w-[90%] mb-16 md:w-[70%]">Complete setup</Button>
    </div>
  )
}
