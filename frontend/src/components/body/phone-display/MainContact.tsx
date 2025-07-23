import { type HTMLAttributes, useState } from "react"

interface MainContactProps extends HTMLAttributes<HTMLDivElement>{
  isSelected: boolean
  userName: string
  messageFromUser: string
  isMobileDevice?: boolean
}

function MainContact(
    {
    isSelected, 
    userName, 
    messageFromUser, 
    isMobileDevice,
    ...props
    }: MainContactProps) {

    const [numberOfMessages, setNumberOfMessasges] = useState<number>(10);
    
    return (
        <>
    <div id="main-contact"
        {...props}
        className={`
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
        
        `}
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
                <h3 className="font-bold">{messageFromUser}</h3>
                <p className={`
                truncate overflow-hidden whitespace-nowrap
            ${isSelected && isMobileDevice?
                `text-[18px]`
                :
                `text-[8px]`
            }
            `}>New Message to check if user alive</p>
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
                `text-[8px] py-[1px] px-[2px]`
            }

            `}
            >
                {numberOfMessages}
            </div>
            }
        </div>

        </>
    )
}

export default MainContact