import { useEffect, useState } from "react";
import clsx from "clsx";
import { type ComponentProps } from "react";

interface MenuNotificationProps extends ComponentProps<"div">{
    isSelected: boolean
    userName: string
}

function MenuNotification(
    {
        isSelected,
        userName,
        className,
        ...props
    }: MenuNotificationProps
) {
    const [menuNotification, setMenuNotification] = useState<number>(0);
    const receiverUser = userName;
    useEffect(()=>{
        const intervalId = setInterval(()=>{
            const spam_no: string = localStorage.getItem(`spam_no_${receiverUser}`) || "0";

            if(spam_no !== "0"){
                setMenuNotification(parseInt(spam_no));
            }
            else{
                setMenuNotification(0);
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [])

  return (
    <div>
        {menuNotification!=0 && 
        <div 
        {...props}
        id="menu-notification"
            className={clsx(`
                absolute bg-red-500 text-white 
                rounded-[50%] top-0 right-0
                ${isSelected ?
                    `text-sm px-1.5 
                    md:text-[6px] md:px-[3px]
                    xl:top-1
                    `
                    :
                    `text-[6px]
                    px-[3px]
                    xl:top-1
                    `
                }
            `, className)}
            >
                {menuNotification}
            </div>
        
        }
    </div>
  )
}

export default MenuNotification