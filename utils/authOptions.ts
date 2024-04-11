import { AuthOptions, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectDb from "@/config/database";
import User from "@/models/User";
export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    // invoked if sign in is successful
    async signIn({ profile }) {
      console.log("profile", profile);
      await connectDb();
      const userExists = await User.findOne({ email: profile?.email });
      if (!userExists) {
        //  truncate user name if too long
        let userName = profile?.name?.slice(0, 20);
        User.create({
          email: profile?.email,
          username: userName,
          image: profile?.image,
        });
      }
      return true;
    },

    /*
    
        async session({ session }: { session: Session }) {
        
        export interface Session extends DefaultSession {}

        export interface DefaultSession {
        user?: {
        name?: string | null
        email?: string | null
        image?: string | null
        }
        expires: ISODateString
        }
    
    */

    async session({ session }: { session: any }) {
      const user = await User.findOne({ email: session.user?.email });
      if (user) {
        session.user.id = user._id.toString(); // Assuming session.user is not optional
      }
      return session;
    },
  },
};
