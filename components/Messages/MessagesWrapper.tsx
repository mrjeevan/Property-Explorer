"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../spinner";
import Message from "./Message";
import { IDisplayMessage } from "@/types/message";

type Props = {};

export default function MessagesWrapper({}: Props) {
  const [PropertyMessages, setPropertyMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch("/api/messages");
        if (res.ok) {
          const messages = await res.json();
          setPropertyMessages(messages);
        } else {
          const { message } = await res.json();
          toast.error(message);
        }
      } catch (error) {
        console.log("Error loading messages", error);
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);
  return (
    <div>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <section className="bg-blue-50">
          <div className="container m-auto py-24 max-w-6xl">
            <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
              <h1 className="text-3xl font-bold mb-4">Your Messages</h1>

              <div className="space-y-4">
                {PropertyMessages.length === 0 ? (
                  <p>No messages to display</p>
                ) : (
                  PropertyMessages.map((message: IDisplayMessage) => {
                    return <Message key={message._id} message={message} />;
                  })
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
