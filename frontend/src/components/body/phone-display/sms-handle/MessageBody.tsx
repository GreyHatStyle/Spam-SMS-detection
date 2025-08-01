import type { MessageType } from "."


interface MessageBodyProps{
  messages: MessageType[]
}

function MessageBody(
  {
    messages,
  }: MessageBodyProps
) {

  return (
    <div id="message-body"
        className={`
        flex-1 overflow-y-auto
        flex flex-col gap-4 py-4 px-4
        md:text-[7px] md:py-2 md:px-2 md:gap-1
        xl:text-[9px] xl:gap-2
        `}
        >

        {
            messages.map( (message, index) => (
                
                <div key={index}
                    className={`
                    py-4 px-3 rounded-t-4xl 
                    md:py-2 md:px-2
                    ${message.type === "sent" ? 
                        `bg-[#D1E5F6] self-end rounded-l-4xl`
                        :
                        `bg-[#F0F0F2] self-start rounded-r-4xl`
                    }
                    max-w-[60dvw]
                    `}
                    >
                        {message.text}
                </div>
            ) )

        }
            
        </div>
  )
}

export default MessageBody