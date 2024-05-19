import connectDb from "@/config/database";
import Message from "@/models/Message";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

export const GET = async (req: Request) => {
  try {
    await connectDb();
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return new Response(
        JSON.stringify({ message: "login to view messages" }),
        { status: 401 }
      );
    }

    // ! property model is never registered in first run causes
    // ! "MissingSchemaError: Schema hasn't been registered for model "Property"" error
    const RegisterPropertySchema = await Property;
    // ! this should fix it

    const { userID } = sessionUser;
    const readMessagesReceived = await Message.find({
      recipient: userID,
      read: true,
    })
      .sort({ createdAt: -1 }) // read messages in asc order
      .populate("sender", "username")
      .populate("property", "name");
    const newMessagesReceived = await Message.find({
      recipient: userID,
      read: false,
    })
      .sort({ createdAt: -1 }) // read messages in asc order
      .populate("sender", "username")
      .populate("property", "name");

    const allReceivedMessages = [
      ...newMessagesReceived,
      ...readMessagesReceived,
    ];

    return new Response(JSON.stringify(allReceivedMessages), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};

export const POST = async (req: Request) => {
  try {
    await connectDb();

    const { name, email, phone, message, recipient, property } =
      await req.json();

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.user) {
      return new Response(
        JSON.stringify({ message: "Sign-in to send messages" }),
        {
          status: 401,
        }
      );
    }

    const { user } = sessionUser;

    // ! cannot send message to self

    if (user.id === recipient) {
      return new Response(
        JSON.stringify({ message: "Cannot send message to yourself" }),
        { status: 400 }
      );
    }

    const newMessage = new Message({
      sender: user.id,
      body: message,
      name,
      email,
      phone,
      recipient,
      property,
    });
    await newMessage.save();

    return new Response(
      JSON.stringify({ message: "Message sent successfully" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
