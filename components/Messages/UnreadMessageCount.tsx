"use client";
import { useMessageContext } from "@/context/MessageContext";
import { Session } from "next-auth";
import React, { useEffect, useState } from "react";

type Props = { session: Session };

const UnreadMessageCount = ({ session }: Props) => {
  const { unReadMessagesCount, setUnReadMessagesCount } = useMessageContext();
  useEffect(() => {
    const fetchUnReadMessageCount = async () => {
      try {
        const res = await fetch("/api/messages/unread-count");
        if (res.ok) {
          const { messageCount } = await res.json();
          setUnReadMessagesCount(messageCount);
        } else {
          console.log("Something went wrong!");
        }
      } catch (error) {
        console.log(error);
      }
    };
    session ? fetchUnReadMessageCount() : null;
  }, [session]);

  return (
    unReadMessagesCount > 0 && (
      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
        {unReadMessagesCount}
      </span>
    )
  );
};

export default UnreadMessageCount;
