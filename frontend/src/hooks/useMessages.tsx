import {createContext, useContext, useState, type ReactNode } from "react";
import type { MessageType } from "../components/body/phone-display/sms-handle";

interface LastMessageOfUser{
    lastMessage: string
    setLastMessage: (message: string) => void
}

export const LastMessageOfUserContext = createContext<LastMessageOfUser | undefined>(undefined);


export function MessagesProvider({
    children,
    userName,
}: {
    children: ReactNode,
    userName: string
}
){
    // Staring with some dummy message
        if(localStorage.length === 0){
            localStorage.setItem("Alice_phone_messages", JSON.stringify(
                [
                    {
                        text: "Hey Bob how are you??",
                        type: "sent",
                    },
                    {
                        text: "Hi!! Alice I am fine",
                        type: "received",
                    },
                ]
            ))
            localStorage.setItem("Bob_phone_messages", JSON.stringify(
                [
                    {
                        text: "Hey Bob how are you??",
                        type: "received",
                    },
                    {
                        text: "Hi!! Alice I am fine",
                        type: "sent",
                    },
                ]
            ))
        }

    
    const [lastMessage, setLastMessage] = useState<string>(()=>{
        const messages: MessageType[] = JSON.parse(localStorage.getItem(`${userName}_phone_messages`) || "") || [];
        
        const lastIndex = messages.length > 0 ? (messages.length - 1) : 0;
        return messages.length > 0 ? messages[lastIndex].text : "";
    });



    return (
        <LastMessageOfUserContext.Provider value={{ lastMessage, setLastMessage }}>
        {children}
        </LastMessageOfUserContext.Provider>
    );
}

export function useMessages(){

    const context = useContext(LastMessageOfUserContext);

    if(context === undefined){
        throw new Error("useMessages must be used within a MessageProvider")
    }

    return context;
}