import { useState, useEffect, useRef } from 'react'
import { CircleX, Paperclip, SendHorizonal, Trash2 } from 'lucide-react'
import { Button } from '../ui/button'
import { useLinkContext } from '@/context/linkContext'
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
import { postContent } from '@/utils/postContent'
import Cookies from 'universal-cookie'
import { useToast } from "@/hooks/use-toast"

export default function CreatePost() {
    const cookies = new Cookies(null, { path: '/' })
    const context = useLinkContext()
    const { toast } = useToast()
    const [rows, setRows] = useState(5)
    const maxRows = 10
    const maxChars = 500
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const [error, setError] = useState(false)
    

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const inputText = e.target.value
    
        // Limit input to maxChars
        if (inputText.length <= maxChars) {
          context?.setContent(inputText)
    
          // Adjust rows dynamically
          const textarea = textareaRef.current;
          if (textarea) {
            textarea.rows = 1; // Reset rows to recalculate height
            const computedRows = Math.min(
              Math.floor(textarea.scrollHeight / 24), // Adjust this value based on line height
              maxRows
            )
            setRows(computedRows)
          }
        }
    }

    const handleClear = () => {
        context?.setAttachment('')
        context?.setContent('')
    }

    const handleOpenFileDialog = () => {
        console.log(error)
        let input = document.createElement('input')
        input.type = 'file'
        input.onchange = (_) => {
            // @ts-ignore
            let file = Array.from(input.files)[0]
            
            if (file.name.split('.')[1] !== 'jpg' && file.name.split('.')[1] !== 'jpeg' && file.name.split('.')[1] !== 'png' && file.name.split('.')[1] !== 'bmp')
                setError(true)
            else {
                if (file) {
                    const reader = new FileReader()
                    reader.onload = () => {
                        if (reader.result) 
                            context?.setAttachment(reader.result as string)
                    }
                    reader.readAsDataURL(file)
                }
            }
        }
        input.click()
    }

    const handlePost = async () => {
        if (cookies.get('user_email') && context) {
            const res = await postContent({ email: cookies.get('user_email'), mediaAttachmentBase64: context?.attachment, postTextContent: context?.content })

            if (res) {
                toast({
                    title: 'New posted success!',
                    description: 'Your new post has been successfully posted, slowly your post will start to get comments'
                })
                context?.setAttachment('')
                context?.setContent('')
            } else {
                toast({
                    title: 'Failed to post!',
                })
            }
        }
    }
    
    useEffect(() => {
        const textarea = textareaRef.current
        if (textarea) {
          textarea.style.height = "auto"
          textarea.style.height = `${textarea.scrollHeight}px`
        }
    }, [rows, context?.content])

    useEffect(() => console.log(context?.attachment), [context?.attachment])

  return (
    <div className="w-full flex flex-col items-center justify-start mt-7 md:mt-0">
        <div className="animate-in fade-in-0 duration-500 mt-10 text-center text-xl font-extrabold flex items-center justify-center gap-2">
            <p>Fuel the discussion—post away!</p>
        </div>
            {/* as */}
        {/* <p className="mt-5 text-4xl font-bold animate-in fade-in-0 duration-500">Create a post</p> */}

        <div className='w-[95%] md:w-[80%] flex flex-col items-center justify-start border rounded-lg shadow-md mt-5 p-5'>
            {context?.attachment !== '' && 
            <div className='w-full flex flex-col mb-10 items-center justify-center gap-1'>
                <div className='w-full flex items-center justify-between'>
                    <p className='self-start mb-1 font-medium'>Selected media attachment</p>
                    <Button onClick={() => context?.setAttachment('')} variant='ghost' size='icon' className='text-red-500 z-20'><CircleX /></Button>
                </div>
                <img src={context?.attachment} alt="attachment" className='select-none rounded-lg w-full h-auto object-cover' />
            </div>}

            <p className='self-start mb-1 font-medium'>Write your thoughts here</p>
            <textarea
                ref={textareaRef}
                value={context?.content}
                rows={rows}
                onChange={e => handleInput(e)}
                className="w-full text-gray-700 dark:text-gray-400 bg-transparent p-3 outline-none border rounded-lg shadow-sm resize-y overflow-auto min-h-[100px] max-h-[164px] " // max-h matches 6 rows x 24px (line-height)
                placeholder="Your text here..."
            />
            <div className="mt-2 text-sm text-gray-500">
                {context?.content.length}/{maxChars} characters
            </div>

            <div className='self-end flex items-center justify-center gap-2 mt-3'>
                <Button onClick={handleOpenFileDialog} variant='outline' size='icon' className='rounded-md'><Paperclip /></Button>
                
                <AlertDialog>
                    <AlertDialogTrigger>
                        <Button variant='outline' size='icon' className='bg-red-500 rounded-md text-white'><Trash2 /></Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will clear the media attachment and the context written.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleClear}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                <Button onClick={handlePost} variant='outline' size='icon' className='bg-green-500 rounded-md text-white'><SendHorizonal /></Button>
            </div>
        </div>
    </div>
  )
}
