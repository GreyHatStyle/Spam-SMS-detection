import { useIsMobile } from "../../../../hooks/useIsMobile";
import { useSelectPhoneDevice } from "../../../../hooks/useSelectPhoneDevice"
import { useState} from "react"; 
import MessageBody from "../sms-handle/MessageBody";
import { type MessageType } from "../sms-handle";

interface SpamSMSAreaProps{
    username: string
    setSmsScreen: (val: boolean) => void
    setLastMessage: (text: string) => void
}

function SpamSMSArea(
    {
        username,
        setSmsScreen,
    }: SpamSMSAreaProps
) {
    const selectedPhone = useSelectPhoneDevice();
    const isMobileDevice = useIsMobile();
    const isSelected = selectedPhone != null;

    const senderUser = username;
    const senderSpamKey = `${senderUser}_spam_messages`;

    // Display the sms in SMS_BODY
    const [messages, _] = useState<MessageType[]>(() => { 
        const savedMessages = localStorage.getItem(senderSpamKey);
        return savedMessages ? JSON.parse(savedMessages) : [];
    });


    // console.log("Text message: ", messageRef.current);

    return (
    
    <div id="spam-sms-area"
        className={`
        fixed
        bg-[#FCFCFE] 
        flex flex-col 
        pb-2
        
        ${isSelected?
            `top-0 h-[100dvh] w-[100dvw] left-0
            md:top-[17px] md:left-[10.7px] md:rounded-b-xl md:h-[calc(90%)]
            md:w-[calc(86%)]
            xl:w-[calc(87%)]
            xl:top-[22.3px] xl:left-[13.6px]`
            :
            `hidden`
            
        }


        `}
        >
            <div id="selected-contact-header-sms"
            // Do the header of contact
            className={`
                flex flex-row justify-start items-center
                bg-[#E6EFF6]

                ${isSelected ? 
                    `py-3 gap-6 md:gap-2 md:py-1`
                    :
                    `py-1 gap-1 `
                }
            `}
            >

                <button id="back-button"
                onClick={()=>setSmsScreen(false)}
                className="p-1 sm:p-0 xl:p-1 hover:cursor-pointer"
                >
                    <svg 
                    className={`
                        ${isSelected?
                            `h-[48px] md:h-[15px] xl:h-[22px]`
                            :
                            `h-[15px]`
                        }
                    
                    `}
                    
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#000000"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>

                </button>
                
                <img src="./phone/default-user.png" alt="" 
                    className={`
                    ${isSelected && isMobileDevice?
                        `h-[50px]`
                        :
                        `h-[20px]`
                    }
                    `}
                />

                <h2
                className={`
                 

                ${isSelected ?
                    `text-4xl md:text-sm xl:text-lg`
                    :
                    ``
                }
                `}
                >
                    {username=="Alice" ? "Bob" : "Alice"}
                </h2>
            </div>

            {/* Messages Body  */}
            
            <MessageBody
            messages={messages}
            />


        </div>
  )
}

export default SpamSMSArea