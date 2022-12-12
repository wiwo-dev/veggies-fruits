import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
// import AppleProvider from "next-auth/providers/apple";
// import FacebookProvider from "next-auth/providers/facebook";
// import EmailProvider from "next-auth/providers/email";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "lib/prisma";

export default NextAuth({
  //adapter: PrismaAdapter(prisma),
  secret: process.env.JWT_SECRET,
  session: {
    // Choose how you want to save the user session.
    // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
    // If you use an `adapter` however, we default it to `"database"` instead.
    // You can still force a JWT session by explicitly defining `"jwt"`.
    // When using `"database"`, the session cookie will only contain a `sessionToken` value,
    // which is used to look up the session in the database.
    strategy: "jwt",

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    //maxAge: 60 * 60 * 24 * 30,
    // You can define your own encode/decode functions for signing and encryption
    //async encode() {},
    //async decode() {},
  },
  providers: [
    // OAuth authentication providers...
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET
    // }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        let user;
        if (credentials.username === "admin" && credentials.password === process.env.ADMIN_PASSWORD) {
          const prismaAdmin = await prisma.user.findUnique({
            where: {
              email: "admin@example.com",
            },
          });
          const { id, name, email } = prismaAdmin;
          user = { id, name, email };
        } else user = null;
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  callbacks: {
    //The arguments user, account, profile and isNewUser are only passed the first time this callback is called on a new session,
    //after the user signs in. In subsequent calls, only token will be available.
    //This callback is called whenever a JSON Web Token is created (i.e. at sign in) or updated (i.e whenever a session is accessed in the client).
    // The returned value will be encrypted, and it is stored in a cookie.
    async jwt({ token, user, account, profile, isNewUser }) {
      //Persist the OAuth access_token to the token right after signin
      if (account) {
        //token.accessToken = account?.access_token;
        token.account = account;
      }
      if (profile) {
        token.profile = profile;
      }
      if (user) {
        token.user = user;
      }

      //check if user with given email already exists in prisma db
      const prismaUser = await prisma.user.findUnique({
        where: {
          email: token.email,
        },
      });
      if (prismaUser) {
        //console.log("USER EXISTS");
      } else {
        console.log("USER DOESNT EXIST - CREATING A USER");
        const newUser = await prisma.user.create({
          data: {
            name: token.name,
            email: token.email,
          },
        });
        if (newUser) {
          console.log("USER CREATED");
          console.log(newUser);
        }
      }

      return token;
    },
    //The session callback is called whenever a session is checked.
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token?.accessToken;

      // Send the user's data to the client
      session.user = user;

      if (token) {
        //session.account = token.account;
        session.token = token;
      }

      const prismaUser = await prisma.user.findUnique({
        where: {
          email: token.email,
        },
      });
      if (prismaUser) session.dbUser = prismaUser;
      return session;
    },
  },
});
