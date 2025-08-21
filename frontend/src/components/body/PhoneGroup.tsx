import { useSelectPhoneDevice } from "../../hooks/useSelectPhoneDevice";
import { MessagesProvider } from "../../hooks/useMessages";
import PhoneScreen from "./PhoneScreen";
import { useJoyStore } from "../../store/useJoyStore";

function PhoneGroup() {
    const { selectedPhoneIndex, setSelectedPhoneIndex } = useSelectPhoneDevice();
    const openMobileDevice = (index: number) => setSelectedPhoneIndex(index);

    const setJoyrideRun = useJoyStore((state) => state.setRun);
    const joyrideIndex = useJoyStore((state) => state.tState.stepIndex);
    const setJoyIndex = useJoyStore((state) => state.setStepIndex);

    return (
        <div id="phone-grp" className="w-screen flex flex-row justify-around md:max-w-2xl xl:max-w-4xl gap-x-3">
            <MessagesProvider userName="Alice">
                <PhoneScreen
                    userName="Alice"
                    isSelectedScreen={selectedPhoneIndex == 0}
                    onClick={() => {
                        openMobileDevice(0)
                        if(joyrideIndex == 7){
                            console.log("Phone screen It is being on clicked!!");
                            setJoyIndex(joyrideIndex + 1);
                            setJoyrideRun(false);
                        }

                    }}
                    className={
                        selectedPhoneIndex == 0 ?
                            "transition-all absolute z-30 hover:cursor-default left-[45%] md:top-[20%] md:scale-200 xl:scale-150 xl:top-[10%]"
                            :
                            "hover:cursor-pointer mb-11"}
                />
            </MessagesProvider>

            <MessagesProvider userName="Bob">
                <PhoneScreen
                    userName="Bob"
                    isSelectedScreen={selectedPhoneIndex == 1}
                    onClick={() => {
                        openMobileDevice(1)
                        if(joyrideIndex === 5){
                            // bob phone opened 
                            setJoyrideRun(false);
                            setJoyIndex(joyrideIndex + 1);
                            
                        }
                    }
                    }
                    className={
                        selectedPhoneIndex == 1 ?
                            "transition-all absolute z-30 hover:cursor-default left-[45%] md:top-[20%] md:scale-200 xl:scale-150 xl:top-[10%]"
                            :
                            "hover:cursor-pointer mb-11"}
                />
            </MessagesProvider>
        </div>
    )
}

export default PhoneGroup