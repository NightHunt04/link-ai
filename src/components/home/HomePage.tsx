import { useEffect } from "react"
import Cookies from "universal-cookie"
import useUserPosts from "@/utils/useUserPosts"
import { Avatar } from "../ui/avatar"
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { EllipsisVertical, Heart, MessageCircle, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button"
import { ref, remove } from 'firebase/database'
import { db } from "@/config/firebaseConfig"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function HomePage() {
  const userPosts = useUserPosts()
  const cookies = new Cookies(null, { path: '/' })

  function formatTime(seconds: number): string {
    const currentTime = Math.floor(Date.now() / 1000)
    const diff = Math.max(0, Math.floor(currentTime - seconds))
  
    const minute = 60
    const hour = 60 * minute
    const day = 24 * hour
  
    if (diff < minute) return `${diff} second${diff !== 1 ? "s" : ""} ago`
  
    if (diff < hour) {
      const minutes = Math.floor(diff / minute)
      return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`
    }
  
    if (diff < day) {
      const hours = Math.floor(diff / hour)
      return `${hours} hour${hours !== 1 ? "s" : ""} ago`
    }
  
    if (diff < 2 * day) return "Yesterday"
  
    const postDate = new Date(seconds * 1000)
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    return daysOfWeek[postDate.getDay()]
  }  

  const handleDeletePost = async (postId: string) => {
    const emailField =  cookies.get('user_email').split('@')[0]
    console.log('deleting', postId)
    try {
      const postRef = ref(db, `post-data/${emailField}/${postId}`)
      await remove(postRef)
    } catch (err) {
      console.error(`Something went wrong while deleting post: ${err}`)
    }
  }
  
  useEffect(() => {
    if (userPosts) {
      Object.keys(userPosts).forEach(val => {
        console.log(userPosts[val])
      })
    }
  }, [userPosts])

  return (
    <div className="w-full h-full overflow-y-auto flex flex-col items-center justify-start p-2">
      <div className="mt-5"></div>
        {userPosts && Object.keys(userPosts).map(val => {
          return (
            <div key={userPosts[val]['postId']} className="animate-in relative fade-in-0 duration-500 p-4 rounded-lg border shadow-md dark:bg-[#131313] mt-5 w-full flex flex-col items-start justify-start">
              <div className="absolute right-1 top-1 z-30">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant='ghost' size='icon'><EllipsisVertical /></Button>
                  </DropdownMenuTrigger>
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <DropdownMenuContent>
                        <Button onClick={() => console.log('delete')} variant='outline' className="bg-red-500 text-white font-medium flex items-center gap-1"><Trash2 />Delete Post</Button>
                      </DropdownMenuContent>
                    </AlertDialogTrigger>

                    <AlertDialogContent className="w-[95%] md:w-full">
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure to <span className="text-red-500">delete</span> this post?</AlertDialogTitle>
                            <AlertDialogDescription>
                                <div className="w-full flex flex-col mt-4 items-start justify-start gap-1">
                                  <p className="font-medium text-lg">Post to be deleted</p>
                                  <div className="p-3 border shadow-md flex flex-col w-full gap-1 items-start justify-start rounded-lg">
                                    {userPosts[val]['mediaAttachmentBase64'] && <img src={userPosts[val]['mediaAttachmentBase64']} alt="media" className="rounded-lg w-full h-auto object-cover" />}
                                    {/* @ts-ignore */}
                                    <p>{userPosts[val]['postTextContent']}</p>
                                  </div>
                                </div>
                                <p className="mt-6">This action cannot be undone. This will clear the media attachment and the context written.</p>
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeletePost(userPosts[val]['postId'])}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </DropdownMenu>
              </div>

              <div className="flex w-full items-start justify-start gap-2">
                <Avatar className="w-6 h-6">
                  <AvatarImage src={cookies.get('user_display_picture') ? cookies.get('user_display_picture') : ''} />
                  {/* @ts-ignore */}
                  <AvatarFallback>{userPosts[val]['username'] ? userPosts[val]['username'].substring(0, 2) : ''}</AvatarFallback>
                </Avatar> 
                <p className="font-semibold">{cookies.get("user_display_name") ? cookies.get("user_display_name") : 'username(dont del cookies)'}</p>
              </div>
              <div className="w-full gap-2 p-3 rounded-lg border flex flex-col mt-4 items-start justify-start">
                {userPosts[val]['mediaAttachmentBase64'] && <img src={userPosts[val]['mediaAttachmentBase64']} alt="media" className="rounded-lg w-full h-auto object-cover" />}
                <p>{userPosts[val]['postTextContent']}</p>

                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center justify-center gap-5">
                    <div className="flex items-center justify-center gap-1">
                      <button className="rounded-full flex items-center justify-center"><Heart className="w-4 h-4" /></button>
                      <p>{userPosts[val]['likes']}</p>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <button className="rounded-full flex items-center justify-center"><MessageCircle className="w-4 h-4" /></button>
                      {!userPosts[val]['comments'] && <p>0</p>}
                    </div>
                  </div>
                </div>
              </div>
              <p className="self-end mt-3 text-xs dark:text-gray-400 text-gray-700">{(formatTime(userPosts[val]['postedAt']))}</p>
            </div>
          )
      })}
    </div>
  )
}
