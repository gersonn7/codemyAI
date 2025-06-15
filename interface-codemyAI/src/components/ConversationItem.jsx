import React, { useState, useRef, useEffect } from "react";

const ConversationItem = ({
  conversation,
  onSelect,
  isActive,
  onDelete,
  onUpdateTitle,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(conversation.title);
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSaveTitle = () => {
    if (newTitle.trim() === "") return;
    onUpdateTitle(conversation.id, newTitle.trim());
    setEditing(false);
    setMenuOpen(false);
  };

  return (
    <div
      className={`flex items-center justify-between p-2 rounded cursor-pointer transition-colors
        ${isActive ? "bg-slate-700" : "bg-transparent hover:bg-slate-600"}`}
      onClick={() => !editing && onSelect(conversation.id)}
    >
      {editing ? (
        <input
          type="text"
          autoFocus
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSaveTitle();
            if (e.key === "Escape") {
              setEditing(false);
              setNewTitle(conversation.title);
              setMenuOpen(false);
            }
          }}
          className="bg-slate-700 text-white rounded px-2 py-1 flex-grow"
        />
      ) : (
        <span className="text-white truncate text-sm">{conversation.title}</span>
      )}

      <div className="relative" ref={menuRef}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen((open) => !open);
          }}
          aria-label="Menu"
          className="ml-2 p-1 rounded hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
        >
          <svg
            className="w-6 h-6 text-teal-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="5" cy="12" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="19" cy="12" r="2" />
          </svg>
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-36 bg-slate-800 rounded shadow-lg z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setEditing(true);
                setMenuOpen(false);
              }}
              className="flex items-center w-full text-left px-4 py-2 hover:bg-slate-700 text-white space-x-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-teal-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 3.487a2.25 2.25 0 013.182 3.182l-9.44 9.44-4.243 1.415a.75.75 0 01-.97-.97l1.415-4.243 9.44-9.44z"
                />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 7.5L16.5 4.5" />
              </svg>
              <span>Editar título</span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(conversation.id);
                setMenuOpen(false);
              }}
              className="flex items-center w-full text-left px-4 py-2 hover:bg-red-700 text-red-400 hover:text-white space-x-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 00-1 1v1h6V4a1 1 0 00-1-1m-4 0h4"
                />
              </svg>
              <span>Excluir</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationItem;
