// pages/about.js
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../pages/api/auth/[...nextauth]";

export default function About({ session }) {
  // Check if the session exists on the client-side
  if (!session) {
    return (
      <div>
        <h1>Please login to access this page</h1>
      </div>
    )
  }
  return (
    <div>
      <h1>About Page</h1>
      <p>Welcome, {session.user.name}</p> 
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const session = await unstable_getServerSession(context, authOptions);
    if (!session) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
    return {
      props: {
        session: session,
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    return {
      redirect: {
        destination: '/error',
        permanent: false,
      },
    };
  }
}
