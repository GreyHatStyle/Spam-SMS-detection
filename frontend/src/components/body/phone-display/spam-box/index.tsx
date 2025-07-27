import { useIsMobile } from "../../../../hooks/useIsMobile"
import BackSpamBoxBut from "./BackSpamBoxBut";
import SpamMessagesStack from "./SpamMessagesStack";

interface SpamBoxProps{
    isSelected: boolean
    openSpamBox: (val: boolean) => void
}

function SpamBox(
    {
        isSelected,
        openSpamBox,
    }: SpamBoxProps
) {
    const isMobileDevice = useIsMobile();

  return (
    //   bg-[#F6F9FE]
    <div id="Spam-Box"
    className={`
    absolute
   bg-[#F6F9FE]
    flex flex-col items-center
    ${isMobileDevice ?
        `h-[100dvh] w-[100dvw] top-0`
        :
        `h-full w-full top-0`
    }

    `}
    >
        
        <div id="display-spam-head"
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
          SPAM BOX
        </div>

        <BackSpamBoxBut 
        isMobileDevice={isMobileDevice}
        openSpamBox={openSpamBox}
        />
        
        <SpamMessagesStack 
        isMobileDevice={isMobileDevice}
        isSelected={isSelected}
        />
        
        
    </div>
  )
}

export default SpamBox