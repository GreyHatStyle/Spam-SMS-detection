

interface BackSpamBoxButProps{
    openSpamBox: (val: boolean) =>void
    isMobileDevice: boolean
}

function BackSpamBoxBut(
    {
        openSpamBox,
        isMobileDevice
    }:BackSpamBoxButProps
) {
  return (

    <button
        id="back-button-spam"
        onClick={()=>openSpamBox(false)}
        className="absolute top-0 left-0
            md:top-[-5px] md:left-[-3px]
            xl:top-0 xl:left-0   
            bg-[#D1E5F4] hover:cursor-pointer"
        >
            <svg className={`
            ${isMobileDevice?
                `h-[60px] py-2 px-2`
                :
                `h-[20px] py-1 px-1
                xl:h-[30px]`
            }
            `}
           xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#000000"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
        </button>
  )
}

export default BackSpamBoxBut