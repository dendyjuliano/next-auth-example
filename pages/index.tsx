import React from "react";
import type { NextPage, GetServerSideProps } from "next";
import styles from "../styles/Home.module.css";
import { useSession, getSession } from "next-auth/react";
import { signOut } from "next-auth/react";

import { Button } from "react-bootstrap";

const Home: NextPage = () => {
  const { data: session } = useSession();

  return (
    <div className={styles.container}>
      <h1>Hello , {session?.user?.helm?.user?.email}</h1>
      <Button variant="primary" type="button" onClick={signOut}>
        Logout
      </Button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default Home;
