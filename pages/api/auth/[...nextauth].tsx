import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export default NextAuth({
  callbacks: {
    async jwt({ token, user }: any) {
      // This user return by provider {} as you mentioned above MY CONTENT {token:}

      // eslint-disable-next-line no-undef
      console.log(user, "DY: this is user in token");
      console.log(token, "DY: this is token in token");
      user && (token.helm = user);
      return Promise.resolve(token);
    },

    // That token store in session
    async session({ session, token }: any) {
      //if you want to add user details info
      //   session.user = session;
      //this user info get via API call or decode token. Anything you want you can add
      console.log(session, "DY: this is session");
      console.log(token, "DY: this is token");
      token && (session.user = token);
      return session;
    },

    async redirect({ baseUrl }: any) {
      return baseUrl;
    },
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials: any) {
        try {
          console.log(credentials, "DY: this is credential");
          // eslint-disable-next-line turbo/no-undeclared-env-vars
          const response = await axios.post(
            `http://ec2-34-224-30-0.compute-1.amazonaws.com:3000/api/v1/user/login`,
            {
              email: credentials.email,
              password: credentials.password,
            }
          );

          const user = response.data.data;
          console.log(user, "DY: this is response");

          return user;
        } catch (e: any) {
          console.log(e, "DY: catch error ");
          throw new Error(e.response.data.message);
        }
      },
      credentials: {},
    }),
  ],
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  //   secret: process.env.SECRET,
} as any);
