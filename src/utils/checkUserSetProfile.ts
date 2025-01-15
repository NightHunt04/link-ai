import axios from 'axios'

interface Response {
    data: APIResponse
}

interface APIResponse {
    msg: string
    code: number
}

export const checkUserSetProfile = async (email: string): Promise<boolean | undefined> => {
    let data = JSON.stringify({ email })
      
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${import.meta.env.VITE_BACKEND_BASE_URL}/api/user/check-setup-profile`,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
    }
      
    const response: Response = await axios.request(config)

    if (response.data.code === 1) return true

    return false
}