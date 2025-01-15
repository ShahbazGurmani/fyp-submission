import { useState, useEffect } from "react";
import { useAuth } from "../../context/Auth";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

import Spinner from "../Spinner";

export default function PrivateRoute() {
  // PascalCase for component name
  const [ok, setOk] = useState(false);
  const [auth] = useAuth(); // No need to reassign `setAuth` unless needed for updating auth

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}api/auth/user-auth`
        );
        if (response.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      }
    };

    if (auth?.token) checkAuth();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
}
