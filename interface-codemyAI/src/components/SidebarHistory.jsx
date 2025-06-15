import ConversationItem from "./ConversationItem";

const SidebarHistory = ({
  conversations,
  onSelect,
  activeId,
  onDelete,
  onUpdateTitle,
  onNewChat,
}) => {
  return (
    <aside className="w-64 bg-slate-800 p-2 text-white flex flex-col">
      <button
        onClick={onNewChat}
        className="mb-4 px-4 py-2 bg-slate-700 rounded hover:bg-slate-900 cursor-pointer flex items-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 8h10M7 12h6m-3 8a9 9 0 100-18 9 9 0 000 18z"
            opacity={0.3}
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h12a2 2 0 012 2z"
          />
        </svg>
        Novo chat
      </button>

      <h3 className="text-white/60 p-2 ">Chats</h3>

      <div className="flex flex-col space-y-1 overflow-y-auto flex-1">
        {conversations.map((conv) => (
          <ConversationItem
            key={conv.id}
            conversation={conv}
            onSelect={onSelect}
            isActive={conv.id === activeId}
            onDelete={onDelete}
            onUpdateTitle={onUpdateTitle}
          />
        ))}
      </div>
    </aside>
  );
};

export default SidebarHistory;
