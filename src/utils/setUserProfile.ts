import axios from "axios"

interface Response {
    data: {
        msg: string,
        code: number,
        err?: string
    }
}

interface Props {
    email: string
    username: string
    bio: string
    pfp: string
}

export const setUserProfile = async ({ email, username, bio, pfp }: Props): Promise<boolean | undefined> => {
    let data = JSON.stringify({ email, username, bio, pfp })
      
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${import.meta.env.VITE_BACKEND_BASE_URL}/api/user/set-profile`,
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