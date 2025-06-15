    import { useEffect, useRef } from "react"
    import Message from "./Message"

    const ListMessage = ({message, loading})=>{
        const messageRef = useRef()
        const scrollBottom = ()=>{
            messageRef.current.scrollIntoView({ behavior: 'smooth'})
        }

        useEffect(() =>{
            scrollBottom()
        }, [message])

        return (
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
                {message.map(message => (
                    <Message key={message.id} message={message}/>
                ))}
                {loading &&(
                    <div className="flex justify-start">
                        <div className="bg-transparent rounded-2xl rounded-bl-none shadow-m">
                            <div className="flex space-x-2">
                                <div className="w-3 h-3 bg-slate-400 rounded-full animate-pulse"></div>
                                <div className="w-3 h-3 bg-slate-300 rounded-full animate-pulse delay-100"></div>
                                <div className="w-3 h-3 bg-slate-200 rounded-full animate-pulse delay-200"></div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messageRef}></div>
            </div>
        )
    }

    export default ListMessage