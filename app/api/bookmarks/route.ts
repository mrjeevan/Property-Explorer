import connectDb from "@/config/database";
import User from "@/models/User";
import { IUser } from "@/types/user";
import { getSessionUser } from "@/utils/getSessionUser";
import { NextRequest } from "next/server";

// vercel push -> ssr error
export const dynamic = "force-dynamic";

// api/bookmarks
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
    let message;
    if (isBookMarked) {
      user.bookmarks.pull(propertyId);
      message = "Bookmark removed Successfully";
      isBookMarked = false;
    } else {
      user.bookmarks.push(propertyId);
      message = "Bookmark added Successfully";
      isBookMarked = true;
    }
    await user.save();

    return new Response(JSON.stringify({ message, isBookMarked }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
