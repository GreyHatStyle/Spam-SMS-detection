import { useIsMobile } from "../../../hooks/useIsMobile"
import MenuNotification from "./MenuNotification"

interface SliderMenuProps{
    isMenuSelected: boolean
    openMenu: (val: boolean) => void
    isSelected: boolean
    userName: string,
    openSpamBox: (val: boolean) => void
    
}

function SliderMenu(
    {
        isMenuSelected,
        openMenu,
        isSelected,
        openSpamBox,
        userName,
    }: SliderMenuProps
) {

    const isMobileDevice = useIsMobile();

  return (
     <div
        className={`
        absolute
        
        left-[-4px]
        bg-slate-300/80 
        shadow-md
        z-200
        flex flex-col gap-3
        transition-transform duration-300 ease-in-out
        md:text-[10px]
        
        ${isSelected? 
            isMobileDevice ?
                `h-screen w-[200px] top-[-6px]`
                :
                `h-[268px] w-[70px] xl:w-[100px] mt-[20px]${''/* top css was not working apparently, so used mt to align it little downwards*/}
                md:ml-[2px] md:rounded-bl-xl top-[-5.6px] md:left-[-6px]
                xl:rounded-bl-2xl xl:top-[0px] xl:h-[359px] xl:left-[-3px]
                `
            :
            `hidden`
        }
        
        ${isMobileDevice?
            isMenuSelected ?
            `translate-x-0`
            :
            `-translate-x-full`
        :
            isMenuSelected ?
            `translate-x-0 block`
            :
            `hidden`
        }

        `}
        >
        
        <button
        id="close-menu-button"
        onClick={()=>openMenu(false)}
         className={`
            self-end
             py-3 px-2
            cursor-pointer
        `}
        >

            <svg className={`
            ${isMobileDevice?
                `h-[25px]`
                :
                `h-[15px]`
            }
            `}
            xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#000000"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/></svg>

        </button>


        <button
        onClick={()=>{openSpamBox(true); openMenu(false)}}
        className={`
         w-full 
         bg-slate-400
         flex flex-row
         justify-center-safe
        items-center
        hover:cursor-pointer
        font-bold
        relative
        ${isMobileDevice?
            `py-3 rounded-lg gap-3`:
            `py-[3px] rounded-sm gap-1 text-[6px] xl:text-[10px]`
        }    
        `}
        >
            <svg 
            className={`
            ${isSelected ? 
                `h-[24px] md:h-[10px] xl:h-[12px]`
                :
                ``
            }    
            `}
            xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"  fill="#000000"><path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>

            SPAM BOX

            <MenuNotification
            userName={userName} 
            isSelected={isSelected}

            />

        </button>
    
    </div>
        
  )
}

export default SliderMenu