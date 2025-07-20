import type { HTMLAttributes } from "react"
import PhoneDisplay from "./PhoneDisplay"
import clsx from "clsx"

function PhoneScreen(props: HTMLAttributes<HTMLDivElement>) {
  const phone_img = "./phone/phone_white.png"



  return (
    <div>
        <div {...props}
        style={{backgroundImage: `url(${phone_img})`}}
        
        className={clsx(`
        h-[297px] w-[150px]
        mt-[80px]
        bg-cover bg-center
        border-black border-2
        shadow-lg shadow-black/70
        rounded-3xl

        xl:h-[397px] xl:w-[200px]
        `, props.className)}
        >
          
          <PhoneDisplay

          />

        </div>
    </div>
  )
}

export default PhoneScreen