import { useState, type HTMLAttributes } from "react"

interface MenuButtonProps extends HTMLAttributes<HTMLDivElement>{
  isSelected: boolean
  isMobileDevice?: boolean
}

function MenuButton(
    {
        isSelected,
        isMobileDevice,
        ...props
    }: MenuButtonProps
) {

    const [isMenuSelected, openMenu] = useState<boolean>(false);

  return (
    <div
    {...props}
    >

        <button
        onClick={()=>openMenu(true)}
        className={`
        absolute top-[-20px]
        hover:cursor-pointer 
        xl:pt-1
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
            
        </button>

    
        {/* Slider Menu */}

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
                `h-screen w-[200px] top-[-43px]`
                :
                `h-[265px] w-[70px] xl:w-[100px] mt-[20px]${''/* top css was not working apparently, so used mt to align it little downwards*/}
                md:ml-[2px] md:rounded-bl-lg top-[-22.5px]
                xl:rounded-bl-2xl xl:top-[-17px] xl:h-[355px] xl:left-[-2px]
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
        className={`
         w-full 
         bg-slate-400
         
        hover:cursor-pointer
        font-bold
        ${isMobileDevice?
            `py-3 rounded-lg`:
            `py-[3px] rounded-sm`
        }    
        `}
        >
            SPAM Texts
        </button>
        </div>
        
        

    </div>
  )
}

export default MenuButton