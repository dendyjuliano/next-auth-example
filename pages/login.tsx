import React, { SyntheticEvent, useState } from "react";
import type { NextPage, GetServerSideProps } from "next";
import styles from "../styles/Home.module.css";
import { signIn } from "next-auth/react";
import { useSession, getSession } from "next-auth/react";
import { Button, Form } from "react-bootstrap";
import { useRouter } from "next/router";

const Login: NextPage = () => {
  const { data: session } = useSession();
  const [email, setEmail] = useState<string>("admin@gmail.com");
  const [password, setPassword] = useState<string>("Test123!");
  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };

    try {
      const result = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      if (result?.error) {
        alert(result.error);
      }
      if (!result?.error) {
        router.replace("/");
      }
    } catch (e) {
      console.log(e, "DY: this is catch");
      // do nothing
    }
  };

  console.log(session, "DY: this is session");

  return (
    <div className={styles.container}>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default Login;
