export interface IMessage {
  _id: string;
  sender: string;
  recipient: string;
  property: string;
  name: string;
  email: string;
  phone: string;
  body: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IDisplayMessage extends Omit<IMessage, "property" | "sender"> {
  property: { name: string };
  sender: { username: string };
}
