import connectDb from "@/config/database";
import Property from "@/models/Property";
import mongoose from "mongoose";

type params = {
  userId: string;
};
// GET-> /api/properties/user/:userId
export const GET = async (req: Request, context: { params: params }) => {
  const { userId } = context.params;

  if (!userId) {
    return new Response("User Id Required", { status: 400 });
  }
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return new Response("Invalid UserId", { status: 500 });
  }

  try {
    await connectDb();
    const properties = await Property.find({ owner: userId });
    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("something went wrong fetching properties", {
      status: 500,
    });
  }
};
