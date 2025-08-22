import { type ComponentProps } from "react"
import PhoneDisplay from "./PhoneDisplay"
import clsx from "clsx"
import { useTheme } from "../../hooks/useTheme";


interface PhoneScreenProps extends ComponentProps<"div"> {
  isSelectedScreen: boolean;
  userName: string;
}

function PhoneScreen({
  isSelectedScreen, 
  userName, 
  ...props
}: PhoneScreenProps) {

  const phone_img = "./phone/phone_white.png"
  const phone_dark_img = "./phone/phone_dark.png"

  const {theme} = useTheme();
  console.log("Theme in phone screen: ", theme);

  console.log("Username: ", `${userName}-phone-screen`)
  return (
    <div {...props}
        id="main-phone-screen"
        style={{backgroundImage: `url(${theme==="Light" ? phone_img : phone_dark_img})`}}
        
        className={clsx(`
        ${userName}-phone-screen
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
  )
}

export default PhoneScreen