import connectDb from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

type Params = {
  id: string;
};

export const dynamic = "force-dynamic";

export const DELETE = async (req: Request, context: { params: Params }) => {
  try {
    await connectDb();
    const { id } = context.params;

    const userSession = await getSessionUser();

    if (!userSession || !userSession.user) {
      return new Response(JSON.stringify({ message: "UserID required" }), {
        status: 401,
      });
    }
    const message = await Message.findById(id);

    if (!message) {
      return new Response(JSON.stringify({ message: "Message not Found" }), {
        status: 404,
      });
    }

    // ! verify Ownership

    if (message.recipient.toString() === userSession.userID) {
      //   * mark read/unread wrt current status
      await message.deleteOne();
      return new Response("Message deleted", {
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
};

export const PUT = async (req: Request, context: { params: Params }) => {
  try {
    await connectDb();
    const { id } = context.params;

    const userSession = await getSessionUser();

    if (!userSession || !userSession.user) {
      return new Response(JSON.stringify({ message: "UserID required" }), {
        status: 401,
      });
    }
    const message = await Message.findById(id);

    if (!message) {
      return new Response(JSON.stringify({ message: "Message not Found" }), {
        status: 404,
      });
    }

    // ! verify Ownership

    if (message.recipient.toString() === userSession.userID) {
      //   * mark read/unread wrt current status
      message.read = !message.read;
      await message.save();
      return new Response(JSON.stringify(message), {
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
};
