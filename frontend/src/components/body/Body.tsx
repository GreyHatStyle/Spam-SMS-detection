import { useTheme } from "../../hooks/useTheme"
import ThemeToggleButton from "./ThemeToggleButton"

import PhoneGroup from "./PhoneGroup"
import { useSelectPhoneDevice } from "../../hooks/useSelectPhoneDevice"

function Body() {
    const backgroundImgLight = "./wallpaper/wall-light.png"
    const backgroundImgDark = "./wallpaper/wall-dark.png"

    const { theme, toggleTheme } = useTheme();
    const { selectedPhoneIndex, setSelectedPhoneIndex } = useSelectPhoneDevice();


    console.log("Which Phone selected: ", selectedPhoneIndex);

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
        onClick={()=>setSelectedPhoneIndex(null)}
        className={selectedPhoneIndex != null ? "block fixed h-screen w-screen bg-black/80 z-10" : "none"}
        >

        </div>
    </div>
    </>
    )
}

export default Body