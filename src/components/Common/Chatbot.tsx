"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { IoSend } from "react-icons/io5";

// Types
interface Message {
  role: "user" | "assistant";
  chatInput: string;
  isError?: boolean;
  timestamp?: Date;
}

// Constants

// Utility functions
const getOrCreateUserId = (): string => {
  if (typeof window === "undefined") return "";

  const id = crypto.randomUUID();
  localStorage.setItem("chatbot_user_id", id);
  return id;
};

// Function to convert URLs to clickable links
const convertUrlsToLinks = (text: string | unknown): React.ReactNode[] => {
  if (typeof text !== "string") {
    console.warn("⚠️ Expected string in convertUrlsToLinks, got:", typeof text);
    return [String(text || "")]; // safe fallback
  }

  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const result: React.ReactNode[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(urlRegex)) {
    const url = match[0];
    const index = match.index ?? 0;

    if (lastIndex < index) {
      result.push(text.slice(lastIndex, index));
    }

    result.push(
      <a
        key={index}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline hover:text-blue-800"
        onClick={(e) => e.stopPropagation()}
      >
        {url}
      </a>,
    );

    lastIndex = index + url.length;
  }

  if (lastIndex < text.length) {
    result.push(text.slice(lastIndex));
  }

  return result;
};

const validateInput = (content: string): string | null => {
  if (!content || content.trim().length === 0) {
    return "Message cannot be empty";
  }
  if (content.length > 500) {
    return "Message is too long (max 500 characters)";
  }
  return null;
};

const formatTimestamp = (date: Date): string => {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export default function Chatbot() {
  // State
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [userId, setUserId] = useState<string>("");

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Callbacks
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleSendMessage = useCallback(async () => {
    if (!input.trim() || loading) return;

    // Clear previous errors
    setError(null);

    // Validate input
    const validationError = validateInput(input);
    if (validationError) {
      setError(validationError);
      return;
    }

    const userMsg: Message = {
      role: "user",
      chatInput: input.trim(),
      timestamp: new Date(),
    };

    setMessages((msgs) => [...msgs, userMsg]);
    const currentInput = input.trim();
    setInput("");
    setLoading(true);

    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    try {
      const requestBody = {
        sessionId: userId,
        chatInput: currentInput,
        source: {
          platform: "setinbound.com",
          contact: "user",
        },
        timestamp: new Date(),
      };

      const res = await fetch("/proxy/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      const output = data.output;

      if (output) {
        const assistantMsg: Message = {
          role: "assistant",
          chatInput: output,
          timestamp: new Date(),
        };
        setMessages((msgs) => [...msgs, assistantMsg]);
      } else {
        throw new Error("No response received from server");
      }
    } catch (err: unknown) {
      clearTimeout(timeoutId);

      let errorMessage = "An error occurred while sending your message.";

      if (err instanceof Error) {
        if (err.name === "AbortError") {
          errorMessage = "Request timed out. Please try again.";
        } else if (err.message.includes("Failed to fetch")) {
          errorMessage =
            "Unable to connect to server. Please check your connection.";
        } else if (err.message.includes("HTTP error! status: 400")) {
          errorMessage = "Invalid request. Please check your message.";
        } else if (err.message.includes("HTTP error! status: 500")) {
          errorMessage = "Server error. Please try again later.";
        } else {
          errorMessage = err.message || errorMessage;
        }
      }

      setError(errorMessage);
      console.error("Error sending message:", err);

      // Add error message to chat
      const errorMsg: Message = {
        role: "assistant",
        chatInput: "Sorry, I encountered an error. Please try again.",
        isError: true,
        timestamp: new Date(),
      };
      setMessages((msgs) => [...msgs, errorMsg]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, userId]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    },
    [handleSendMessage],
  );

  const handleToggleChatbot = useCallback(() => {
    setChatbotOpen((prev) => !prev);
    setError(null);
  }, []);

  const handleCloseChatbot = useCallback(() => {
    setChatbotOpen(false);
    setError(null);
  }, []);

  const handleEscapeKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && chatbotOpen) {
        handleCloseChatbot();
      }
    },
    [chatbotOpen, handleCloseChatbot],
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInput(e.target.value);
      if (error) setError(null);
    },
    [error],
  );

  const clearChat = useCallback(() => {
    setMessages([
      {
        role: "assistant",
        chatInput: "Hello! I am your AI assistant. How can I help you today?",
        timestamp: new Date(),
      },
    ]);
    setError(null);
  }, []);

  // Effects
  useEffect(() => {
    setUserId(getOrCreateUserId());

    // Init messages
    setMessages([
      {
        role: "assistant",
        chatInput: "Hello! I am your AI assistant. How can I help you today?",
        timestamp: new Date(),
      },
    ]);
  }, []);

  // scroll to bottom
  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, scrollToBottom]);

  // focus on input
  useEffect(() => {
    if (chatbotOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [chatbotOpen]);

  // Listen for Escape key to close chatbot
  useEffect(() => {
    if (chatbotOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      return () => {
        document.removeEventListener("keydown", handleEscapeKey);
      };
    }
    return undefined; // <-- Add this line
  }, [chatbotOpen, handleEscapeKey]);

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      const maxHeight = 80; // Reduced max height
      const newHeight = Math.min(inputRef.current.scrollHeight, maxHeight);
      inputRef.current.style.height = `${newHeight}px`;
    }
  }, [input]);

  const renderMessage = (message: Message, index: number) => (
    <div
      key={index}
      className={`mb-4 animate-fade-in ${message.role === "user" ? "text-right" : "text-left"}`}
    >
      <div
        className={`inline-block max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed xs:max-w-[90%] ${
          message.role === "user"
            ? "bg-accent-BLUE text-white shadow-lg"
            : message.isError
              ? "bg-accent-RED text-white shadow-lg"
              : "border border-gray-100 bg-primary-WHITE text-secondary-GRAY shadow-md"
        }`}
      >
        <div className="break-words">
          {convertUrlsToLinks(message.chatInput)}
        </div>
        {message.timestamp && (
          <div
            className={`mt-2 text-xs ${
              message.role === "user"
                ? "text-blue-100"
                : error
                  ? "text-gray-100"
                  : "text-gray-500"
            }`}
          >
            {formatTimestamp(message.timestamp)}
          </div>
        )}
      </div>
    </div>
  );

  const renderTypingIndicator = () => (
    <div className="mb-4 animate-fade-in text-left">
      <div className="inline-block max-w-[85%] rounded-2xl border border-gray-100 bg-primary-WHITE px-4 py-3 shadow-md">
        <div className="flex items-center space-x-1">
          <div className="h-2 w-2 animate-bounce rounded-full bg-accent-BLUE"></div>
          <div
            className="h-2 w-2 animate-bounce rounded-full bg-accent-BLUE"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="h-2 w-2 animate-bounce rounded-full bg-accent-BLUE"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Chatbot Container */}
      <div
        className={`fixed z-50 w-[95%] max-w-lg transform overflow-hidden rounded-b-3xl rounded-t-3xl border-4 border-secondary-LIGHT_GRAY bg-primary-WHITE shadow-2xl transition-all duration-500 ease-out xs:left-0 xs:top-0 xs:h-screen xs:w-full xs:transform-none sm:left-1/2 sm:top-[5%] sm:h-[90vh] sm:w-[95%] sm:max-w-none sm:-translate-x-1/2 md:top-1/2 md:h-[605px] md:w-[90%] md:max-w-lg md:-translate-y-1/2 ${
          chatbotOpen
            ? "left-1/2 top-1/2 block -translate-x-1/2 -translate-y-1/2 scale-100 opacity-100"
            : "pointer-events-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-95 opacity-0"
        }`}
      >
        {/* Header */}
        <div className=" bg-secondary-LIGHT_GRAY px-6 py-4 text-primary-WHITE ">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div>
                <h1 className="text-lg font-bold">Web Chatbot</h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={clearChat}
                className="rounded-lg px-3 py-1.5 text-xs font-medium text-white/80 transition-colors hover:bg-white/20"
                title="Clear chat"
              >
                Clear
              </button>
              <button
                onClick={handleCloseChatbot}
                className="rounded-lg p-2 text-white/80 transition-colors hover:bg-white/20"
                aria-label="Close chatbot"
              >
                x
              </button>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 p-3">
            <div className="mx-2 my-2 rounded-lg border border-red p-3">
              <div className="flex items-center gap-2">
                <span className="text-red-500">⚠️</span>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="h-96 overflow-y-auto bg-gray-50 p-5 xs:h-[250px] sm:h-[300px] md:h-[400px]">
          {messages.map((message, index) => renderMessage(message, index))}
          {loading && renderTypingIndicator()}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Container */}
        <div className="bg-gray-50 p-5">
          <form
            className="flex items-end gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
          >
            <div className="relative flex-1">
              <textarea
                ref={inputRef}
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={
                  loading ? "Waiting for response..." : "Type your message..."
                }
                maxLength={500}
                rows={1}
                className="w-full resize-none overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-secondary-GRAY placeholder-gray-500 transition-all duration-200 focus:border-accent-BLUE focus:outline-none focus:ring-2 focus:ring-accent-BLUE/20 disabled:cursor-not-allowed disabled:opacity-60"
                aria-label="Chat message input"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !input.trim()}
              className={`mb-1 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-accent-BLUE text-white shadow-lg transition-all duration-200 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 ${
                !loading && input.trim()
                  ? "hover:scale-105 active:scale-95"
                  : ""
              }`}
              aria-label="Send message"
            >
              {loading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              ) : (
                <IoSend />
              )}
            </button>
          </form>

          <div className="mt-2 h-4 text-center text-xs text-gray-500">
            {input.length > 300 && `${input.length}/500 characters`}
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        className={`fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full border-2 bg-accent-BLUE px-8 py-5 text-sm font-semibold text-white shadow-xl transition-all duration-300 ease-out hover:border-2 hover:border-secondary-GRAY hover:bg-primary-WHITE hover:text-secondary-GRAY active:translate-y-0 ${
          chatbotOpen
            ? "pointer-events-none scale-90 opacity-0"
            : "scale-100 opacity-100"
        }`}
        onClick={handleToggleChatbot}
        aria-label="Open chatbot"
      >
        <span>Web Chatbot</span>
      </button>
    </>
  );
}
