import type { HTMLAttributes } from "react"
import PhoneDisplay from "./PhoneDisplay"
import clsx from "clsx"

interface PhoneScreenProps extends HTMLAttributes<HTMLDivElement>{
  isSelectedScreen: boolean,
  userName: string
}

function PhoneScreen(
  { isSelectedScreen, 
    userName,
    ...props 
  }: PhoneScreenProps) {
  const phone_img = "./phone/phone_white.png"



  return (
    <div>
        <div {...props}
        style={{backgroundImage: `url(${phone_img})`}}
        
        className={clsx(`
        
        h-[297px] w-[150px]
        mt-[80px]
        bg-cover bg-center
        py-5 px-3
        xl:h-[397px] xl:w-[200px]
        `, props.className)}
        >
          
          <PhoneDisplay
              userName={userName}
              isSelected={isSelectedScreen}
          />

        </div>
    </div>
  )
}

export default PhoneScreen