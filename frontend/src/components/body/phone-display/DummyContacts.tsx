import { type HTMLAttributes} from "react"
import dummyMessages from "../../../data/dummy-messages.json"

interface DummyContactProps extends HTMLAttributes<HTMLDivElement>{
  isSelected: boolean
  userName: string
  messageFromUser: string
  isMobileDevice?: boolean
}

function DummyContact(
    {
    isSelected, 
    userName, 
    messageFromUser, 
    isMobileDevice,
    ...props
    }: DummyContactProps
){

    return (
        <div {...props}
        >
        
        {
            dummyMessages.map((contact) =>(

              <div key={contact.id}
              className={`
              
              rounded-2xl
              flex flex-row
              justify-start items-center
              bg-white
              shadow-sm
              
              ${isSelected && isMobileDevice?
                // mobile device is on hand
                `gap-4 p-2 my-2`
                :
                // mobile device is on ground
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
                      `text-xl`
                      :
                      `text-sm`
                    }
                    `}>
                      <h3 className="font-bold">{contact.userName}</h3>
                      <p className={`
                      truncate overflow-hidden whitespace-nowrap
                    ${
                      isSelected && isMobileDevice?
                      `text-[18px]`
                      :
                      `text-[8px]`
                    }
                    `}>{contact.messageFromUser}</p>
                  </div>

                  {
                  // Shows side notification is message arrives
                  contact.unreadCount>0 && 
                  
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
                        {contact.unreadCount}
                    </div>
                  }
            </div>
            ))

          }

        
        </div>
    )
}

export default DummyContact