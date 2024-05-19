import { useMessageContext } from "@/context/MessageContext";
import { IDisplayMessage } from "@/types/message";
import React, { useState } from "react";
import { toast } from "react-toastify";

type Props = { message: IDisplayMessage };

export default function Message({ message }: Props) {
  const [isRead, SetIsRead] = useState(message.read);
  const [isDeleted, SetIsDeleted] = useState<boolean>(false);
  const { unReadMessagesCount, setUnReadMessagesCount } = useMessageContext();

  const handleRead = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: "PUT",
      });
      if (res.ok) {
        const { read } = await res.json();
        SetIsRead(read);
        setUnReadMessagesCount((previousCount: number) =>
          read ? previousCount - 1 : previousCount + 1
        );
        toast.success(read ? "Marked as Read" : "Marked as New");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Message deleted");
        setUnReadMessagesCount((previousCount: number) => previousCount - 1);
        SetIsDeleted(true);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  if (isDeleted) {
    return null;
  }
  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
      {!isRead && (
        <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md">
          New
        </div>
      )}
      <h2 className="text-xl mb-4">
        <span className="font-bold">Property Inquiry: </span>
        {message.property.name}
      </h2>
      <p className="text-gray-700 whitespace-pre-line">{message.body}</p>

      <ul className="mt-4">
        <li>
          <strong>Name: </strong> {message.sender.username} as {message.name}
        </li>

        <li>
          <strong>Reply Email: </strong>
          <a href={`mailto:${message.email}`} className="text-blue-500">
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone: </strong>
          <a href={`tel:${message.phone}`} className="text-blue-500">
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Received: </strong>
          {new Date(message.createdAt).toLocaleString()}
        </li>
      </ul>
      <button
        onClick={handleRead}
        className={`mt-4 mr-3 ${
          isRead ? "bg-gray-300 text-black" : "bg-blue-500 text-white"
        }  py-1 px-3 rounded-md`}
      >
        {isRead ? "Mark as New" : "Mark As Read"}
      </button>
      <button
        onClick={handleDelete}
        className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md"
      >
        Delete
      </button>
    </div>
  );
}
