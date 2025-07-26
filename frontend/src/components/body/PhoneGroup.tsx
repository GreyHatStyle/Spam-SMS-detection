import { useSelectPhoneDevice } from "../../hooks/useSelectPhoneDevice";
import PhoneScreen from "./PhoneScreen"

function PhoneGroup() {
    const { selectedPhoneIndex, setSelectedPhoneIndex } = useSelectPhoneDevice();

    const openMobileDevice = (index :number) => setSelectedPhoneIndex(index)

  return (
    <div id="phone-grp" className="w-screen flex flex-row justify-around md:max-w-2xl xl:max-w-4xl gap-x-3">

            <PhoneScreen
            userName="Alice"
            messageFromUser="Bob"
            
            isSelectedScreen={selectedPhoneIndex==0}
            onClick={()=>openMobileDevice(0)}
            className={
                selectedPhoneIndex==0 ? 
                "transition-all absolute z-30 hover:cursor-default left-[45%] md:top-[20%] md:scale-200 xl:scale-150 xl:top-[10%]" 
                : 
                "hover:cursor-pointer mb-11"}
            />

            <PhoneScreen
            userName="Bob"
            messageFromUser="Alice"
            isSelectedScreen={selectedPhoneIndex==1}
            onClick={()=>openMobileDevice(1)}
            className={
                selectedPhoneIndex==1 ? 
                "transition-all absolute z-30 hover:cursor-default left-[45%] md:top-[20%] md:scale-200 xl:scale-150 xl:top-[10%]" 
                : 
                "hover:cursor-pointer mb-11"}
            />


        </div>
  )
}

export default PhoneGroup