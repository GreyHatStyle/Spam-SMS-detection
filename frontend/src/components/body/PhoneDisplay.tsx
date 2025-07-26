import {type HTMLAttributes } from "react"
import MainContact from "./phone-display/MainContact"
import DummyContact from "./phone-display/DummyContacts"
import MenuButton from "./phone-display/MenuButton"
import { useIsMobile } from "../../hooks/useIsMobile"
import { useCurrentTime } from "../../hooks/useCurrentTime"

interface PhoneDisplayProps extends HTMLAttributes<HTMLDivElement>{
  isSelected: boolean
  userName: string
  messageFromUser: string
  isMobileDevice?: boolean
}


function PhoneDisplay(
  { isSelected, 
    userName,
    messageFromUser,
    ...props 
  }: PhoneDisplayProps) {

    const isMobileDevice = useIsMobile();
    const currentTime = useCurrentTime();
    

// bg-[#F6F9FE]
  return (
    <div id="main-phone-display" 
    {...props}
    className={`
    ${isSelected && isMobileDevice ?
      `fixed top-[-3px] left-0
        w-[100dvw] h-[100dvh]
        z-50`

        :
        `relative ${/* Added this relative to position Slider menu button*/''}`
    }
      
    text-sm
    bg-[#F6F9FE]
    ml-[2px] mr-[2.3px] mt-[2.8px]
    flex flex-col
    `}
    >
      
      <div id="current-time"
      className={`
      absolute
      text-white
      text-[7px] top-[-16px] left-[5.5px]
      xl:text-[9px] xl:top-[-13px] xl:left-[10px]
      
      ${isSelected && isMobileDevice?
        `hidden`
        :
        `block`
      }
      `}
      >
        
      {currentTime}
      </div>

        <div id="display-app-head"
        className={`
        text-center poppins-regular
        mx-2
        ${isSelected && isMobileDevice? 
          `text-3xl my-11
          md:text-sm
          `
          : 
          `text-sm my-5`
        }
        `}
        >
          Welcome To SMS App {userName}
        </div>

        <MenuButton
          isSelected={isSelected}
          isMobileDevice={isMobileDevice}
        />

        <div id="sms-messages-stack"
        // To hide the scroll bar
        style={{
          msOverflowStyle: "none",
          scrollbarWidth: "none"
        }}
        className={`overflow-y-scroll md:max-h-[180px] xl:max-h-[270px]
          
          ${isSelected ? `` : `max-h-[180px]`}
          
          `}
        >
          
          
          {/* Specific message we will deal with */}

          <MainContact 
              isSelected={isSelected}
              userName={userName}
              messageFromUser={messageFromUser}
              isMobileDevice={isMobileDevice}
          />

          {/* Dummy contacts */}
          
          <DummyContact 
            isSelected={isSelected}
            userName={userName}
            messageFromUser={messageFromUser}
            isMobileDevice={isMobileDevice}
          />

        </div>

    </div>
  )
}

export default PhoneDisplay