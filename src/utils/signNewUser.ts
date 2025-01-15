import axios from "axios"

interface Response {
    data: {
        msg: string
    }
}

interface Props {
    email: string
    uid: string
    displayName: string
}

export const signNewUser = async ({ email, uid, displayName }: Props): Promise<boolean | undefined> => {
    let data = JSON.stringify({ email, displayName, uid })
      
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:8000/api/user/sign-user',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
    }
      
    const response: Response = await  axios.request(config)

    if (response.data.msg === 'Success')
        return true
    return false
}