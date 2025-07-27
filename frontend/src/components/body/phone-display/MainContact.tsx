import { type ComponentProps, useState } from "react";
import { clsx } from "clsx";
import SMSArea from "./SMSArea";

interface MainContactProps extends ComponentProps<"div"> {
  isSelected: boolean;
  userName: string;
  messageFromUser: string;
  isMobileDevice?: boolean;
}

function MainContact(
    {
    isSelected, 
    userName, 
    messageFromUser, 
    isMobileDevice,
    className,
    ...props
    }: MainContactProps) {

    const [numberOfMessages, _] = useState<number>(10);
    const [smsScreenSelected, setSmsScreen] = useState<boolean>(false);

    return (
        <>
    <div id="main-contact"
        {...props}
        onClick={()=>setSmsScreen(true)}
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
            `}>{messageFromUser}</p>
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
        
        {
            smsScreenSelected && isSelected && 
            <SMSArea 
            username={userName}
            setSmsScreen={setSmsScreen}
            />
        }
        </>
    )
}

export default MainContact