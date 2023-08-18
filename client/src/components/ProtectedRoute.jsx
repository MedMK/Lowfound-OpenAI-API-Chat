import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userCheckTkn } from "../api/user.api";
import Loading from "./Loading";

const ProtectedRoute = (props) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      setIsLoading(true);

      const { response, err } = await userCheckTkn();

      if (err) {
        localStorage.removeItem("token");
        navigate("/signin");
      }

      if (response) {
        localStorage.setItem("username", response.username);
        setIsLoading(false);
      }
    };

    const token = localStorage.getItem("token");

    if (token) checkToken();
    else navigate("/signin");
  }, [navigate]);

  return (
    isLoading ? (
      <Loading />
    ) : (
      <Box sx={{ height: "100vh" }}>
        {props.children}
      </Box>
    )
  );
};

export default ProtectedRoute;