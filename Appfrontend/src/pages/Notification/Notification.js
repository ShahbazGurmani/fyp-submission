import React from "react";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/Auth";

const Notification = () => {
  const [auth, setAuth] = useAuth();
  return (
    <Layout>
      <h1>Notification</h1>
      <pre>{JSON.stringify(auth, null, 4)}</pre>
    </Layout>
  );
};

export default Notification;
