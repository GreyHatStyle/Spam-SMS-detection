import { type HTMLAttributes } from "react"

function PhoneDisplay(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props}
    className="
    py-6 px-4
    text-sm
    "
    >
    
    The holy display
    
    </div>
  )
}

export default PhoneDisplay