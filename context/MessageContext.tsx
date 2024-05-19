"use client";
import { createContext, useContext, useState } from "react";

const MessageContext = createContext<any>({});

export function MessageWrapper({ children }: { children: React.ReactNode }) {
  const [unReadMessagesCount, setUnReadMessagesCount] = useState(0);
  return (
    <MessageContext.Provider
      value={{ unReadMessagesCount, setUnReadMessagesCount }}
    >
      {children}
    </MessageContext.Provider>
  );
}

export function useMessageContext() {
  return useContext(MessageContext);
}
