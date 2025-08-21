import { useEffect, useState } from "react";
import { useSelectPhoneDevice } from "./useSelectPhoneDevice";
import { useJoyStore } from "../store/useJoyStore";

const MOBILE_BREAKPOINT = 768

export function useIsMobile(){
  const [isMobileDevice, setMobileDevice] = useState<boolean>(window.innerWidth < 768)
  const { selectedPhoneIndex, setSelectedPhoneIndex } = useSelectPhoneDevice();

  const jr = useJoyStore();

  useEffect( ()=>{
    /**
     * Will check if width is low enough to give Phone Display whole screen (instead of scale zoom effect)
     */
    const handleResize = () =>{
        setMobileDevice(window.innerWidth < MOBILE_BREAKPOINT);
    }

    window.addEventListener('resize', handleResize);
    
    // cleanup event listener on component unmount
    return () =>{
        window.removeEventListener('resize', handleResize);
    }
  }, []);

  const handlePopState = () =>{
        setSelectedPhoneIndex(null);
        console.log("Step index =================================> ", jr.tState.stepIndex)
        jr.setRun(false);

        if (jr.tState.stepIndex >= 4){

          if(jr.tState.stepIndex >= 7){
            // do nothing since this state should direct be true in spam box
            return;
          }
            // Its bob's phone
            jr.setRun(true);
            jr.setStepIndex(jr.tState.stepIndex + 1);
        }

    }

  useEffect( ()=> {
        /**
         * If Phone display is selected in small screen, then pressing "back button" should get user to home screen.
         */
        if(isMobileDevice && selectedPhoneIndex != null){
            window.history.pushState({mobileSelected: true}, "");
            
            
            
            // if back button is pressed on mobile phone
            window.addEventListener("popstate", handlePopState);

            // Cleanup
            return () =>{
                window.removeEventListener("popstate", handlePopState);
            }
        }
    }, [isMobileDevice, selectedPhoneIndex, handlePopState]);

  return isMobileDevice
}