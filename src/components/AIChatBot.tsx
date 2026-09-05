import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, X, Bot, Loader2 } from "lucide-react";
import { CREATOR_NAME } from "../lib/data";

interface Message {
  role: "user" | "model";
  content: string;
}

const QUICK_REPLIES = [
  "What services do you offer?",
  "How to partner with you?",
  "Tell me about Nafyad",
];

export const AIChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      content:
        "Ask me about Nafyad’s work, content strategy, services, or how to build a sharper tech brand.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show greeting bubble after 3 seconds if not open
    const timer = setTimeout(() => {
      if (!isOpen) setShowGreeting(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) setShowGreeting(false);
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isStreaming]);

  const handleSend = async (customInput?: string) => {
    const messageToSend = customInput || input;
    if (!messageToSend.trim() || isLoading || isStreaming) return;

    const userMessage = messageToSend.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    // Dynamically calculate Nafyad's current age
    const birthDate = new Date("2001-05-27");
    const today = new Date();
    let currentAge = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      currentAge--;
    }
    const dateStr = today.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "text/event-stream",
        },
        body: JSON.stringify({
          messages: messages.map((m) => ({ role: m.role, content: m.content })),
          userMessage: userMessage,
          currentAge: currentAge,
          dateStr: dateStr,
        }),
      });

      const isStream = response.headers.get("content-type")?.includes("text/event-stream");

      if (isStream && response.body) {
        setIsLoading(false);
        setIsStreaming(true);
        // Add model message slot for incoming chunks
        setMessages((prev) => [...prev, { role: "model", content: "" }]);

        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let accumulatedText = "";
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || !trimmed.startsWith("data: ")) continue;
            const payload = trimmed.slice(6);
            if (payload === "[DONE]") {
              break;
            }
            try {
              const parsed = JSON.parse(payload);
              if (parsed.error) {
                throw new Error(parsed.error);
              }
              if (parsed.text) {
                accumulatedText += parsed.text;
                setMessages((prev) => {
                  const updated = [...prev];
                  const lastIdx = updated.length - 1;
                  if (lastIdx >= 0 && updated[lastIdx].role === "model") {
                    updated[lastIdx] = {
                      ...updated[lastIdx],
                      content: accumulatedText,
                    };
                  }
                  return updated;
                });
              }
            } catch (e: any) {
              if (e.message && e.message !== "Unexpected end of JSON input") {
                throw e;
              }
            }
          }
        }

        setIsStreaming(false);
      } else {
        let data: any = null;
        try {
          const text = await response.text();
          try {
            data = JSON.parse(text);
          } catch {
            data = { status: response.ok ? "ok" : "error", message: text };
          }
        } catch (err: any) {
          throw new Error(`Failed to read response: ${err.message}`);
        }

        if (response.ok && data && data.status === "ok" && data.reply) {
          setMessages((prev) => [...prev, { role: "model", content: data.reply }]);
        } else {
          const msg = (data && (data.message || data.error)) || `Server returned status ${response.status}`;
          throw new Error(msg);
        }
      }
    } catch (error: any) {
      console.error("Chat Error:", error);
      const errText = error.message || "";
      const isConfigError = errText.includes("GEMINI_API_KEY") || errText.includes("API key") || errText.includes("API_KEY");
      
      let userFriendlyErrorMessage = "AI is briefly offline for maintenance. Direct inquiries are still active.";
      if (isConfigError) {
        userFriendlyErrorMessage = `Configuration Error: ${errText}. Please make sure you have added GEMINI_API_KEY as an Environment Variable.`;
      }

      setMessages((prev) => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        if (last && last.role === "model" && !last.content) {
          updated[updated.length - 1] = { role: "model", content: userFriendlyErrorMessage };
          return updated;
        }
        return [...updated, { role: "model", content: userFriendlyErrorMessage }];
      });
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
    }
  };

  return (
    <>
      {/* Greeting Bubble */}
      <AnimatePresence>
        {showGreeting && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.8 }}
            className="fixed bottom-20 right-6 z-50 bg-brand-purple text-white px-4 py-2 rounded-2xl rounded-br-none shadow-xl text-xs font-medium cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            How can I help you?
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button */}
      <motion.button
        id="ai-bot-trigger"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-brand-purple rounded-full flex items-center justify-center shadow-2xl overflow-hidden group"
      >
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        {isOpen ? (
          <X className="text-white w-6 h-6" />
        ) : (
          <MessageSquare className="text-white w-6 h-6" />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="ai-chat-window"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-20 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[380px] h-[440px] max-h-[calc(100vh-6.5rem)] bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between bg-black/40">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-purple/20 flex items-center justify-center border border-brand-purple/40">
                  <Bot className="w-4 h-4 text-brand-purple" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-widest">
                    {CREATOR_NAME} AI
                  </div>
                  <div className="text-[10px] text-brand-purple font-medium flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                    Online & Ready
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/40 hover:text-white transition-colors"
                id="close-chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-3.5 space-y-3 custom-scrollbar"
            >
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[88%] p-3 rounded-xl text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-brand-purple text-white rounded-tr-none"
                        : "bg-white/5 text-white/80 border border-white/10 rounded-tl-none"
                    }`}
                  >
                    {m.content ? (
                      m.content
                        .split(/\n+/)
                        .filter((p) => p.trim().length > 0)
                        .map((paragraph, pIdx, arr) => (
                          <p key={pIdx} className={pIdx < arr.length - 1 ? "mb-2.5" : ""}>
                            {paragraph}
                          </p>
                        ))
                    ) : (
                      <span className="text-white/40 text-xs italic">Thinking...</span>
                    )}

                    {/* Real-time word-by-word cursor indicator */}
                    {isStreaming && idx === messages.length - 1 && m.role === "model" && (
                      <span className="inline-block w-1.5 h-3.5 bg-brand-purple ml-1 animate-pulse align-middle" />
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-xl rounded-tl-none flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-brand-purple animate-spin" />
                    <span className="text-xs text-white/50">Streaming response...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Replies */}
            {messages.length === 1 && !isLoading && !isStreaming && (
              <div className="px-3.5 py-2 flex flex-wrap gap-1.5 bg-black/20 border-t border-white/5">
                {QUICK_REPLIES.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => handleSend(reply)}
                    className="text-[10px] font-bold uppercase tracking-widest bg-white/5 hover:bg-brand-purple/20 border border-white/10 hover:border-brand-purple/40 px-3 py-1.5 rounded-full text-white/60 hover:text-white transition-all cursor-pointer"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t border-white/10 bg-black/40">
              <div className="relative">
                <input
                  id="chat-input"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask me anything..."
                  disabled={isLoading || isStreaming}
                  className="w-full bg-white/5 border border-white/10 rounded-full px-4 py-3 pr-12 text-sm text-white focus:outline-none focus:border-brand-purple transition-colors disabled:opacity-50"
                />
                <button
                  id="send-message"
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading || isStreaming}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-brand-purple flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

