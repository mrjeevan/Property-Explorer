import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";

export const getSessionUser = async () => {
  try {
    const session: any = await getServerSession(authOptions);
    if (!session || !session.user) {
      return null;
    }
    return {
      user: session.user,
      userID: session.user.id,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};
