import {useEffect, useState, type HTMLAttributes } from "react"
import MainContact from "./phone-display/MainContact"
import DummyContact from "./phone-display/DummyContacts"
import MenuButton from "./phone-display/MenuButton"

interface PhoneDisplayProps extends HTMLAttributes<HTMLDivElement>{
  isSelected: boolean
  userName: string
  messageFromUser: string
  isMobileDevice?: boolean
}

function getCurrentTimeString(){
  const now = new Date();
  return now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

function PhoneDisplay(
  { isSelected, 
    userName,
    messageFromUser, 
    isMobileDevice,
    ...props 
  }: PhoneDisplayProps) {

    const [currentTime, setCurrentTime] = useState<string>(getCurrentTimeString());

    useEffect(() => {
      // Calculate ms until next minute
      const now = new Date();
      const msToNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

      const timeout = setTimeout(() => {
        setCurrentTime(getCurrentTimeString());

        const interval = setInterval(() => {
          setCurrentTime(getCurrentTimeString());
        }, 60000);

        // Save interval id to clear later
        (window as any)._phoneDisplayInterval = interval;
      }, msToNextMinute);

      return () => {
        clearTimeout(timeout);
        if ((window as any)._phoneDisplayInterval) {
          clearInterval((window as any)._phoneDisplayInterval);
        }
      };
    }, [])


  return (
    <div {...props}
    className={` 
    text-sm
    bg-[#F6F9FE]
    relative ${/* Added this relative to position Slider menu button*/''}
    `}
    >
      
      <div id="current-time"
      className={`
      absolute
      text-white
      text-[7px] top-[-33px] left-[5.5px]
      xl:text-[9px] xl:top-[-30px] xl:left-[10px]
      
      ${isMobileDevice?
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
        className={`overflow-y-auto 
          ${isMobileDevice?
            ``
            :
            `max-h-[180px] xl:max-h-[270px]`
          }
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