import { useRef, useState } from "react";
import { useCheckSpamHam } from "../../../../api/checkSpamHam";
import type { MessageType } from ".";


interface InputMessageProps{
    isSelected: boolean
    addMessage: ({text, type}: MessageType) => void
}

function InputMessage(
    {
        isSelected,
        addMessage,
    }: InputMessageProps
) {
    

    const messageRef = useRef<string>("");
    const {mutate} = useCheckSpamHam();
    const [inputBoxVal, setInputBoxVal] = useState<string>("");


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        messageRef.current = e.target.value;
        setInputBoxVal(e.target.value);
    }

    const handleSendMessage = (e: React.FormEvent) =>{
        e.preventDefault();
        // console.log("Message: ", messageRef.current);

        const textMessage: MessageType = {
            text: messageRef.current,
            type: "sent",
        }

        addMessage(textMessage);
        mutate(messageRef.current, {
            onSuccess: (data) => {
                console.log("API Success - The text is: ", data?.message);
            },
            onError: (error) => {
                console.log("API Error: ", error);
            }
        });
        
        setInputBoxVal("");
        
    }

  return (
    <form action=""
            
            className={`
                flex flex-row items-center
                
                ${isSelected?
                    `h-[60px] p-2 gap-4 
                    md:h-[30px] md:p-0 md:gap-1 `
                    :
                    `h-[30px] p-1 gap-2`
                }
            `}
            >

                
                <input type="text"
                id="sms-input"
                onChange={handleInputChange}
                value={inputBoxVal}
                placeholder="Enter message here..." 
                className={`bg-[#EAF1F9] flex-1 rounded-2xl
                    ${isSelected ?
                        `h-[40px]
                        md:w-[30px] md:h-[30px] md:text-[7px] 
                        xl:text-[9px]
                        ml-2 px-2`
                        :
                        `w-[60px] cursor-pointer pointer-events-none`
                    }    
                `}
                />

                <button type="submit"
                onClick={handleSendMessage}
                className={`
                bg-[#D0E5F6]
                rounded-[50%]
                
                hover:cursor-pointer
                ${isSelected ?
                    `py-[10px] pr-[10px] pl-[11px]

                    ${'' /*When viewing on tablet or desktop*/}
                    md:h-[30px] md:w-[30px]
                    md:py-[2px] md:pl-[7px] 

                    `
                    :
                    `py-[2px] pl-[4px] pr-[3px]
                    
                    `
                }
                `}
                >
                    <svg 
                    className={`
                        ${isSelected?
                            `h-[26px] md:h-[20px]`
                            :
                            `h-[16px]`
                        }
                    `}
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#000000"><path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z"/></svg>

                </button>

            </form>
  )
}

export default InputMessage