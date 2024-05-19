import connectDb from "@/config/database";
import { getSessionUser } from "@/utils/getSessionUser";
import Message from "@/models/Message";

export const dynamic = "force-dynamic";

export const GET = async (req: Request) => {
  try {
    await connectDb();

    const userSession = await getSessionUser();

    if (!userSession || !userSession.user) {
      return new Response(JSON.stringify({ message: "UserID required" }), {
        status: 401,
      });
    }

    const unreadMessageCount = await Message.countDocuments({
      recipient: userSession.userID,
      read: false,
    });
    return new Response(JSON.stringify({ messageCount: unreadMessageCount }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
};
