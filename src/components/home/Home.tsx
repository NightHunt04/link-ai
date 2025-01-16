import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'
import { BellDot, HomeIcon, LogOut, Plus, Search, SettingsIcon, User } from 'lucide-react'
import { useEffect, useState } from 'react'
import { checkUserSetProfile } from '@/utils/checkUserSetProfile'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// import Header from '../landing/header/Header'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ModeToggle } from '../mode-toggle'
import { Button } from '../ui/button'

// enum Nav {
//   home,
//   search,
//   post,
//   account,
//   settings
// }

export default function Home() {
  const cookies = new Cookies(null, { path: '/' })
  const navigate = useNavigate()
  const [visible, setVisible] = useState(true)
  // const [hoverSidebar, setHoverSidebar] = useState(false)
  // const [currentNav, setCurrentNav] = useState(0)

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
    <div className={`w-full font-inter relative h-screen ${visible ? 'flex': 'hidden'} flex-col items-center justify-start`}>
        <div className='w-full z-20 bg-white/40 dark:bg-black/40 backdrop-blur-sm flex items-center absolute top-0 justify-between px-2 md:px-5 py-3'>
          <h1 className='font-bold text-2xl'>LINK.</h1>

          {/* <div className='flex items-center justify-center gap-2'>
            <Button variant='outline'><Info className='w-5 h-5' /> About</Button>
            <Button variant='outline'><BookOpen className='w-5 h-5' /> Docs</Button>
          </div> */}
          <div className='flex items-center justify-center'>
            <Button variant='ghost' className='md:hidden'><ModeToggle /></Button>
            <Button variant='ghost'><BellDot /></Button>
            
          </div>
        </div>

        <div className='w-full h-full md:px-5 px-1 py-3 flex md:flex-row flex-col items-start justify-start gap-2'>
          <div className="flex md:mt-14 w-full bottom-2 md:relative md:w-auto md:flex-col items-center justify-center md:items-start md:justify-start gap-2 md:order-1 order-2 rounded-lg">
            <TooltipProvider>
            <div className="flex md:flex-col w-full items-center gap-8 md:gap-2 rounded-full border justify-center md:items-start md:justify-start order-2 p-1 z-10 shadow-lg bg-[#f3f3f3] dark:bg-[#181818]">

              <Tooltip>
                <TooltipTrigger>
                  <Button variant='outline' className='rounded-full' size='icon'><HomeIcon className='w-5 h-5' /></Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Home</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger>
                  <Button variant='outline' className='rounded-full' size='icon'><Search className='w-5 h-5' /></Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Search user or post</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger>
                  <Button variant='outline' className='rounded-full' size='icon'><Plus className='w-5 h-5' /></Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Create a post</p>
                </TooltipContent>
              </Tooltip>

              <DropdownMenu>
                <Tooltip>
                  <TooltipTrigger>
                    <DropdownMenuTrigger>
                      <div className='flex gap-1 items-center justify-center rounded-full border border-gray-300 p-1 dark:border-gray-800'>
                        <Avatar className='w-7 h-7'>
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </div>
                    </DropdownMenuTrigger>                
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Account</p>
                    </TooltipContent>
                </Tooltip>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className='hover:cursor-pointer flex items-center gap-1'><User className='w-4 h-4' />Profile</DropdownMenuItem>
                  <DropdownMenuItem className='hover:cursor-pointer flex items-center gap-1 text-red-500'><LogOut className='w-4 h-4' />Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Tooltip>
                <TooltipTrigger>
                  <Button variant='outline' className='rounded-full' size='icon'><SettingsIcon className='w-5 h-5' /></Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Settings</p>
                </TooltipContent>
              </Tooltip>

              <div className='hidden md:block mt-5 w-full border-t'></div>
              <div className='md:block hidden'>
                <ModeToggle />
              </div>
              </div>
            </TooltipProvider>
          </div>

          <div className='w-full h-full md:h-[95%]  overflow-y-auto mt-10 flex p-2 md:order-2 order-1 flex-col items-center justify-start gap-1 border-gray-200 dark:border-gray-800 rounded-lg'>
            posts here
          </div>
        </div>

        {/* <div className='flex w-full px-4 py-3 items-center justify-center'>
          bottom
        </div> */}
    </div>
  )
}
