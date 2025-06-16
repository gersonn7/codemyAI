import { useState } from "react";

const ChatBox = ({onPushMessage, disable})=>{
    const[message, setMessage] = useState('')
    const handleSubmit = (event)=>{
        event.preventDefault();
        onPushMessage(message);
        setMessage('');
    }
    return (
  <div className="border-t border-slate-400 bg-slate-500-50/80 p-4">
    <form className="flex items-center space-x-3" onSubmit={handleSubmit}>
        <textarea 
            value={message} 
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();       // impede quebra de linha
                handleSubmit(e);          // envia o formulário
            }
            }}
            placeholder="Qual tecnologia você tem dúvidas?"
            disabled={disable}
            className="flex-1 px-5 py-3 bg-slate-600 border border-slate-400 rounded-2xl shadow-sm outline-none text-white focus:ring-2 focus:ring-slate-200 resize-none"
        />
        <button 
            type="submit"
            disabled={disable}
            className="self-center flex-shrink-0 px-8 py-3 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-500 text-white rounded-full hover:from-slate-800 hover:to-slate-900 cursor-pointer disabled:from-gray-400 disabled:to-gray-300 disabled:cursor-not-allowed font-bold"
        >
            Enviar
        </button>
    </form>
  </div>
);

}

export default ChatBox