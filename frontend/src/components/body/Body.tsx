import { useTheme } from "../../hooks/useTheme"
import ThemeToggleButton from "./ThemeToggleButton"

import PhoneGroup from "./PhoneGroup"
import { useSelectPhoneDevice } from "../../hooks/useSelectPhoneDevice"
import { useJoyStore } from "../../store/useJoyStore"

function Body() {
    const backgroundImgLight = "./wallpaper/wall-light.png"
    const backgroundImgDark = "./wallpaper/wall-dark.png"

    const { theme, toggleTheme } = useTheme();
    const { selectedPhoneIndex, setSelectedPhoneIndex } = useSelectPhoneDevice();
    const setRun = useJoyStore((state) => state.setRun);
    const joyrideStepIndex = useJoyStore((state) => state.tState.stepIndex);
    const setJoyStepIndex = useJoyStore((state) => state.setStepIndex);
    
    

    return (
    <>
    {/* Preloading image to avoid the white screen flash (occurring first time when switch to dark mode) */}
    <img src={backgroundImgLight} alt="" style={{display: "none"}} />
    <img src={backgroundImgDark} alt="" style={{display: "none"}} />


    <div 
      style={{backgroundImage: `url(${theme==="Light" ? backgroundImgLight : backgroundImgDark})`}}
      className="
        fixed bg-center
        top-0 left-0
        transition-all duration-700
        w-full h-full
        flex flex-col items-center justify-around
        md:bg-cover
      "
    >
       <ThemeToggleButton 
       theme={theme} toggleTheme={toggleTheme}
       />
        
        <PhoneGroup />
        
                
        <div id="black-screen"
        onClick={()=>{
          setSelectedPhoneIndex(null); 
          setRun(false);
          if (joyrideStepIndex >= 4){
            if(joyrideStepIndex >= 7){
            // do nothing since this state should direct be true in spam box
            return;
          }
            // Its bob's phone
            setRun(true);
            setJoyStepIndex(joyrideStepIndex + 1);
            console.log("Black screen being clicked!!")
          }}}
        className={selectedPhoneIndex != null ? "block fixed h-screen w-screen bg-black/80 z-10" : "none"}
        >

        </div>
    </div>
    </>
    )
}

export default Body