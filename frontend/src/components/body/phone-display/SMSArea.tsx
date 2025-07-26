import { useIsMobile } from "../../../hooks/useIsMobile";
import { useSelectPhoneDevice } from "../../../hooks/useSelectPhoneDevice"

interface SMSAreaProps{
    username: string
    setSmsScreen: (val: boolean) => void
}

function SMSArea(
    {
        username,
        setSmsScreen,
    }: SMSAreaProps
) {
    const isSelected = useSelectPhoneDevice();
    const isMobileDevice = useIsMobile();

    return (
    
    <div id="sms-area"
        className={`
        fixed
        bg-[#FCFCFE] 
        flex flex-col 
        pb-2
        
        ${isSelected?
            `top-0 h-[100dvh] w-[99dvw]
            md:top-[17px] md:left-[10.7px] md:rounded-b-xl md:h-[calc(90%)]
            md:w-[calc(86%)]
            xl:w-[calc(87%)]
            xl:top-[22.3px] xl:left-[13.6px]`
            :
            `hidden`
            
        }


        `}
        >
            <div id="selected-contact-header-sms"
            // Do the header of contact
            className={`
                flex flex-row justify-start items-center
                bg-[#E6EFF6]

                ${isSelected ? 
                    `py-3 gap-6 md:gap-2 md:py-1`
                    :
                    `py-1 gap-1 `
                }
            `}
            >

                <button id="back-button"
                onClick={()=>setSmsScreen(false)}
                className="p-1 sm:p-0 xl:p-1 hover:cursor-pointer"
                >
                    <svg 
                    className={`
                        ${isSelected?
                            `h-[48px] md:h-[15px] xl:h-[22px]`
                            :
                            `h-[15px]`
                        }
                    
                    `}
                    
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#000000"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>

                </button>
                
                <img src="./phone/default-user.png" alt="" 
                    className={`
                    ${isSelected && isMobileDevice?
                        `h-[50px]`
                        :
                        `h-[20px]`
                    }
                    `}
                />

                <h2
                className={`
                 

                ${isSelected ?
                    `text-4xl md:text-sm xl:text-lg`
                    :
                    ``
                }
                `}
                >
                    {username=="Alice" ? "Bob" : "Alice"}
                </h2>
            </div>

            {/* Messages Body  */}
            <div id="message-body"
            className={`
            flex-1 overflow-y-auto
            `}
            >
                SMS messages
            </div>

            
            {/* Input Message form */}
            <form action=""
            
            className={`
                flex flex-row items-center
                
                ${isSelected?
                    `h-[60px] p-2 gap-4 
                    md:h-[30px] md:p-0 md:gap-1 `
                    :
                    `h-[30px] p-1 gap-2`
                }
            `}
            >

                
                <input type="text" 
                className={`bg-[#EAF1F9] flex-1 rounded-2xl
                    ${isSelected ?
                        `h-[40px]
                        md:w-[30px] md:h-[30px]`
                        :
                        `w-[60px] cursor-pointer pointer-events-none`
                    }    
                `}
                />

                <button type="submit"
                className={`
                bg-[#D0E5F6]
                rounded-[50%]
                
                hover:cursor-pointer
                ${isSelected ?
                    `py-[10px] pr-[10px] pl-[11px]

                    ${'' /*When viewing on tablet or desktop*/}
                    md:h-[30px] md:w-[30px]
                    md:py-[2px] md:pl-[7px] 

                    `
                    :
                    `py-[2px] pl-[4px] pr-[3px]
                    
                    `
                }
                `}
                >
                    <svg 
                    className={`
                        ${isSelected?
                            `h-[26px] md:h-[20px]`
                            :
                            `h-[16px]`
                        }
                    `}
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#000000"><path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z"/></svg>

                </button>

            </form>

        </div>
  )
}

export default SMSArea