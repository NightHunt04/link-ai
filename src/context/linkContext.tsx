import { createContext, useContext, useState } from "react"

interface Props {
    children: React.ReactNode
}

interface LinkContextInterface {
    attachment: string
    setAttachment: React.Dispatch<React.SetStateAction<string>>

    content: string
    setContent: React.Dispatch<React.SetStateAction<string>>
}

export const LinkContext = createContext<LinkContextInterface | null>(null)

export const LinkContextProvider = (props: Props) => {
    // const [userEmail, setUserEmail] = useState('')
    // const [userUid, setUserUid] = useState('')
    // const [userDisplayName, setUserDisplayName] = useState('')
    // const [userPfp, setUserPfp] = useState('')
    const [attachment, setAttachment] = useState('')
    const [content, setContent] = useState('')

    return (
        <LinkContext.Provider value={{ attachment, content, setAttachment, setContent }}>
            {props.children}
        </LinkContext.Provider>
    )
}

export const useLinkContext = () => (useContext(LinkContext))