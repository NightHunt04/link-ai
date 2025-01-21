import axios from "axios"

interface Response {
    data: {
        msg: string,
        code: number,
        err?: string
    }
}

interface Props {
    postTextContent: string
    email: string
    mediaAttachmentBase64: string
}

export const postContent = async ({ postTextContent, email, mediaAttachmentBase64 }: Props): Promise<boolean | undefined> => {
    let data = JSON.stringify({ email, postTextContent, mediaAttachmentBase64 })
      
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${import.meta.env.VITE_BACKEND_BASE_URL}/api/post-data/post`,
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
    }
      
    const response: Response = await axios.request(config)

    if (response.data.code === 1)
        return true

    else console.log(`err while setting profike: ${response.data.err}`)
    return false
}