import { useState, type HTMLAttributes } from "react"
import SliderMenu from "./SliderMenu";
import SpamBox from "./spam-box";
import MenuNotification from "./MenuNotification";

interface MenuButtonProps extends HTMLAttributes<HTMLDivElement>{
  isSelected: boolean
  userName: string
  isMobileDevice?: boolean
}

function MenuButton(
    {
        isSelected,
        isMobileDevice,
        userName,
        ...props
    }: MenuButtonProps
) {

    const [isMenuSelected, openMenu] = useState<boolean>(false);
    const [isSpamBoxOpened, openSpamBox ] = useState<boolean>(false);
    

  return (
    <div
    {...props}
    >

        <button id="open-slider-menu"
        onClick={()=>openMenu(true)}
        className={`
        absolute
        hover:cursor-pointer 
        xl:pt-1
        ${isSelected ?
            `top-4
            md:top-1
            `
            :
            `top-1`
        }
        `}
        >

            <svg 
            className={`
            ${isSelected && isMobileDevice?
                `h-[30px] ml-3`
                :
                `h-[15px] ml-1`
            }    
            `}
            xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960" fill="#000000"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>

            <MenuNotification
            isSelected={isSelected}
            userName={userName}
            />
            
        </button>

        

    
        {/* Slider Menu */}

        <SliderMenu 
        isMenuSelected={isMenuSelected}
        openMenu={openMenu}
        isSelected={isSelected}
        openSpamBox={openSpamBox}
        userName={userName}
        />
        
        {
            isSpamBoxOpened && isSelected &&

            <SpamBox
            openSpamBox={openSpamBox}
            isSelected={isSelected}
            
            />
        }
        

    </div>
  )
}

export default MenuButton