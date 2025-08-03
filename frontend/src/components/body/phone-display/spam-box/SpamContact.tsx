import { type ComponentProps, useState } from "react";
import { clsx } from "clsx";
import { type MessageType } from "./../sms-handle";

import SpamSMSArea from "./SpamSMSArea";
// import aliceNotiSound from "../../../../assets/alice_notify.mp3";
// import bobNotiSound from "../../../../assets/bob_notify.mp3";


interface SpamContactProps extends ComponentProps<"div"> {
  isSelected: boolean;
  userName: string;
  isMobileDevice?: boolean;
}

function SpamContact(
    {
    isSelected, 
    userName,
    isMobileDevice,
    className,
    ...props
    }: SpamContactProps) {
    
    // Not using useEffect here because state destroys and recreates itself
    const [numberOfMessages, setNumberOfMessages] = useState<number>( ()=>{
        const numSpam: number = parseInt(localStorage.getItem("spam_no") || "0");
        return numSpam;
    });
    const [smsScreenSelected, setSmsScreen] = useState<boolean>(false);
    
    let oldMessages : MessageType[] = JSON.parse(localStorage.getItem(`${userName}_spam_messages`) || '[]');
    const [lastMessage, setLastMessage] = useState<string>(()=>{
        if(oldMessages.length > 0){
            return oldMessages[oldMessages.length - 1].text;
        }
        return "";
    });
    

    const clearNotificationNumber = () =>{
        localStorage.setItem(`spam_no_${userName}`, "0");
    }

    return (
        <>
    <div id="spam-contact"
        {...props}
        onClick={()=>{setSmsScreen(true); setNumberOfMessages(0); clearNotificationNumber()} }
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
            <SpamSMSArea
            setLastMessage={setLastMessage} 
            username={userName}
            setSmsScreen={setSmsScreen}
            />
        }
        </>
    )
}

export default SpamContact