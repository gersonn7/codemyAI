import { useState, useEffect } from "react";
import ListMessage from "../components/ListMessage";
import ChatBox from "../components/chatBox";
import SidebarHistory from "../components/SidebarHistory";
import { api } from "../services/api";

const ChatTechnology = () => {
  const [conversations, setConversations] = useState(() => {
    const stored = localStorage.getItem("conversations");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch {
        localStorage.removeItem("conversations");
      }
    }
    const id = Date.now();
    return [
      {
        id,
        title: "Conversa nova",
        messages: [
          {
            id: id + 1,
            text: "Olá! Sou seu professor de desenvolvimento. Como posso ajudar você hoje?",
            remetente: "bot",
          },
        ],
      },
    ];
  });

  const [activeConversationId, setActiveConversationId] = useState(() => {
    const stored = localStorage.getItem("conversations");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed[0].id;
        }
      } catch {
      }
    }
    return conversations[0].id;
  });

  const [loading, setLoading] = useState(false);

  const activeConversation = conversations.find(
    (c) => c.id === activeConversationId
  );

  useEffect(() => {
    localStorage.setItem("conversations", JSON.stringify(conversations));
  }, [conversations]);

  const handleNewConversation = () => {
    const id = Date.now();
    const newConv = {
      id,
      title: "Conversa nova",
      messages: [
        {
          id: id + 1,
          text: "Olá! Sou seu professor de desenvolvimento. Como posso ajudar você hoje?",
          remetente: "bot",
        },
      ],
    };
    setConversations((prev) => [...prev, newConv]);
    setActiveConversationId(id);
  };

  const onPushMessage = async (text) => {
    if (!activeConversation) return;

    const newMessageUser = {
      id: Date.now(),
      text,
      remetente: "user",
    };

    const updatedMessages = [...activeConversation.messages, newMessageUser];
    updateConversationMessages(activeConversationId, updatedMessages);

    const onlyBotMessage =
      activeConversation.messages.length === 1 &&
      activeConversation.messages[0].remetente === "bot";

    if (onlyBotMessage) {
      const tituloCurto = text.length > 20 ? text.slice(0, 17) + "..." : text;
      updateConversationTitle(activeConversationId, tituloCurto);
    }

    try {
      setLoading(true);
      const response = await api(text);
      const newMessageBot = {
        id: Date.now() + 1,
        text: response,
        remetente: "bot",
      };
      updateConversationMessages(activeConversationId, [
        ...updatedMessages,
        newMessageBot,
      ]);
    } catch (err) {
      const newMessageError = {
        id: Date.now(),
        text: "Falha ao enviar, tente novamente!",
        remetente: "bot",
      };
      updateConversationMessages(activeConversationId, [
        ...updatedMessages,
        newMessageError,
      ]);
    } finally {
      setLoading(false);
    }
  };

  const updateConversationMessages = (id, messages) => {
    setConversations((prev) =>
      prev.map((conv) => (conv.id === id ? { ...conv, messages } : conv))
    );
  };

  const updateConversationTitle = (id, newTitle) => {
    setConversations((prev) =>
      prev.map((conv) => (conv.id === id ? { ...conv, title: newTitle } : conv))
    );
  };

  const handleSelectConversation = (id) => {
    setActiveConversationId(id);
  };

  const handleDeleteConversation = (id) => {
    setConversations((prev) => prev.filter((conv) => conv.id !== id));
    if (activeConversationId === id) {
      const nextConv = conversations.find((conv) => conv.id !== id);
      setActiveConversationId(nextConv ? nextConv.id : null);
    }
  };

  const handleUpdateTitle = (id, newTitle) => {
    setConversations((prev) =>
      prev.map((conv) => (conv.id === id ? { ...conv, title: newTitle } : conv))
    );
  };

  return (
    <div className="min-h-screen bg-slate-900 p-4 flex">
      <SidebarHistory
        conversations={conversations}
        onSelect={handleSelectConversation}
        activeId={activeConversationId}
        onDelete={handleDeleteConversation}
        onUpdateTitle={handleUpdateTitle}
        onNewChat={handleNewConversation}
      />

      <div className="flex-1 ml-4">
        <div className="container mx-auto max-w-4xl">
          <header className="text-center mb-8">
            <h1 className="text-5xl font-bold text-teal-400 mb-2">
              &lt; CodeMy &gt;
            </h1>
            <p className="text-white/70">Seu professor de programação</p>
          </header>

          <div className="bg-slate-800 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl h-[600px] border border-slate-600 flex flex-col">
            {activeConversation ? (
              <>
                <ListMessage
                  message={activeConversation.messages}
                  loading={loading}
                />
                <ChatBox onPushMessage={onPushMessage} disable={loading} />
              </>
            ) : (
              <div className="text-white/60 text-center m-auto px-4">
                <p className="text-lg">Inicie uma nova conversa para começar.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatTechnology;
