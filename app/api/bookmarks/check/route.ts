import connectDb from "@/config/database";
import Property from "@/models/Property";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

export const GET = async (req: Request) => {
  try {
    await connectDb();

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userID) {
      return new Response("User Id required", { status: 401 });
    }
    const { userID } = sessionUser;
    // find user in db
    const user = await User.findById(userID);

    // get users bookmarks
    const bookmarks = await Property.find({ _id: { $in: user.bookmarks } });
    return new Response(JSON.stringify(bookmarks), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("something went wrong!", { status: 500 });
  }
};

export const POST = async (req: Request) => {
  try {
    await connectDb();
    const { propertyId } = await req.json();
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userID) {
      return new Response("User Id required", { status: 401 });
    }
    const { userID } = sessionUser;
    // find user in db
    const user = await User.findById(userID);

    if (!user) {
      return new Response("User Id required", { status: 401 });
    }

    // check if property is already bookmarked
    let isBookMarked = user.bookmarks.includes(propertyId);

    return new Response(JSON.stringify({ isBookMarked }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
