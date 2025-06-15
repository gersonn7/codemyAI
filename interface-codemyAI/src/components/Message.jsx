import ReactMarkdown from 'react-markdown'


const Message = ({ message }) => {
  const isBot = message.remetente === "bot";

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`max-w-xs lg:max-w-md px-5 py-4 rounded-2xl shadow-2xl hover:shadow-xl
          ${isBot
            ? 'bg-slate-700 text-slate-100 rounded-bl-none border-gray-300'
            : 'bg-gradient-to-r from-blue-500 to-indigo-700 text-white rounded-br-none'
          }`}
      >
        {isBot ? (
          <ReactMarkdown
            components={{
              h1: ({ node, ...props }) => (
                <h1 className="text-xl font-bold mb-2 text-white" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h2 className="text-lg font-semibold mb-2 text-white" {...props} />
              ),
              p: ({ node, ...props }) => (
                <p className="text-sm mb-2 text-white" {...props} />
              ),
              ul: ({ node, ...props }) => (
                <ul className="list-disc ml-5 text-sm text-white" {...props} />
              ),
              li: ({ node, ...props }) => (
                <li className="mb-1" {...props} />
              ),
              strong: ({ node, ...props }) => (
                <strong className="font-semibold" {...props} />
              ),
              code: ({ node, ...props }) => (
                <code className="bg-slate-600 px-1 rounded text-sm text-teal-300" {...props} />
              ),
              pre: ({ node, ...props }) => (
                <pre className="bg-slate-800 p-3 rounded-md overflow-x-auto text-sm" {...props} />
              ),
            }}
          >
            {message.text}
          </ReactMarkdown>
        ) : (
          <p className="text-sm whitespace-pre-line">{message.text}</p>
        )}
      </div>
    </div>
  );
};

export default Message;