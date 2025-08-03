import { useIsMobile } from "../../../../hooks/useIsMobile";
import { useSelectPhoneDevice } from "../../../../hooks/useSelectPhoneDevice"
import { useState} from "react"; 
import InputMessage from "./InputMessage";
import MessageBody from "./MessageBody";

interface SMSAreaProps{
    username: string
    setSmsScreen: (val: boolean) => void
    setLastMessage: (text: string) => void
}

export interface MessageType{
    text: string
    type: "sent" | "received"
    timestamp?: Date
}

function SMSArea(
    {
        username,
        setSmsScreen,
        setLastMessage,
    }: SMSAreaProps
) {
    const selectedPhone = useSelectPhoneDevice();
    const isMobileDevice = useIsMobile();
    const isSelected = selectedPhone != null;

    const senderUser = username;
    const receiverUser = username === "Alice" ? "Bob" : "Alice";

    const senderStorageKey = `${senderUser}_phone_messages`;
    const receiverStorageKey = `${receiverUser}_phone_messages`;
    
    const receiverSpamKey = `${receiverUser}_spam_messages`

    // Display the sms in SMS_BODY
    const [messages, setMessage] = useState<MessageType[]>(() => { 
        const savedMessages = localStorage.getItem(senderStorageKey);
        return savedMessages ? JSON.parse(savedMessages) : [];
    });

    
    const addMessage = ({text, type}: MessageType): void => {
        if(text.trim() === "") return;

        setMessage(prev => [
            ...prev,
            {
                text: text,
                type: type,
            }
        ]);

        // Update THIS user's last message display
        setLastMessage(text);

        // re-updating the sender's message
        const senderMessages = JSON.parse(localStorage.getItem(senderStorageKey) || '[]');

        const updatedSenderMessage: MessageType[] = [
            ...senderMessages,
            {
                text: text,
                type: "sent",
            }
        ];

        // making the sender's message and received for receiver's perspective.

        const receiverMessages = JSON.parse(localStorage.getItem(receiverStorageKey) || '[]');

        const updatedReceiverMessages: MessageType[] = [
            ...receiverMessages,
            {
                text: text,
                type: "received",
            }
        ]

        localStorage.setItem(senderStorageKey, JSON.stringify(updatedSenderMessage));
        localStorage.setItem(receiverStorageKey, JSON.stringify(updatedReceiverMessages));

    }

    
    
    /**
     * Adds Spam message/text in local storage.
     * @returns void
     */
    const addSpamMessage = ({text}: MessageType): void => {
        if(text.trim() === "") return;

        // making the sender's message and received for receiver's perspective.

        const receiverMessages = JSON.parse(localStorage.getItem(receiverSpamKey) || '[]');

        const updatedReceiverMessages: MessageType[] = [
            ...receiverMessages,
            {
                text: text,
                type: "received",
            }
        ]

        // localStorage.setItem(senderSpamKey, JSON.stringify(updatedSenderMessage));
        localStorage.setItem(receiverSpamKey, JSON.stringify(updatedReceiverMessages));

        // Did this to show notification to spam box
        const spam_no_str = localStorage.getItem(`spam_no_${receiverUser}`);
        console.log("spam no: ", spam_no_str)

        let spam_number: number = parseInt(spam_no_str || "0");
        
        if (spam_number == 0){
            console.log("spam no: null", spam_no_str)
            spam_number = 1;
        }
        else{
            console.log("spam no: parseInt", spam_no_str);
            spam_number += 1;
        }
        
        console.log("spam no: last", spam_number);
        localStorage.setItem(`spam_no_${receiverUser}`, spam_number.toString());

    }

    // console.log("Text message: ", messageRef.current);

    return (
    
    <div id="sms-area"
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

            
            {/* Input Message form */}
            <InputMessage
                addMessage={addMessage}
                addSpamMessage={addSpamMessage}
                isSelected={isSelected}
            />

        </div>
  )
}

export default SMSArea