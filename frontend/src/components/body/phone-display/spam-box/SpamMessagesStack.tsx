import { useSelectPhoneDevice } from "../../../../hooks/useSelectPhoneDevice";
import SpamContact from "./SpamContact";

interface SpamMessagesStackProps{
    isSelected: boolean
    isMobileDevice: boolean
}

function SpamMessagesStack(
    {
        isSelected,
        isMobileDevice,
    }: SpamMessagesStackProps
) {
    const selectedPhone = useSelectPhoneDevice();
  return (
    <div id="spam-messages-stack"
        style={{
          msOverflowStyle: "none",
          scrollbarWidth: "none"
        }}
        className={`
            overflow-y-scroll md:max-h-[180px] xl:max-h-[270px]
        px-2 
        md:px-1

        ${isSelected ? 
            `w-full`
            :
            ``
        }    
        `}
        >
            <SpamContact
            isSelected={isSelected}
            isMobileDevice={isMobileDevice}
            userName={selectedPhone.selectedPhoneIndex == 0? "Alice" : "Bob"}
            />
        </div>

  )
}

export default SpamMessagesStack