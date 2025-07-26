import { useEffect, useState } from "react";
import { useSelectPhoneDevice } from "./useSelectPhoneDevice";

const MOBILE_BREAKPOINT = 768

export function useIsMobile(){
  const [isMobileDevice, setMobileDevice] = useState<boolean>(window.innerWidth < 768)
  const { selectedPhoneIndex, setSelectedPhoneIndex } = useSelectPhoneDevice();

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

  useEffect( ()=> {
        /**
         * If Phone display is selected in small screen, then pressing "back button" should get user to home screen.
         */
        if(isMobileDevice && selectedPhoneIndex != null){
            window.history.pushState({mobileSelected: true}, "");
            const handlePopState = () =>{
                setSelectedPhoneIndex(null);
            }
            // if back button is pressed on mobile phone
            window.addEventListener("popstate", handlePopState);

            // Cleanup
            return () =>{
                window.removeEventListener("popstate", handlePopState);
            }
        }
    }, [isMobileDevice, selectedPhoneIndex]);

  return isMobileDevice
}