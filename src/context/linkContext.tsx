import { createContext, useContext, useState } from "react"

interface Props {
    children: React.ReactNode
}

interface LinkContextInterface {
    isNew: boolean
    setIsNew: React.Dispatch<React.SetStateAction<boolean>>
}

export const LinkContext = createContext<LinkContextInterface | null>(null)

export const LinkContextProvider = (props: Props) => {
    // const [userEmail, setUserEmail] = useState('')
    // const [userUid, setUserUid] = useState('')
    // const [userDisplayName, setUserDisplayName] = useState('')
    // const [userPfp, setUserPfp] = useState('')
    const [isNew, setIsNew] = useState(false)

    return (
        <LinkContext.Provider value={{ isNew, setIsNew }}>
            {props.children}
        </LinkContext.Provider>
    )
}

export const useLinkContext = () => (useContext(LinkContext))