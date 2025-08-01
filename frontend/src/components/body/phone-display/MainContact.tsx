import { type ComponentProps, useEffect, useState } from "react";
import { clsx } from "clsx";
import SMSArea, { type MessageType } from "./sms-handle";
import { useMessages } from "../../../hooks/useMessages";
import aliceNotiSound from "../../../assets/alice_notify.mp3";
import bobNotiSound from "../../../assets/bob_notify.mp3";

interface MainContactProps extends ComponentProps<"div"> {
  isSelected: boolean;
  userName: string;
  isMobileDevice?: boolean;
}

function MainContact(
    {
    isSelected, 
    userName,
    isMobileDevice,
    className,
    ...props
    }: MainContactProps) {

    const [numberOfMessages, setNumberOfMessages] = useState<number>(0);
    const [smsScreenSelected, setSmsScreen] = useState<boolean>(false);
    
    // Replace the useState with useMessages hook
    const { lastMessage, setLastMessage } = useMessages();
    
    // Nothing worked so using a little brute force practice
    let oldMessages : MessageType[] = JSON.parse(localStorage.getItem(`${userName}_phone_messages`) || '[]');
    useEffect( () => {
        const intervalId = setInterval(() =>{
            const messageData: MessageType[] = JSON.parse(localStorage.getItem(`${userName}_phone_messages`) || '[]');
            if(messageData.length > 0){
                setLastMessage(messageData[messageData.length - 1].text);
            }
            if(oldMessages.length !== messageData.length){
                if(messageData.length > 0){
                    if(messageData[messageData.length - 1].type == "received"){
                        oldMessages = messageData;
                        setNumberOfMessages(prev => prev + 1);
                        let audio = null;
                        if(userName === "Alice"){
                            audio = new Audio(aliceNotiSound);
                        }
                        else{
                            audio = new Audio(bobNotiSound);
                        }
                        console.log("Audio username: ", userName);
                        audio.play();
                    }
                }
                
            }

        }, 1000) // check every second

        return () => clearInterval(intervalId);
    }, [lastMessage, setLastMessage]);

    return (
        <>
    <div id="main-contact"
        {...props}
        onClick={()=>{setSmsScreen(true); setNumberOfMessages(0); } }
        className={clsx(`
            rounded-2xl
            flex flex-row
            justify-start items-center
            bg-white
            shadow-sm
            ${isSelected && isMobileDevice?
            // Phone on hand
            `gap-4 p-2 my-2`
            :
            // Phone on table
            `gap-2 p-1 my-1`
            }

            ${isSelected? "hover:cursor-pointer hover:bg-gray-200" : " "}


        
        `, className)}
        >
            <img src="./phone/default-user.png" alt="" 
            className={`
            ${isSelected && isMobileDevice?
                `h-[50px]`
                :
                `h-[20px]`
            }
            `}
            />
            <div className={`
            flex-1 min-w-0
            ${isSelected && isMobileDevice?
                `text-lg`
                :
                `text-sm`
            }
            `}>
                <h3 className="font-bold">
                {
                userName == "Alice" ? "Bob" : "Alice"    
                }
                </h3>
                <p className={`
                truncate overflow-hidden whitespace-nowrap
            ${isSelected && isMobileDevice?
                `text-[18px]`
                :
                `text-[8px]`
            }
            `}>{lastMessage}</p>
            </div>

            {
            // Shows side notification is message arrives
            numberOfMessages>0 && 
            
            <div id="circle-notification"
            className={`
            ml-auto
            rounded-[50%]
            bg-blue-600 text-white
            ${isSelected && isMobileDevice?
                `py-1 px-2`
                :
                `text-[8px] py-[1px] px-[4px]`
            }

            `}
            >
                {numberOfMessages}
            </div>
            }
        </div>
        
        {
            smsScreenSelected && isSelected && 
            <SMSArea
            setLastMessage={setLastMessage} 
            username={userName}
            setSmsScreen={setSmsScreen}
            />
        }
        </>
    )
}

export default MainContact