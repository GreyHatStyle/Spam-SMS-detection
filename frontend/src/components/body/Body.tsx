import { useEffect, useState } from "react"
import PhoneScreen from "./PhoneScreen"
import PhoneDisplay from "./PhoneDisplay"

function Body() {
    const backgroundImgLight = "./wallpaper/wall-light.png"
    const backgroundImgDark = "./wallpaper/wall-dark.png"

    const [theme, setTheme] = useState<string>("Light")
    const [isMobileDevice, setMobileDevice] = useState<boolean>(window.innerWidth < 768)
  
    const [selectedPhoneIndex, setSelectedPhoneIndex] = useState<null | number>(null);

    function toggleTheme(){
        setTheme(theme === "Light" ? "Dark" : "Light");
    }

    useEffect( ()=>{
        /**
         * Will check if width is low enough to give Phone Display whole screen (instead of scale zoom effect)
         */
        const handleResize = () =>{
            setMobileDevice(window.innerWidth < 768);
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

    function openMobileDevice(index :number){
        // if(window.innerWidth < 678){
            // selectMobile(true)
        // }
        setSelectedPhoneIndex(index)
    }

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
        <button
          className="
            bg-white/70 py-3 px-6
            rounded-2xl
            hover:cursor-pointer hover:scale-110 hover:bg-white hover:shadow-md hover:shadow-black/65
            font-bold
            transition-all ease-in
            mt-5
          "
          onClick={toggleTheme}
        >
            {theme==="Light" ? "Dark": "Light"} Mode
        </button>
        
        <div id="phone-grp" className="w-screen flex flex-row justify-around md:max-w-2xl xl:max-w-4xl gap-x-3">

            <PhoneScreen
            onClick={()=>openMobileDevice(0)}
            className={
                selectedPhoneIndex==0 ? 
                "transition-all absolute z-30 hover:cursor-default left-[45%] md:top-[20%] md:scale-200 xl:scale-150 xl:top-[10%]" 
                : 
                "hover:cursor-pointer mb-11"}
            />

            <PhoneScreen
            onClick={()=>openMobileDevice(1)}
            className={
                selectedPhoneIndex==1 ? 
                "transition-all absolute z-30 hover:cursor-default left-[45%] md:top-[20%] md:scale-200 xl:scale-150 xl:top-[10%]" 
                : 
                "hover:cursor-pointer mb-11"}
            />


        </div>
                
        <div id="black-screen"
        onClick={()=>setSelectedPhoneIndex(null)}
        className={selectedPhoneIndex != null ? "block fixed h-screen w-screen bg-black/80 z-10" : "none"}
        >

        </div>

        {isMobileDevice && selectedPhoneIndex!=null &&

        <div
        className="
            fixed top-0 left-0
            w-screen h-screen
            bg-white
            z-50
            overflow-auto
            "
        >

            <PhoneDisplay 
            />

        </div>
        }

    </div>
    </>
    )
}

export default Body